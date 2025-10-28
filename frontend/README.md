# Quetta Arsalan Cafe - Frontend

Next.js frontend for the POS system.

## First Time Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

3. Start development server:
```bash
npm run dev
```

Visit http://localhost:3000

## Features

- **Urdu-First Interface** - RTL layout with Noto Nastaliq Urdu font
- **Menu Management** - Full CRUD operations for menu items
- **POS System** - Simple order taking interface
- **Real-time Updates** - Changes reflect immediately

## Pages

- `/` - Home page with navigation
- `/pos` - POS system for taking orders
- `/pos/menu-management` - Menu management interface

## Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:8000)


