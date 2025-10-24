import Route from '@ioc:Adonis/Core/Route'

// ========================================
// Public Routes
// ========================================

// Home & Static Pages
Route.get('/', 'HomeController.index').as('home')
Route.get('/about', 'HomeController.about').as('about')

// Products
Route.get('/shop', 'ProductController.index').as('products.index')
Route.get('/search', 'ProductController.search').as('products.search')
Route.get('/product/:id', 'ProductController.show').as('products.show')

// Contact
Route.get('/contact', 'ContactController.show').as('contact.show')
Route.post('/contact', 'ContactController.store').as('contact.store')

// ========================================
// Authentication Routes (Guest only)
// ========================================
Route.group(() => {
  Route.get('/register', 'AuthController.showRegister').as('auth.register.show')
  Route.post('/register', 'AuthController.register').as('auth.register')
  Route.get('/login', 'AuthController.showLogin').as('auth.login.show')
  Route.post('/login', 'AuthController.login').as('auth.login')
}).middleware('guest')

// Logout (Authenticated only)
Route.post('/logout', 'AuthController.logout').as('auth.logout').middleware('auth')

// ========================================
// User Routes (Authenticated Users)
// ========================================
Route.group(() => {
  Route.get('/profile', 'UserController.profile').as('user.profile')
  Route.get('/wishlist', 'UserController.wishlist').as('user.wishlist')
  Route.post('/wishlist/add', 'UserController.addToWishlist').as('user.wishlist.add')
  Route.delete('/wishlist/:id', 'UserController.removeFromWishlist').as('user.wishlist.remove')
}).prefix('user').middleware('auth')

// ========================================
// Seller Routes (Authenticated Sellers)
// ========================================
Route.group(() => {
  Route.get('/products', 'SellerController.products').as('seller.products')
  Route.get('/add', 'SellerController.create').as('seller.create')
  Route.post('/add', 'SellerController.store').as('seller.store')
  Route.get('/edit/:id', 'SellerController.edit').as('seller.edit')
  Route.post('/edit/:id', 'SellerController.update').as('seller.update')
  Route.delete('/delete/:id', 'SellerController.destroy').as('seller.delete')
  Route.get('/wishlists', 'SellerController.wishlists').as('seller.wishlists')
}).prefix('seller').middleware('auth')
