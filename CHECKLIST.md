# Setup Checklist ✅

Use this checklist to ensure everything is set up correctly.

## Backend Setup

- [ ] Backend folder exists at `D:\Projects\quetta-arsalan\backend`
- [ ] Virtual environment folder `venv` exists
- [ ] `requirements.txt` file exists
- [ ] Database file `pos.db` exists (contains 28 items)
- [ ] All Python files are in place:
  - [ ] `app/__init__.py`
  - [ ] `app/database.py`
  - [ ] `app/models.py`
  - [ ] `app/schemas.py`
  - [ ] `app/routes/menu.py`
  - [ ] `app/routes/orders.py`
  - [ ] `main.py`
  - [ ] `populate_menu.py`

### Test Backend:
```powershell
cd backend
.\venv\Scripts\Activate.ps1
python main.py
```

**Expected Output:**
```
INFO:     Started server process
INFO:     Uvicorn running on http://0.0.0.0:8000
```

**Test in Browser:** http://localhost:8000/health
**Expected Result:** `{"status":"healthy"}`

---

## Frontend Setup

- [ ] Frontend folder exists at `D:\Projects\quetta-arsalan\frontend`
- [ ] `package.json` file exists
- [ ] `node_modules` folder exists (after npm install)
- [ ] All TypeScript files are in place:
  - [ ] `app/layout.tsx`
  - [ ] `app/page.tsx`
  - [ ] `app/globals.css`
  - [ ] `app/pos/page.tsx`
  - [ ] `app/pos/menu-management/page.tsx`
  - [ ] `lib/api.ts`
  - [ ] `tsconfig.json`
  - [ ] `next.config.js`

### Install Dependencies:
```powershell
cd frontend
npm install
```

**Expected Output:**
```
added XXX packages
```

### Create Environment File:
- [ ] Create file: `frontend/.env.local`
- [ ] Add content: `NEXT_PUBLIC_API_URL=http://localhost:8000`

### Test Frontend:
```powershell
npm run dev
```

**Expected Output:**
```
  ▲ Next.js 14.1.0
  - Local:        http://localhost:3000
```

**Test in Browser:** http://localhost:3000
**Expected Result:** Home page with three buttons

---

## Database Verification

### Check Items in Database:
While backend is running, open: http://localhost:8000/api/menu/

**Expected Result:** JSON with 28 items, starting with:
```json
[
  {
    "name_ur": "شکر والی چائے",
    "price": 120.0,
    "category": "چائے",
    ...
  },
  ...
]
```

### Item Count by Category:
- [ ] چائے (Tea): 11 items
- [ ] پراٹھا (Paratha): 13 items  
- [ ] انڈے (Eggs): 2 items
- [ ] مشروبات (Beverages): 3 items
- [ ] دیگر (Others): 1 item
- [ ] **Total: 28 items**

---

## Functionality Tests

### Test 1: View Menu Items
- [ ] Open http://localhost:3000/pos/menu-management
- [ ] See all 28 items in a table
- [ ] Urdu names displayed correctly
- [ ] Prices showing correctly

### Test 2: Add New Item
- [ ] Click "نیا آئٹم شامل کریں" button
- [ ] Modal popup appears
- [ ] Fill in form:
  - Urdu name: `ٹیسٹ آئٹم`
  - Price: `100`
- [ ] Click "شامل کریں"
- [ ] Success message appears
- [ ] New item appears in table
- [ ] Total items now: 29

### Test 3: Edit Item Price
- [ ] Find "شکر والی چائے" in table
- [ ] Click edit button (✏️)
- [ ] Modal popup with current values appears
- [ ] Change price from 120 to 125
- [ ] Click "اپ ڈیٹ کریں"
- [ ] Success message appears
- [ ] Price updates in table to 125

### Test 4: Delete Test Item
- [ ] Find "ٹیسٹ آئٹم" in table
- [ ] Click delete button (🗑️)
- [ ] Confirmation dialog appears
- [ ] Click OK
- [ ] Success message appears
- [ ] Item removed from table
- [ ] Total items back to: 28

### Test 5: Filter by Category
- [ ] Click category dropdown
- [ ] Select "چائے"
- [ ] Only tea items show (11 items)
- [ ] Select "تمام زمرے"
- [ ] All 28 items show again

### Test 6: Use POS System
- [ ] Open http://localhost:3000/pos
- [ ] Menu items display in grid
- [ ] Click on "ملائی چائے"
- [ ] Item appears in cart on right
- [ ] Quantity shows: 1
- [ ] Price shows: Rs. 110
- [ ] Click + to increase quantity
- [ ] Quantity updates to: 2
- [ ] Total shows: Rs. 220
- [ ] Click "آرڈر مکمل کریں"
- [ ] Confirmation appears
- [ ] Click OK
- [ ] Cart clears

### Test 7: POS Search
- [ ] Type "چائے" in search box
- [ ] Only tea items show
- [ ] Clear search
- [ ] All items show again

### Test 8: Category Filter in POS
- [ ] Select "پراٹھا" from category dropdown
- [ ] Only paratha items show (13 items)
- [ ] Click on "انڈہ پراٹھا"
- [ ] Item added to cart correctly

---

## Visual Verification

### Urdu Text Display
- [ ] Urdu text displays correctly (not boxes/question marks)
- [ ] Text reads right-to-left
- [ ] Font looks proper (Noto Nastaliq Urdu)

### Layout
- [ ] Buttons are on the right side (RTL layout)
- [ ] Tables read right-to-left
- [ ] Forms are right-aligned

### Colors and Design
- [ ] Green button for "Add New"
- [ ] Blue button for "Edit"
- [ ] Red button for "Delete"
- [ ] Clean, professional look

---

## Final Checks

- [ ] Both backend and frontend running simultaneously
- [ ] No error messages in terminals
- [ ] All 28 original items present
- [ ] Can add new items ✅
- [ ] Can change prices ✅
- [ ] Urdu displayed first ✅
- [ ] POS system working ✅

---

## Quick Reference

### Start Backend:
```powershell
cd backend
.\venv\Scripts\Activate.ps1
python main.py
```
**URL:** http://localhost:8000

### Start Frontend:
```powershell
cd frontend
npm run dev
```
**URL:** http://localhost:3000

### Main Pages:
- Home: http://localhost:3000
- Menu Management: http://localhost:3000/pos/menu-management
- POS: http://localhost:3000/pos
- API Docs: http://localhost:8000/docs

---

## If Something Doesn't Work

### Backend Issues:
1. Check virtual environment is activated
2. Check all dependencies installed: `pip list`
3. Check database exists: `dir pos.db`
4. Check for error messages in terminal

### Frontend Issues:
1. Check node_modules exists: `dir node_modules`
2. Check .env.local exists: `dir .env.local`
3. Clear Next.js cache: `Remove-Item -Recurse -Force .next`
4. Reinstall: `npm install`

### API Connection Issues:
1. Check backend is running (terminal should show active)
2. Test API: http://localhost:8000/health
3. Check .env.local has correct URL
4. Check browser console for errors (F12)

---

## ✅ System Ready!

If all checks pass:
- ✅ System is fully operational
- ✅ All 28 menu items loaded
- ✅ Can add new items
- ✅ Can change prices
- ✅ Urdu-first interface working
- ✅ POS system ready

**Your Quetta Arsalan Cafe POS system is ready to use! 🎉**


