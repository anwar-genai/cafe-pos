"""Script to populate the database with the real cafe menu items"""
from app.database import SessionLocal, engine, Base
from app.models import MenuItem

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)

# Real cafe menu items
items = [
    {"name_ur": "شکر والی چائے", "price": 120, "category": "چائے"},
    {"name_ur": "ملائی چائے", "price": 110, "category": "چائے"},
    {"name_ur": "کریم چائے", "price": 100, "category": "چائے"},
    {"name_ur": "بادام چائے", "price": 160, "category": "چائے"},
    {"name_ur": "پتی چائے", "price": 90, "category": "چائے"},
    {"name_ur": "کٹی پتی چائے", "price": 80, "category": "چائے"},
    {"name_ur": "رودھی چائے", "price": 170, "category": "چائے"},
    {"name_ur": "شکریم چائے", "price": 180, "category": "چائے"},
    {"name_ur": "چاکلیٹی چائے", "price": 80, "category": "چائے"},
    {"name_ur": "شکر والی لاٹھی", "price": 90, "category": "چائے"},
    {"name_ur": "لاٹھی چائے", "price": 190, "category": "چائے"},
    {"name_ur": "سادہ پراٹھا", "price": 70, "category": "پراٹھا"},
    {"name_ur": "انڈہ پراٹھا", "price": 150, "category": "پراٹھا"},
    {"name_ur": "چکن پراٹھا", "price": 220, "category": "پراٹھا"},
    {"name_ur": "بیف پراٹھا", "price": 270, "category": "پراٹھا"},
    {"name_ur": "دال پراٹھا", "price": 240, "category": "پراٹھا"},
    {"name_ur": "مرغی پراٹھا", "price": 170, "category": "پراٹھا"},
    {"name_ur": "ملائی پراٹھا اسپیشل", "price": 220, "category": "پراٹھا"},
    {"name_ur": "چکن چپلی پراٹھا اسپیشل", "price": 400, "category": "پراٹھا"},
    {"name_ur": "انڈہ فرائی", "price": 70, "category": "انڈے"},
    {"name_ur": "ڈبل انڈہ فرائی", "price": 70, "category": "انڈے"},
    {"name_ur": "چکن دہی پراٹھا", "price": 320, "category": "پراٹھا"},
    {"name_ur": "پھل دہی پراٹھا", "price": 220, "category": "پراٹھا"},
    {"name_ur": "چکن قیمہ پراٹھا", "price": 380, "category": "پراٹھا"},
    {"name_ur": "چکن نگٹس", "price": 160, "category": "دیگر"},
    {"name_ur": "ملائی لسی", "price": 170, "category": "مشروبات"},
    {"name_ur": "سویٹ لسی", "price": 200, "category": "مشروبات"},
    {"name_ur": "نمکین لسی", "price": 160, "category": "مشروبات"},
]


def populate_menu():
    db = SessionLocal()
    
    try:
        # Check if menu already has items
        existing_count = db.query(MenuItem).count()
        
        if existing_count > 0:
            print(f"Database already has {existing_count} items.")
            response = input("Do you want to clear and repopulate? (yes/no): ")
            if response.lower() == 'yes':
                db.query(MenuItem).delete()
                db.commit()
                print("Cleared existing menu items.")
            else:
                print("Keeping existing items.")
                return
        
        # Add all items
        for item_data in items:
            menu_item = MenuItem(**item_data, is_available=True)
            db.add(menu_item)
        
        db.commit()
        print(f"Successfully added {len(items)} menu items to the database!")
        
        # Display added items
        print("\nAdded items:")
        for item in items:
            print(f"  - {item['name_ur']}: Rs. {item['price']} ({item['category']})")
            
    except Exception as e:
        print(f"Error: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    populate_menu()


