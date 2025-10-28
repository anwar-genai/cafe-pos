# Quick Setup Guide

## Step-by-Step Instructions

### 1. Backend Setup

Open a terminal and run:

```powershell
cd backend
.\venv\Scripts\Activate.ps1
python main.py
```

The backend will start at `http://localhost:8000`

**Or simply double-click:** `start-backend.bat`

### 2. Frontend Setup

Open a **NEW** terminal and run:

```powershell
cd frontend

# First time only: Install dependencies
npm install

# Create environment file (first time only)
# Create a file named .env.local with this content:
# NEXT_PUBLIC_API_URL=http://localhost:8000

# Start the frontend
npm run dev
```

The frontend will start at `http://localhost:3000`

**Or simply double-click:** `start-frontend.bat`

### 3. Access the System

Open your browser and navigate to:
- **Main Page:** http://localhost:3000
- **Menu Management:** http://localhost:3000/pos/menu-management
- **POS System:** http://localhost:3000/pos
- **API Docs:** http://localhost:8000/docs

## Important Notes

1. **Environment File:** You need to create `frontend/.env.local` with:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

2. **Keep Both Terminals Running:** Don't close the terminal windows while using the system

3. **Database Already Populated:** The database already has all 28 menu items loaded

## Testing the System

### Test Menu Management:
1. Go to http://localhost:3000/pos/menu-management
2. Click "نیا آئٹم شامل کریں" to add a new item
3. Click the edit button (✏️) to change prices
4. Use the category filter to view items by category

### Test POS:
1. Go to http://localhost:3000/pos
2. Click on menu items to add them to cart
3. Adjust quantities
4. Complete an order

## Troubleshooting

### Backend won't start
- Make sure you're in the `backend` directory
- Make sure virtual environment is activated
- Check if port 8000 is already in use

### Frontend won't start
- Make sure you ran `npm install` first
- Make sure `.env.local` file exists
- Check if port 3000 is already in use

### Can't connect to API
- Make sure backend is running
- Check `.env.local` has the correct API URL
- Try accessing http://localhost:8000/health directly

## Default Menu Items

The system comes pre-loaded with 28 authentic Quetta Arsalan Cafe menu items across 5 categories:
- چائے (Tea) - 11 items
- پراٹھا (Paratha) - 13 items  
- انڈے (Eggs) - 2 items
- مشروبات (Beverages) - 3 items
- دیگر (Others) - 1 item

All prices are in Pakistani Rupees (Rs.)


