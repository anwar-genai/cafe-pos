# Git Repository Setup

## ✅ Repository Initialized

Your project is now a Git repository!

## 📦 What's Included

### Initial Commit
- 31 files committed
- Complete POS system
- All documentation
- Backend API (FastAPI)
- Frontend UI (Next.js)

### Files Ignored (.gitignore)
The following are excluded from git:
- `node_modules/` - Node packages
- `venv/` - Python virtual environment
- `.next/` - Next.js build files
- `pos.db` - Database file (local only)
- `.env.local` - Environment variables
- `__pycache__/` - Python cache
- IDE files (.vscode, .idea)

## 🚀 Push to GitHub

To push this to GitHub:

### 1. Create a new repository on GitHub
Go to https://github.com/new

### 2. Add remote origin
```bash
git remote add origin https://github.com/YOUR_USERNAME/quetta-arsalan-pos.git
```

### 3. Push to GitHub
```bash
git push -u origin main
```

Or if your default branch is `master`:
```bash
git branch -M main
git push -u origin main
```

## 📝 Common Git Commands

### Check status
```bash
git status
```

### Add changes
```bash
git add .
```

### Commit changes
```bash
git commit -m "Your commit message"
```

### View history
```bash
git log
```

### Push changes
```bash
git push
```

### Pull changes
```bash
git pull
```

### Create a new branch
```bash
git checkout -b feature-name
```

### Switch branches
```bash
git checkout main
```

## 🔒 Important Notes

### Database File (pos.db)
- NOT tracked by git (in .gitignore)
- Contains your menu items and orders
- Backup regularly
- Each developer needs to run `populate_menu.py` to set up their database

### Environment Files
- `.env.local` is NOT tracked
- Each developer must create their own
- Contains: `NEXT_PUBLIC_API_URL=http://localhost:8000`

### Node Modules
- NOT tracked (too large)
- Run `npm install` after cloning

### Virtual Environment
- NOT tracked
- Run these after cloning:
  ```bash
  cd backend
  python -m venv venv
  .\venv\Scripts\Activate.ps1
  pip install -r requirements.txt
  python populate_menu.py
  ```

## 📋 Setup for New Developers

When someone clones your repo:

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/quetta-arsalan-pos.git
cd quetta-arsalan-pos

# 2. Setup Backend
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python populate_menu.py

# 3. Setup Frontend
cd ../frontend
npm install
# Create .env.local with: NEXT_PUBLIC_API_URL=http://localhost:8000

# 4. Run the project
# Terminal 1: Backend
cd backend
.\venv\Scripts\Activate.ps1
python main.py

# Terminal 2: Frontend
cd frontend
npm run dev
```

## 🌟 Branch Strategy

### Main Branch
- Production-ready code
- Always stable
- Protected (no direct commits)

### Development Branch (optional)
```bash
git checkout -b development
```

### Feature Branches
```bash
git checkout -b feature/add-reports
git checkout -b fix/price-update-bug
git checkout -b improve/ui-design
```

## 📊 Current Status

```
Repository: quetta-arsalan
Branch: main
Commits: 1
Files tracked: 31
Files ignored: node_modules, venv, .next, pos.db, etc.
```

## 🔄 Workflow Example

```bash
# 1. Make changes to files
# ... edit some files ...

# 2. Check what changed
git status

# 3. Add changes
git add .

# 4. Commit with message
git commit -m "Add new feature"

# 5. Push to GitHub
git push
```

## 🎯 Best Practices

1. **Commit Often** - Small, focused commits
2. **Clear Messages** - Descriptive commit messages
3. **Branch Strategy** - Use branches for features
4. **Pull Before Push** - Always pull latest changes first
5. **Review Changes** - Check `git status` before committing
6. **Backup Database** - Keep backup of pos.db separately

## 📚 Learn More

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)

---

**Your repository is ready! 🎉**

You can now:
- Push to GitHub
- Collaborate with team
- Track changes
- Manage versions

