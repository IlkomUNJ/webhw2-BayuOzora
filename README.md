# SpectrumPro - Premium Eyewear Marketplace

A full-stack web application built with AdonisJS v5, Edge templating, and SQLite database for buying and selling premium eyewear.

## 🚀 Features

### User Features
- Browse premium eyewear products
- Search and filter products by keyword
- View detailed product information
- Add products to wishlist
- Contact form for inquiries
- User authentication (register/login)

### Seller Features
- Add new products (title, description, price, image)
- Edit existing products
- Delete products
- View all products added by the seller
- View users who added products to wishlist

## 🛠️ Tech Stack

- **Framework**: AdonisJS v5
- **View Engine**: Edge (classic syntax)
- **Database**: SQLite (file-based)
- **Authentication**: Adonis Auth with session-based authentication
- **Styling**: TailwindCSS (CDN)
- **Font**: Google Fonts (Poppins)

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Install Required Adonis Packages**
   ```bash
   npm install @adonisjs/lucid @adonisjs/auth
   node ace configure @adonisjs/lucid
   node ace configure @adonisjs/auth
   ```

3. **Configure Environment**
   Create a `.env` file (or update existing one) with:
   ```env
   PORT=3333
   HOST=0.0.0.0
   NODE_ENV=development
   APP_KEY=your-secret-app-key-change-this
   APP_NAME=SpectrumPro
   CACHE_VIEWS=false
   SESSION_DRIVER=cookie
   DRIVE_DISK=local
   DB_CONNECTION=sqlite
   DB_FILENAME=./tmp/db.sqlite3
   ```

4. **Generate App Key** (if not already set)
   ```bash
   node ace generate:key
   ```

5. **Create Database Directory**
   ```bash
   mkdir tmp
   ```

6. **Run Migrations**
   ```bash
   node ace migration:run
   ```

7. **Start Development Server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3333`

## 📁 Project Structure

```
blog-app/
├── app/
│   ├── Controllers/Http/    # All controllers
│   │   ├── AuthController.ts
│   │   ├── ContactController.ts
│   │   ├── HomeController.ts
│   │   ├── ProductController.ts
│   │   ├── SellerController.ts
│   │   └── UserController.ts
│   ├── Models/              # Database models
│   │   ├── User.ts
│   │   ├── Product.ts
│   │   ├── Wishlist.ts
│   │   └── Contact.ts
│   └── Middleware/          # Authentication middleware
│       ├── Auth.ts
│       ├── Guest.ts
│       └── SilentAuth.ts
├── config/                  # Configuration files
│   ├── auth.ts
│   ├── database.ts
│   └── ...
├── database/
│   └── migrations/          # Database migrations
│       ├── 1_users.ts
│       ├── 2_products.ts
│       ├── 3_wishlists.ts
│       └── 4_contacts.ts
├── public/                  # Static assets
│   └── js/
│       └── script.js
├── resources/views/         # Edge templates
│   ├── layouts/
│   │   └── main.edge        # Main layout
│   ├── home/
│   │   ├── index.edge       # Homepage
│   │   └── about.edge       # About page
│   ├── products/
│   │   ├── index.edge       # Product listing
│   │   ├── search.edge      # Search results
│   │   └── show.edge        # Product detail
│   ├── auth/
│   │   ├── register.edge    # Registration
│   │   └── login.edge       # Login
│   ├── contact/
│   │   └── index.edge       # Contact form
│   ├── user/
│   │   └── wishlist.edge    # User wishlist
│   └── seller/
│       ├── products.edge    # Seller products
│       ├── create.edge      # Add product
│       ├── edit.edge        # Edit product
│       └── wishlists.edge   # View wishlists
└── start/
    ├── routes.ts            # Application routes
    └── kernel.ts            # Middleware registration
```

## 🗺️ Routes

### Public Routes
- `GET /` - Home page
- `GET /about` - About page
- `GET /shop` - Product listing
- `GET /search` - Search products
- `GET /product/:id` - Product details
- `GET /contact` - Contact form
- `POST /contact` - Submit contact form

### Authentication Routes
- `GET /register` - Registration form
- `POST /register` - Register user
- `GET /login` - Login form
- `POST /login` - Login user
- `POST /logout` - Logout user

### User Routes (Authenticated)
- `GET /user/wishlist` - View wishlist
- `POST /user/wishlist/add` - Add to wishlist
- `DELETE /user/wishlist/:id` - Remove from wishlist

### Seller Routes (Authenticated Sellers)
- `GET /seller/products` - View seller products
- `GET /seller/add` - Add product form
- `POST /seller/add` - Create product
- `GET /seller/edit/:id` - Edit product form
- `POST /seller/edit/:id` - Update product
- `DELETE /seller/delete/:id` - Delete product
- `GET /seller/wishlists` - View product wishlists

## 💾 Database Schema

### Users Table
- `id` - Primary key
- `name` - User's full name
- `email` - Unique email
- `password` - Hashed password
- `role` - 'user' or 'seller'
- `remember_me_token` - Session token
- `created_at`, `updated_at` - Timestamps

### Products Table
- `id` - Primary key
- `seller_id` - Foreign key to users
- `title` - Product title
- `description` - Product description
- `price` - Product price (decimal)
- `image` - Image URL
- `created_at`, `updated_at` - Timestamps

### Wishlists Table
- `id` - Primary key
- `user_id` - Foreign key to users
- `product_id` - Foreign key to products
- `created_at`, `updated_at` - Timestamps
- Unique constraint on (user_id, product_id)

### Contacts Table
- `id` - Primary key
- `name` - Contact name
- `email` - Contact email
- `message` - Message content
- `created_at`, `updated_at` - Timestamps

## 🎨 Styling

The project uses **TailwindCSS** loaded via CDN for styling. The color scheme features:
- Primary: Green (#16a34a)
- Text: Gray shades
- Background: Light gray (#f9fafb)
- Font: Poppins (Google Fonts)

## 📝 Development Notes

### Adding Sample Data
You can add sample products manually through the seller interface after registering as a seller.

### File Uploads
Product images can be:
1. URLs (external image links)
2. Uploaded files (stored in `public/uploads/`)

### Session-Based Authentication
The application uses session-based authentication with cookies. Users remain logged in across page refreshes.

### Middleware
- **SilentAuth**: Checks authentication on all routes without throwing errors
- **Auth**: Protects routes requiring authentication
- **Guest**: Prevents authenticated users from accessing login/register pages

## 🔧 Available Commands

```bash
# Development
npm run dev              # Start development server with hot reload

# Production
npm run build            # Build for production
npm start                # Start production server

# Database
node ace migration:run   # Run migrations
node ace migration:rollback  # Rollback migrations
node ace migration:refresh   # Refresh migrations

# Other
node ace list            # List all available commands
node ace make:controller <name>  # Generate controller
node ace make:model <name>       # Generate model
```

## 🚨 Troubleshooting

### Database Issues
- Ensure the `tmp/` directory exists
- Check that migrations have been run
- Verify SQLite is installed

### Authentication Issues
- Ensure `APP_KEY` is set in `.env`
- Check that auth middleware is registered in `start/kernel.ts`
- Verify session driver is configured correctly

### View Issues
- Clear view cache: Delete files in `build/` directory
- Ensure all Edge files have `.edge` extension
- Check that layout path is correct in view files

## 📄 License

This project is for educational purposes.

## 👥 Credits

Built as part of a web development course project integrating AdonisJS with Edge templating and SQLite.
