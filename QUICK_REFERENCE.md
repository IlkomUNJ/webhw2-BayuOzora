# 🚀 Quick Reference Guide

## Common Commands

### Development
```powershell
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
```

### Database
```powershell
node ace migration:run            # Run migrations
node ace migration:rollback       # Rollback last migration
node ace migration:refresh        # Rollback all + run all
node ace migration:reset          # Rollback all migrations
node ace db:seed                  # Run database seeder
```

### Generate Files
```powershell
node ace make:controller <name>   # Create controller
node ace make:model <name>        # Create model
node ace make:migration <name>    # Create migration
node ace make:middleware <name>   # Create middleware
```

### Utilities
```powershell
node ace list:routes              # List all routes
node ace generate:key             # Generate APP_KEY
node ace list                     # List all commands
```

---

## File Locations

### Controllers
`app/Controllers/Http/`
- AuthController.ts
- ProductController.ts
- UserController.ts
- SellerController.ts
- ContactController.ts
- HomeController.ts

### Models
`app/Models/`
- User.ts
- Product.ts
- Wishlist.ts
- Contact.ts

### Views
`resources/views/`
- layouts/main.edge
- home/index.edge, about.edge
- products/index.edge, search.edge, show.edge
- auth/register.edge, login.edge
- user/wishlist.edge
- seller/products.edge, create.edge, edit.edge, wishlists.edge
- contact/index.edge

### Routes
`start/routes.ts`

### Middleware
`app/Middleware/`
- Auth.ts
- Guest.ts
- SilentAuth.ts

### Migrations
`database/migrations/`
- 1_users.ts
- 2_products.ts
- 3_wishlists.ts
- 4_contacts.ts

### Config
`config/`
- database.ts
- auth.ts
- session.ts
- shield.ts

---

## Environment Variables (.env)

```env
PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=<generate with: node ace generate:key>
APP_NAME=SpectrumPro
CACHE_VIEWS=false
SESSION_DRIVER=cookie
DRIVE_DISK=local
DB_CONNECTION=sqlite
DB_FILENAME=./tmp/db.sqlite3
```

---

## Test Accounts (After Seeding)

| Email | Password | Role |
|-------|----------|------|
| buyer@example.com | password123 | user |
| seller@rayban.com | password123 | seller |
| seller@oakley.com | password123 | seller |

---

## Route Patterns

### Public
- `/` - Home
- `/shop` - Products
- `/product/:id` - Product detail
- `/search?keyword=...` - Search
- `/contact` - Contact form
- `/about` - About page

### Auth
- `/register` - Register
- `/login` - Login
- `/logout` - Logout (POST)

### User (Authenticated)
- `/user/wishlist` - My wishlist
- `/user/wishlist/add` - Add to wishlist (POST)
- `/user/wishlist/:id` - Remove (DELETE)

### Seller (Authenticated)
- `/seller/products` - My products
- `/seller/add` - Add product
- `/seller/edit/:id` - Edit product
- `/seller/delete/:id` - Delete (DELETE)
- `/seller/wishlists` - View wishlists

---

## Database Schema Quick Reference

### users
```
id, name, email, password, role, remember_me_token, created_at, updated_at
```

### products
```
id, seller_id, title, description, price, image, created_at, updated_at
```

### wishlists
```
id, user_id, product_id, created_at, updated_at
UNIQUE(user_id, product_id)
```

### contacts
```
id, name, email, message, created_at, updated_at
```

---

## Edge Template Syntax

### Layout
```edge
@layout('layouts/main')

@section('title')
  Page Title
@end

@section('content')
  <div>Content here</div>
@end
```

### Conditionals
```edge
@if(condition)
  <p>True</p>
@else
  <p>False</p>
@endif
```

### Loops
```edge
@each(item in items)
  <div>{{ item.name }}</div>
@else
  <p>No items</p>
@end
```

### Variables
```edge
{{ variable }}              {{-- Escaped --}}
{{{ variable }}}            {{-- Raw HTML --}}
```

### CSRF
```edge
{{ csrfField() }}
```

### Routes
```edge
{{ route('route.name') }}
{{ route('route.name', { id: product.id }) }}
```

### Auth
```edge
@if(auth.isAuthenticated)
  <p>Hello {{ auth.user.name }}</p>
@endif
```

---

## Troubleshooting

### "Port already in use"
Change PORT in `.env` or kill the process:
```powershell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3333).OwningProcess | Stop-Process
```

### "Cannot find module"
```powershell
npm install
npm install @adonisjs/lucid @adonisjs/auth
```

### "Database locked"
Stop the dev server and start again:
```powershell
npm run dev
```

### "Migration already exists"
```powershell
node ace migration:rollback
node ace migration:run
```

### Clear cache
```powershell
rm -r build/
npm run dev
```

---

## Adding New Features

### Add a new route
1. Define route in `start/routes.ts`
2. Create controller method
3. Create view template
4. Test in browser

### Add a new model
1. `node ace make:model ModelName`
2. `node ace make:migration create_table_name`
3. Define schema in migration
4. Run `node ace migration:run`

### Add authentication to route
```typescript
Route.get('/protected', 'Controller.method').middleware('auth')
```

### Add guest-only route
```typescript
Route.get('/login', 'AuthController.showLogin').middleware('guest')
```

---

## Useful Links

- [AdonisJS Docs](https://docs.adonisjs.com)
- [Edge Docs](https://edgejs.dev)
- [Lucid ORM](https://docs.adonisjs.com/guides/database/introduction)
- [Auth Guide](https://docs.adonisjs.com/guides/auth/introduction)
- [TailwindCSS](https://tailwindcss.com)

---

**Quick Start:**
```powershell
npm install && npm install @adonisjs/lucid @adonisjs/auth
node ace configure @adonisjs/lucid
node ace configure @adonisjs/auth
mkdir tmp
node ace migration:run
node ace db:seed
npm run dev
```

Navigate to: http://localhost:3333
