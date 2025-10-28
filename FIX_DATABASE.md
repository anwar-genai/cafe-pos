# 🔧 Fix Database Schema Issue

## The Problem:
Your database has old schema. The `orders` table is missing the `order_number` column.

## ✅ Solution - Follow These Steps:

### Step 1: Stop Backend
Find your backend terminal and press **`Ctrl+C`** to stop it.

### Step 2: Delete Old Database
```powershell
cd D:\Projects\quetta-arsalan\backend
Remove-Item pos.db
```

Or manually delete: `backend/pos.db`

### Step 3: Recreate Database with Menu Items
```powershell
.\venv\Scripts\Activate.ps1
python populate_menu.py
```

This will:
- Create new database with correct schema
- Add all 28 menu items
- Create all tables (menu_items, orders, order_items)

### Step 4: Restart Backend
```powershell
python main.py
```

### Step 5: Test Order
1. Go to http://localhost:3000/pos
2. Add items to cart
3. Click "مکمل کریں"
4. Click "تصدیق کریں"
5. SUCCESS! 🎉

---

## What You'll See in Backend Terminal:

```
Received order request: items=[...]
Generated order number: ORD-20251028...
Processing item: menu_item_id=1, quantity=2
Total amount: 340.0
Order created with ID: 1
Order completed successfully: ORD-20251028...
INFO: POST /api/orders/ HTTP/1.1 201 Created ✅
```

---

## Quick Copy-Paste (All Steps):

```powershell
# Stop backend (Ctrl+C), then:
cd D:\Projects\quetta-arsalan\backend
Remove-Item pos.db -Force
.\venv\Scripts\Activate.ps1
python populate_menu.py
python main.py
```

---

Done! Your database now has the correct schema and orders will work! 🎊

