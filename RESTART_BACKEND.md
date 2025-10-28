# ⚠️ IMPORTANT: Restart Backend Now!

## The backend MUST be restarted for changes to take effect!

### Quick Restart (Windows):

1. **Find your backend terminal window**
2. **Press `Ctrl+C`** to stop it
3. **Run this:**

```powershell
cd D:\Projects\quetta-arsalan\backend
.\venv\Scripts\Activate.ps1
python main.py
```

### OR Double-Click:
`backend/start-backend.bat`

---

## ✅ You'll Know It's Working When You See:

```
INFO:     Will watch for changes in these directories: ['D:\\Projects\\quetta-arsalan\\backend']
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

---

## 🔍 When You Test an Order:

You should see in the backend terminal:
```
Received order request: items=[...]
Generated order number: ORD-20251028...
Processing item: menu_item_id=1, quantity=2
Processing item: menu_item_id=5, quantity=1
Total amount: 340.0
Order created with ID: 1
Order completed successfully: ORD-20251028...
INFO:     POST /api/orders/ HTTP/1.1 201 Created
```

---

## ❌ If You Still Get Errors:

### Check Backend Terminal for:
- Python errors in red
- Traceback messages
- "ERROR creating order:" messages

### Common Issues:

1. **Backend not restarted** → Restart it!
2. **Wrong directory** → Make sure you're in `backend/` folder
3. **Venv not activated** → See the `(venv)` prefix in terminal
4. **Database corrupted** → Delete `pos.db` and run `python populate_menu.py`

---

## 💡 Pro Tip:

Keep backend terminal visible while testing so you can see what's happening!

