"""Script to reset the database with correct schema"""
import os
from app.database import engine, Base
from app import models

# Delete old database
db_path = "pos.db"
if os.path.exists(db_path):
    os.remove(db_path)
    print(f"✓ Deleted old database: {db_path}")

# Create all tables with correct schema
Base.metadata.create_all(bind=engine)
print("✓ Created new database with correct schema")
print("\nTables created:")
print("  - menu_items")
print("  - orders (with order_number column)")
print("  - order_items")
print("\nNow run: python populate_menu.py")

