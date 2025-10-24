# SpectrumPro - Automated Setup Script
# Run this script in PowerShell to set up the entire project

Write-Host "🎯 SpectrumPro Setup Script" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""

# Step 1: Install base dependencies
Write-Host "📦 Step 1/7: Installing base dependencies..." -ForegroundColor Cyan
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Base dependencies installed" -ForegroundColor Green
Write-Host ""

# Step 2: Install Lucid ORM
Write-Host "📦 Step 2/7: Installing Lucid ORM..." -ForegroundColor Cyan
npm install @adonisjs/lucid
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install Lucid" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Lucid ORM installed" -ForegroundColor Green
Write-Host ""

# Step 3: Install Auth
Write-Host "📦 Step 3/7: Installing Auth..." -ForegroundColor Cyan
npm install @adonisjs/auth
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install Auth" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Auth installed" -ForegroundColor Green
Write-Host ""

# Step 4: Configure Lucid (manual step required)
Write-Host "⚙️  Step 4/7: Configure Lucid ORM..." -ForegroundColor Cyan
Write-Host "   ℹ️  When prompted:" -ForegroundColor Yellow
Write-Host "   - Select 'sqlite' as the database" -ForegroundColor Yellow
Write-Host ""
node ace configure @adonisjs/lucid
Write-Host "✅ Lucid configured" -ForegroundColor Green
Write-Host ""

# Step 5: Configure Auth (manual step required)
Write-Host "⚙️  Step 5/7: Configure Auth..." -ForegroundColor Cyan
Write-Host "   ℹ️  When prompted:" -ForegroundColor Yellow
Write-Host "   - Select 'web' guard (session-based)" -ForegroundColor Yellow
Write-Host "   - Select 'lucid' provider" -ForegroundColor Yellow
Write-Host "   - Select 'User' model" -ForegroundColor Yellow
Write-Host ""
node ace configure @adonisjs/auth
Write-Host "✅ Auth configured" -ForegroundColor Green
Write-Host ""

# Step 6: Create database directory
Write-Host "📁 Step 6/7: Creating database directory..." -ForegroundColor Cyan
if (!(Test-Path "tmp")) {
    New-Item -ItemType Directory -Path "tmp" | Out-Null
    Write-Host "✅ Database directory created" -ForegroundColor Green
} else {
    Write-Host "✅ Database directory already exists" -ForegroundColor Green
}
Write-Host ""

# Step 7: Run migrations
Write-Host "🗃️  Step 7/7: Running database migrations..." -ForegroundColor Cyan
node ace migration:run
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to run migrations" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Migrations completed" -ForegroundColor Green
Write-Host ""

# Optional: Seed database
Write-Host "🌱 Seeding database (optional)..." -ForegroundColor Cyan
Write-Host "   This will create sample users and products" -ForegroundColor Yellow
$seed = Read-Host "   Do you want to seed the database? (y/n)"
if ($seed -eq "y" -or $seed -eq "Y") {
    node ace db:seed
    Write-Host "✅ Database seeded" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Test Accounts Created:" -ForegroundColor Cyan
    Write-Host "   Buyer:  buyer@example.com / password123" -ForegroundColor White
    Write-Host "   Seller: seller@rayban.com / password123" -ForegroundColor White
    Write-Host "   Seller: seller@oakley.com / password123" -ForegroundColor White
} else {
    Write-Host "⏭️  Skipping database seeding" -ForegroundColor Yellow
}
Write-Host ""

# Check if APP_KEY is set
Write-Host "🔑 Checking APP_KEY..." -ForegroundColor Cyan
if (Test-Path .env) {
    $envContent = Get-Content .env -Raw
    if ($envContent -match "APP_KEY=your-secret-app-key-change-this" -or $envContent -notmatch "APP_KEY=.{32,}") {
        Write-Host "⚠️  Warning: APP_KEY not set or using default value" -ForegroundColor Yellow
        Write-Host "   Generating a new APP_KEY..." -ForegroundColor Yellow
        node ace generate:key
        Write-Host "   ℹ️  Copy the generated key and paste it in your .env file" -ForegroundColor Yellow
    } else {
        Write-Host "✅ APP_KEY is configured" -ForegroundColor Green
    }
} else {
    Write-Host "⚠️  Warning: .env file not found" -ForegroundColor Yellow
}
Write-Host ""

# Setup complete
Write-Host "=====================================" -ForegroundColor Green
Write-Host "🎉 Setup Complete!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""
Write-Host "To start the development server, run:" -ForegroundColor Cyan
Write-Host "   npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Then open your browser to:" -ForegroundColor Cyan
Write-Host "   http://localhost:3333" -ForegroundColor White
Write-Host ""
Write-Host "📚 Documentation:" -ForegroundColor Cyan
Write-Host "   - README.md - Full documentation" -ForegroundColor White
Write-Host "   - SETUP.md - Setup guide" -ForegroundColor White
Write-Host "   - QUICK_REFERENCE.md - Command reference" -ForegroundColor White
Write-Host ""
Write-Host "Happy coding! 🚀" -ForegroundColor Green
