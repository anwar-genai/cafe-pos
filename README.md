# Quetta Arsalan Cafe - POS System

A complete Point of Sale (POS) system for Quetta Arsalan Cafe with Urdu-first interface.

## Features

- ✅ **Menu Management** - Add, edit, delete, and manage menu items
- ✅ **Urdu-First Interface** - All displays prioritize Urdu text
- ✅ **Price Management** - Easily update prices for any menu item
- ✅ **Category Management** - Organize items by categories (چائے، پراٹھا، etc.)
- ✅ **POS Interface** - Simple and intuitive order taking system
- ✅ **Real-time Updates** - Changes reflect immediately

## Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - Database ORM
- **SQLite** - Database
- **Uvicorn** - ASGI server

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Noto Nastaliq Urdu** - Beautiful Urdu font

## Getting Started

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Activate virtual environment:
```bash
# On Windows
.\venv\Scripts\Activate.ps1

# On Linux/Mac
source venv/bin/activate
```

3. Install dependencies (if not already installed):
```bash
pip install -r requirements.txt
```

4. Run the database population script (already done):
```bash
python populate_menu.py
```

5. Start the backend server:
```bash
python main.py
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file with:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Usage

### Main Menu
Navigate to `http://localhost:3000` to see:
- **POS System** - For taking orders
- **مینیو کا انتظام** (Menu Management) - For managing menu items
- **رپورٹس** (Reports) - For viewing reports

### Menu Management (`/pos/menu-management`)

#### Add New Item
1. Click "نیا آئٹم شامل کریں" (Add New Item)
2. Fill in:
   - **اردو نام** (Urdu Name) - Required
   - **انگریزی نام** (English Name) - Optional
   - **قیمت** (Price) - Required
   - **زمرہ** (Category) - Optional
   - **دستیاب ہے** (Available) - Checkbox

#### Edit Item Price or Details
1. Click the edit button (✏️) next to any item
2. Update the price or any other field
3. Click "اپ ڈیٹ کریں" (Update)

#### Filter by Category
Use the category dropdown to filter items by category (چائے، پراٹھا، مشروبات، etc.)

### POS System (`/pos`)

1. Browse menu items or search for items
2. Click on an item to add it to cart
3. Adjust quantities using + and - buttons
4. Click "آرڈر مکمل کریں" to complete the order

## API Endpoints

### Menu Items
- `GET /api/menu/` - Get all menu items
- `GET /api/menu/{id}` - Get specific item
- `POST /api/menu/` - Create new item
- `PUT /api/menu/{id}` - Update item
- `DELETE /api/menu/{id}` - Delete item
- `GET /api/menu/categories/list` - Get all categories

### Orders
- `GET /api/orders/` - Get all orders
- `GET /api/orders/{id}` - Get specific order
- `POST /api/orders/` - Create new order
- `PATCH /api/orders/{id}/status` - Update order status

## Database Schema

### Menu Items
- `id` - Primary key
- `name_ur` - Urdu name (required)
- `name_en` - English name (optional)
- `price` - Price in Rs.
- `category` - Category (optional)
- `is_available` - Availability status
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

## Current Menu Items (28 items)

### چائے (Tea) - 11 items
- شکر والی چائے - Rs. 120
- ملائی چائے - Rs. 110
- کریم چائے - Rs. 100
- بادام چائے - Rs. 160
- پتی چائے - Rs. 90
- کٹی پتی چائے - Rs. 80
- رودھی چائے - Rs. 170
- شکریم چائے - Rs. 180
- چاکلیٹی چائے - Rs. 80
- شکر والی لاٹھی - Rs. 90
- لاٹھی چائے - Rs. 190

### پراٹھا (Paratha) - 13 items
- سادہ پراٹھا - Rs. 70
- انڈہ پراٹھا - Rs. 150
- چکن پراٹھا - Rs. 220
- بیف پراٹھا - Rs. 270
- دال پراٹھا - Rs. 240
- مرغی پراٹھا - Rs. 170
- ملائی پراٹھا اسپیشل - Rs. 220
- چکن چپلی پراٹھا اسپیشل - Rs. 400
- چکن دہی پراٹھا - Rs. 320
- پھل دہی پراٹھا - Rs. 220
- چکن قیمہ پراٹھا - Rs. 380

### انڈے (Eggs) - 2 items
- انڈہ فرائی - Rs. 70
- ڈبل انڈہ فرائی - Rs. 70

### مشروبات (Beverages) - 3 items
- ملائی لسی - Rs. 170
- سویٹ لسی - Rs. 200
- نمکین لسی - Rs. 160

### دیگر (Others) - 1 item
- چکن نگٹس - Rs. 160

## Notes

- All text is displayed in Urdu first
- The interface uses RTL (right-to-left) layout
- Prices are in Pakistani Rupees (Rs.)
- The system supports real-time menu updates
- Database is automatically created on first run

## Support

For any issues or questions, please contact the development team.


