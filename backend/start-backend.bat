@echo off
echo Starting Quetta Arsalan Cafe Backend...
cd /d "%~dp0"
call venv\Scripts\activate.bat
echo Backend starting on http://localhost:8000
echo Press Ctrl+C to stop
python main.py
pause

