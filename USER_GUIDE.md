# User Guide - Quetta Arsalan Cafe POS System

## کوئٹہ ارسلان کیفے - استعمال کی رہنمائی

This guide will show you exactly how to use your new POS system.

---

## 🚀 Quick Start

### Step 1: Start the Backend
Open PowerShell and run:
```powershell
cd D:\Projects\quetta-arsalan\backend
.\venv\Scripts\Activate.ps1
python main.py
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

**Keep this window open!**

### Step 2: Start the Frontend
Open a NEW PowerShell window and run:
```powershell
cd D:\Projects\quetta-arsalan\frontend
npm run dev
```

You should see:
```
  ▲ Next.js 14.1.0
  - Local:        http://localhost:3000
```

### Step 3: Create .env.local (First Time Only)
In `D:\Projects\quetta-arsalan\frontend\` create a file named `.env.local` with:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Step 4: Open Your Browser
Navigate to: **http://localhost:3000**

---

## 📋 Main Menu (Home Page)

When you open http://localhost:3000, you'll see three options:

1. **POS System** - For taking customer orders
2. **مینیو کا انتظام** (Menu Management) - For managing your menu
3. **رپورٹس** (Reports) - For viewing reports

---

## 🍽️ Menu Management (مینیو کا انتظام)

### How to Access
Click **"مینیو کا انتظام"** from the home page
OR
Navigate to: http://localhost:3000/pos/menu-management

### What You'll See
A table showing all your menu items with columns:
- **# (ID)** - Item number
- **اردو نام** (Urdu Name) - Item name in Urdu
- **انگریزی نام** (English Name) - Optional English name
- **قیمت (Rs.)** (Price) - Price in Rupees
- **زمرہ** (Category) - Category (چائے, پراٹھا, etc.)
- **دستیاب** (Available) - Is it available?
- **عمل** (Actions) - Edit and Delete buttons

---

## ➕ Adding New Items

### Step-by-Step:

1. **Click the Green Button** at the top: **"نیا آئٹم شامل کریں"**

2. **A popup form will appear** with these fields:
   
   **اردو نام*** (Urdu Name) - REQUIRED
   - Type the Urdu name of your item
   - Example: `کشمیری چائے`
   
   **انگریزی نام** (English Name) - OPTIONAL
   - Type the English name if you want
   - Example: `Kashmiri Tea`
   
   **قیمت (Rs.)*** (Price) - REQUIRED
   - Enter the price in numbers
   - Example: `150`
   
   **زمرہ** (Category) - OPTIONAL
   - Type or select a category
   - Existing categories: چائے, پراٹھا, انڈے, مشروبات, دیگر
   - You can type a new category too
   
   **دستیاب ہے** (Is Available) - CHECKBOX
   - Checked = Available for ordering
   - Unchecked = Hidden from POS

3. **Click "شامل کریں"** (Add) to save

4. **Success!** Your item is now in the menu

### Example: Adding "کشمیری چائے"
```
اردو نام: کشمیری چائے
انگریزی نام: Kashmiri Tea
قیمت: 150
زمرہ: چائے
دستیاب ہے: ✓ (checked)
```

---

## ✏️ Changing Prices (Editing Items)

### Step-by-Step:

1. **Find the item** you want to edit in the table

2. **Click the Blue Edit Button** (✏️) in the "عمل" column

3. **A popup form will appear** with current values filled in

4. **Change any field you want:**
   - Change the price: Just type the new price
   - Change the name: Edit the Urdu or English name
   - Change category: Select or type a new category
   - Toggle availability: Check/uncheck the box

5. **Click "اپ ڈیٹ کریں"** (Update) to save

6. **Success!** The item is updated

### Example: Changing Price of "شکر والی چائے" from 120 to 130
1. Find "شکر والی چائے" in the table
2. Click the edit button (✏️)
3. Change "قیمت" from `120` to `130`
4. Click "اپ ڈیٹ کریں"
5. Done! Price is now Rs. 130

---

## 🗑️ Deleting Items

### Step-by-Step:

1. **Find the item** you want to delete

2. **Click the Red Delete Button** (🗑️) in the "عمل" column

3. **Confirm the deletion** by clicking "OK" in the popup

4. **Success!** The item is removed

⚠️ **Warning:** Deletion is permanent!

---

## 🔍 Filtering and Searching

### Filter by Category
Use the dropdown at the top to show only items from a specific category:
- Select "تمام زمرے" (All Categories) to show everything
- Select "چائے" to show only tea items
- Select "پراٹھا" to show only paratha items
- And so on...

### View Your 28 Items
All your real cafe items are already loaded:

**چائے (Tea) - 11 items:**
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

**پراٹھا (Paratha) - 13 items:**
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

**Other Categories:**
- انڈے (Eggs) - 2 items
- مشروبات (Beverages) - 3 items
- دیگر (Others) - 1 item

---

## 🛒 Using the POS System

### How to Access
Click **"POS System"** from the home page
OR
Navigate to: http://localhost:3000/pos

### Layout
The screen is divided into two sections:

**Left Side - Menu Items:**
- Shows all available items in a grid
- Click any item to add it to the cart

**Right Side - Cart:**
- Shows selected items
- Adjust quantities with + and - buttons
- See the total amount
- Complete the order

### Taking an Order:

1. **Browse or Search** for items:
   - Scroll through the menu cards
   - Use the search box to find items quickly
   - Use category filter to narrow down

2. **Click on an item** to add it to the cart:
   - Item appears in the cart on the right
   - Quantity starts at 1

3. **Adjust Quantities:**
   - Click **+** to increase quantity
   - Click **-** to decrease quantity
   - Click **🗑️** (trash) to remove item completely

4. **Review the Total:**
   - Cart shows total at the bottom
   - Example: "کل رقم: Rs. 450"

5. **Complete the Order:**
   - Click **"آرڈر مکمل کریں"** (Complete Order)
   - Confirm the order
   - Cart clears automatically
   - Ready for next customer!

### Example Order:
```
Customer orders:
- ملائی چائے × 2 = Rs. 220
- انڈہ پراٹھا × 1 = Rs. 150
Total: Rs. 370
```

---

## 💡 Tips and Tricks

### 1. Hiding Items Without Deleting
If you want to temporarily remove an item from the POS:
1. Edit the item
2. Uncheck **"دستیاب ہے"**
3. Save
→ Item won't show in POS but stays in your database

### 2. Quick Price Updates
During slow hours, update multiple prices quickly:
1. Open Menu Management
2. Edit items one by one
3. Change prices as needed
4. Updates show immediately in POS

### 3. Adding Similar Items
When adding multiple similar items:
1. Add the first item completely
2. For the next item, the category dropdown remembers previous categories
3. Just select the same category instead of retyping

### 4. Organizing with Categories
Use consistent category names:
- چائے (for all tea items)
- پراٹھا (for all paratha items)
- مشروبات (for all beverages)
This helps with filtering and organization

---

## ⚠️ Common Issues

### Issue: "Cannot connect to API"
**Solution:**
1. Make sure backend is running (check terminal)
2. Backend should be at http://localhost:8000
3. Check `.env.local` file exists in frontend folder

### Issue: "Items not showing"
**Solution:**
1. Check if items are marked as available (دستیاب)
2. Clear category filter (select "تمام زمرے")
3. Refresh the page

### Issue: "Changes not saving"
**Solution:**
1. Check backend terminal for errors
2. Make sure database file `pos.db` exists
3. Try restarting the backend

---

## 📞 Getting Help

### Check API Health
Open in browser: http://localhost:8000/health
Should show: `{"status":"healthy"}`

### View API Documentation
Open in browser: http://localhost:8000/docs
Shows all available API endpoints

### Check Database
The database file is at: `backend/pos.db`
It contains all your menu items and orders

---

## 🎉 You're All Set!

Your POS system is ready to use with all 28 real menu items. You can:
- ✅ Add new items anytime
- ✅ Change prices instantly  
- ✅ Organize with categories
- ✅ Take orders efficiently
- ✅ Everything in beautiful Urdu

**Enjoy your new POS system!**

**کوئٹہ ارسلان کیفے کی کامیابی کے لیے نیک خواہشات!**


