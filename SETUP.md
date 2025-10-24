# 🚀 Quick Setup Guide for SpectrumPro

Follow these steps to get the SpectrumPro application running on your machine.

## Prerequisites

- Node.js v14+ installed
- npm or yarn package manager

## Step-by-Step Setup

### 1. Install All Dependencies

Open PowerShell in the `blog-app` directory and run:

```powershell
npm install
```

### 2. Install Adonis Packages

The project requires Lucid ORM and Auth packages:

```powershell
npm install @adonisjs/lucid @adonisjs/auth
```

Configure Lucid (select SQLite when prompted):

```powershell
node ace configure @adonisjs/lucid
```

Configure Auth (select Web guard when prompted):

```powershell
node ace configure @adonisjs/auth
```

### 3. Set Up Environment Variables

Check your `.env` file and ensure it has these settings:

```env
PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=your-secret-app-key-here
APP_NAME=SpectrumPro
CACHE_VIEWS=false
SESSION_DRIVER=cookie
DRIVE_DISK=local
DB_CONNECTION=sqlite
DB_FILENAME=./tmp/db.sqlite3
```

**Generate a secure APP_KEY** if needed:

```powershell
node ace generate:key
```

Copy the generated key and paste it in your `.env` file.

### 4. Create Database Directory

```powershell
mkdir tmp
```

### 5. Run Database Migrations

This creates all the necessary tables:

```powershell
node ace migration:run
```

You should see output confirming:
- ✅ users table created
- ✅ products table created
- ✅ wishlists table created
- ✅ contacts table created

### 6. (Optional) Seed Sample Data

To add sample users and products:

```powershell
node ace db:seed
```

This creates:
- **Buyer account**: buyer@example.com / password123
- **Seller accounts**:
  - seller@rayban.com / password123
  - seller@oakley.com / password123

### 7. Start the Development Server

```powershell
npm run dev
```

You should see:

```
[ info ] building project...
[ info ] starting http server...
[ info ] serving app on http://127.0.0.1:3333
```

### 8. Open in Browser

Navigate to: **http://localhost:3333**

## 🎉 You're All Set!

### Try These First Steps:

1. **Browse Products**: Go to Shop to see the eyewear collection
2. **Register**: Create a buyer or seller account
3. **As a Buyer**: Add products to your wishlist
4. **As a Seller**: Add your own products to sell

## 🐛 Troubleshooting

### Port Already in Use
If port 3333 is already taken, change `PORT` in `.env` to another value (e.g., 3334).

### Migration Errors
If migrations fail:
```powershell
# Delete the database and try again
rm tmp/db.sqlite3
node ace migration:run
```

### Module Not Found Errors
Make sure all packages are installed:
```powershell
npm install
npm install @adonisjs/lucid @adonisjs/auth
```

### Auth Not Working
Ensure:
1. `APP_KEY` is set in `.env`
2. Auth middleware is configured in `start/kernel.ts`
3. Session driver is set to 'cookie' in `.env`

### Can't See Products
Either:
1. Run the seeder: `node ace db:seed`
2. Register as a seller and add products manually

## 📝 Development Tips

### Clear Build Cache
If you see weird errors:
```powershell
rm -r build
npm run dev
```

### Check All Routes
```powershell
node ace list:routes
```

### Access Database
You can use any SQLite browser tool to view `tmp/db.sqlite3`

### Hot Reload
The dev server automatically reloads when you change files. No need to restart!

## 🔐 Default Test Accounts

After running the seeder:

| Email | Password | Role |
|-------|----------|------|
| buyer@example.com | password123 | user |
| seller@rayban.com | password123 | seller |
| seller@oakley.com | password123 | seller |

## 📚 Next Steps

- Check out `README.md` for full documentation
- Explore the routes in `start/routes.ts`
- Add your own products as a seller
- Customize the styling in `resources/views/layouts/main.edge`

---

**Need help?** Check the full README.md or AdonisJS documentation at https://docs.adonisjs.com
