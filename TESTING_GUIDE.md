# 🧪 Testing Guide for SpectrumPro

This guide will walk you through testing all features of the SpectrumPro application.

## Prerequisites

Ensure the application is running:
```powershell
npm run dev
```

Navigate to: http://localhost:3333

---

## Test Scenarios

### 1. 🏠 Public Pages (No Authentication Required)

#### Home Page
- [ ] Visit `/`
- [ ] Verify hero section displays with eyewear image
- [ ] Check "Shop Now" button redirects to `/shop`
- [ ] Verify mission statement is visible

#### About Page
- [ ] Click "About" in navigation
- [ ] Verify about content displays correctly
- [ ] Check formatting and styling

#### Contact Page
- [ ] Click "Contact" in navigation
- [ ] Fill out the form:
  - Name: "Test User"
  - Email: "test@example.com"
  - Message: "This is a test message"
- [ ] Submit form
- [ ] Verify success message appears
- [ ] Check database: `SELECT * FROM contacts`

#### Shop Page
- [ ] Click "Shop" in navigation
- [ ] Verify products display in grid format
- [ ] Check product images load correctly
- [ ] Verify prices and seller names show

#### Search Functionality
- [ ] Use search bar on shop page
- [ ] Search for "Ray-Ban"
- [ ] Verify filtered results display
- [ ] Try searching for "Oakley"
- [ ] Test empty search results

---

### 2. 👤 Authentication Testing

#### Registration as Buyer
- [ ] Click "Register" in navigation
- [ ] Fill out form:
  - Name: "Test Buyer"
  - Email: "testbuyer@example.com"
  - Password: "password123"
  - Role: "Buyer"
- [ ] Submit form
- [ ] Verify redirect to home page
- [ ] Check "Logout" button appears in navigation
- [ ] Verify "My Wishlist" link appears

#### Registration as Seller
- [ ] Logout if logged in
- [ ] Click "Register"
- [ ] Fill out form:
  - Name: "Test Seller"
  - Email: "testseller@example.com"
  - Password: "password123"
  - Role: "Seller"
- [ ] Submit form
- [ ] Verify redirect to `/seller/products`
- [ ] Check "My Products" and "Wishlists" links appear

#### Login
- [ ] Logout
- [ ] Click "Login"
- [ ] Enter credentials:
  - Email: "testbuyer@example.com"
  - Password: "password123"
- [ ] Submit
- [ ] Verify successful login and redirect

#### Logout
- [ ] Click "Logout" button
- [ ] Verify redirect to home page
- [ ] Check navigation shows "Login" and "Register" again

---

### 3. 🛍️ Buyer Features

Login as buyer: `testbuyer@example.com` / `password123`

#### View Products
- [ ] Navigate to Shop page
- [ ] Click on a product
- [ ] Verify product details page loads
- [ ] Check description tab
- [ ] Click specifications tab
- [ ] Verify tabs switch correctly

#### Add to Wishlist
- [ ] On product details page, click "Add to Wishlist"
- [ ] Verify success message appears
- [ ] Click "My Wishlist" in navigation
- [ ] Verify product appears in wishlist

#### Add Duplicate to Wishlist
- [ ] Go back to same product
- [ ] Try to add to wishlist again
- [ ] Verify error message: "Product already in wishlist"

#### Remove from Wishlist
- [ ] Go to "My Wishlist"
- [ ] Click "Remove" on a product
- [ ] Verify product is removed
- [ ] Check success message appears

#### Wishlist When Empty
- [ ] Remove all products from wishlist
- [ ] Verify "Your wishlist is empty" message shows
- [ ] Check "Start shopping" link works

---

### 4. 🏪 Seller Features

Login as seller: `testseller@example.com` / `password123`

#### View My Products
- [ ] Navigate to "My Products"
- [ ] Verify empty state shows if no products
- [ ] Check "Add New Product" button exists

#### Add New Product
- [ ] Click "Add New Product"
- [ ] Fill out form:
  - Title: "Test Sunglasses"
  - Description: "These are test sunglasses with premium quality"
  - Price: "199.99"
  - Image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80"
- [ ] Submit form
- [ ] Verify redirect to "My Products"
- [ ] Check product appears in list
- [ ] Verify success message

#### Edit Product
- [ ] Click "Edit" on a product
- [ ] Change title to "Updated Test Sunglasses"
- [ ] Change price to "249.99"
- [ ] Submit
- [ ] Verify changes appear on products list
- [ ] Check success message

#### Delete Product
- [ ] Click "Delete" on a product
- [ ] Confirm deletion in popup
- [ ] Verify product is removed from list
- [ ] Check success message

#### View Wishlists
- [ ] Have a buyer add your product to wishlist (test with another browser/incognito)
- [ ] Navigate to "Wishlists" as seller
- [ ] Verify table shows users who wishlisted products
- [ ] Check user name, email, product, and date appear

#### View Wishlists When Empty
- [ ] If no wishlists exist, verify message:
  "No users have added your products to their wishlist yet."

---

### 5. 🔒 Security & Access Control

#### Protected Routes (Logged Out)
- [ ] Logout
- [ ] Try to access `/user/wishlist`
- [ ] Verify redirect to `/login`
- [ ] Try to access `/seller/products`
- [ ] Verify redirect to `/login`

#### Guest-Only Routes (Logged In)
- [ ] Login as buyer
- [ ] Try to access `/login`
- [ ] Verify redirect to home
- [ ] Try to access `/register`
- [ ] Verify redirect to home

#### Role-Based Access
- [ ] Login as buyer (user role)
- [ ] Try to access `/seller/products` directly
- [ ] Verify appropriate access (should work but show empty unless user is seller)
- [ ] Login as seller
- [ ] Verify "My Products" shows seller's products only

---

### 6. 🎨 UI/UX Testing

#### Navigation
- [ ] Test all navigation links
- [ ] Verify active states
- [ ] Check hover effects

#### Mobile Menu
- [ ] Resize browser to mobile width
- [ ] Click hamburger icon
- [ ] Verify menu opens
- [ ] Test all links in mobile menu
- [ ] Close menu by clicking hamburger again

#### Flash Messages
- [ ] Trigger success message (e.g., add to wishlist)
- [ ] Verify green success banner appears at top
- [ ] Trigger error message (e.g., add duplicate to wishlist)
- [ ] Verify red error banner appears

#### Forms
- [ ] Test all forms with empty fields
- [ ] Verify HTML5 validation works
- [ ] Test with invalid email format
- [ ] Verify error handling

#### Responsive Design
- [ ] Test on mobile (< 768px)
- [ ] Test on tablet (768px - 1024px)
- [ ] Test on desktop (> 1024px)
- [ ] Verify product grids adjust properly
- [ ] Check navigation adapts to screen size

---

### 7. 🗄️ Database Integrity

#### Check Data Persistence
- [ ] Add product as seller
- [ ] Restart server
- [ ] Verify product still exists
- [ ] Add item to wishlist
- [ ] Logout and login
- [ ] Verify wishlist persists

#### Check Relationships
- [ ] View product details
- [ ] Verify seller name displays correctly
- [ ] Delete a seller's product
- [ ] Verify wishlists for that product are also deleted (cascade)

#### Check Constraints
- [ ] Try to add same product to wishlist twice
- [ ] Verify unique constraint works
- [ ] Register with existing email
- [ ] Verify unique email constraint works

---

### 8. 📊 Data Validation

#### Product Creation
- [ ] Try negative price
- [ ] Try empty title
- [ ] Try empty description
- [ ] Verify validation prevents submission

#### Registration
- [ ] Try weak password (if validation added)
- [ ] Try invalid email format
- [ ] Verify HTML5 validation

#### Contact Form
- [ ] Submit with empty fields
- [ ] Submit with invalid email
- [ ] Verify validation works

---

## 🐛 Common Issues & Solutions

### Issue: Products not displaying
**Solution:** Check if database is seeded or add products manually as seller

### Issue: Login doesn't work
**Solution:** Verify APP_KEY is set in .env file

### Issue: Flash messages not appearing
**Solution:** Check session driver is set to 'cookie' in .env

### Issue: Wishlist operations fail
**Solution:** Ensure migrations are run and user is authenticated

### Issue: Images not loading
**Solution:** Check image URLs are valid, or upload to public/uploads/

---

## ✅ Test Checklist Summary

### Public Features
- [x] Home page loads
- [x] About page displays
- [x] Contact form submits
- [x] Products display on shop
- [x] Search works
- [x] Product details show

### Authentication
- [x] Register as buyer
- [x] Register as seller
- [x] Login works
- [x] Logout works
- [x] Protected routes redirect
- [x] Guest routes redirect

### Buyer Features
- [x] View products
- [x] Add to wishlist
- [x] Remove from wishlist
- [x] Duplicate prevention

### Seller Features
- [x] View my products
- [x] Add product
- [x] Edit product
- [x] Delete product
- [x] View wishlists

### UI/UX
- [x] Navigation works
- [x] Mobile menu works
- [x] Flash messages show
- [x] Forms validate
- [x] Responsive design

---

## 📝 Test Report Template

Copy this template to document your testing:

```
SpectrumPro Test Report
Date: [DATE]
Tester: [NAME]

Environment:
- Browser: [Chrome/Firefox/Safari/Edge]
- OS: [Windows/Mac/Linux]
- Node Version: [VERSION]

Test Results:
✅ All public pages load correctly
✅ Authentication system works
✅ Buyer features functional
✅ Seller features functional
✅ UI/UX responsive and intuitive
✅ Database operations successful

Issues Found:
1. [Issue description]
   - Steps to reproduce
   - Expected behavior
   - Actual behavior

Overall Status: [PASS/FAIL]
Notes: [Additional observations]
```

---

## 🚀 Automated Testing (Future Enhancement)

To add automated tests:

```powershell
# Run tests (when implemented)
node ace test

# Run specific test
node ace test --files=tests/functional/auth.spec.ts
```

---

**Testing Complete!** 🎉

If all tests pass, the application is ready for use!
