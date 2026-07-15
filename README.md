# RenzoSuperStore Customer App

A modern, Android-first Progressive Web App (PWA) for customers to browse, shop, and manage their orders on RenzoSuperStore.

## Features

### 🔐 Authentication
- Email/Password registration and login
- Forgot password functionality
- Email verification
- Secure logout

### 🏪 Shopping Experience
- Browse all products with advanced filtering
- Product search with autocomplete
- Product categories and subcategories
- Featured, new arrivals, best sellers, and flash deals
- Product details with multiple images
- Customer reviews and ratings
- Wishlist functionality
- Recently viewed products

### 🛒 Shopping Cart & Checkout
- Add/remove items from cart
- Update quantities
- Persistent cart storage
- Shipping address management
- Multiple delivery options
- Discount coupon application
- Order summary and review

### 💳 Payment Options
- Stripe integration
- PayPal integration
- Yoco integration
- Secure payment processing

### 📦 Order Management
- Place orders
- Order history
- Real-time order tracking
- Order status updates
- Invoice download

### 👤 User Profile
- Edit profile information
- Change password
- Saved addresses management
- Saved payment methods
- Notification preferences
- Dark mode toggle
- Account settings

### 📱 Progressive Web App
- Responsive mobile-first design
- Offline support
- Push notifications
- Installable as app
- Smooth animations and transitions
- Loading skeletons and states
- Error handling and recovery

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Authentication**: Firebase Auth
- **Database**: Cloud Firestore
- **Storage**: Firebase Storage
- **Payments**: Stripe, PayPal, Yoco
- **UI Components**: Custom components + Lucide Icons
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── auth/            # Authentication components
│   ├── products/        # Product-related components
│   ├── cart/            # Shopping cart components
│   ├── checkout/        # Checkout components
│   ├── common/          # Shared components
│   └── layout/          # Layout components
├── pages/               # Page components
│   ├── auth/           # Auth pages
│   ├── products/       # Product pages
│   ├── checkout/       # Checkout pages
│   ├── profile/        # Profile pages
│   └── orders/         # Order pages
├── services/           # API and Firebase services
│   ├── firebase/       # Firebase configuration
│   ├── auth/          # Auth services
│   ├── products/      # Product services
│   ├── orders/        # Order services
│   ├── payments/      # Payment services
│   └── notifications/ # Notification services
├── stores/            # Zustand state management
├── hooks/             # Custom React hooks
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── styles/            # Global styles
└── App.tsx            # Main App component
```

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- Firebase project credentials
- Payment gateway accounts (Stripe, PayPal, Yoco)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Lorenzo3549/RenzoSuperStore-Admin-.git
   cd RenzoSuperStore-Admin-
   ```

2. **Switch to customer-app branch**
   ```bash
   git checkout customer-app
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Firebase and payment gateway credentials
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

## Environment Configuration

Create a `.env` file with your Firebase and payment gateway credentials:

```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_STRIPE_PUBLIC_KEY=your_stripe_key
VITE_PAYPAL_CLIENT_ID=your_paypal_id
VITE_YOCO_SECRET_KEY=your_yoco_key
```

## Firebase Setup

1. Create a Firebase project
2. Enable Authentication (Email/Password)
3. Create Firestore Database
4. Create Storage Bucket
5. Enable Cloud Messaging
6. Add your credentials to `.env`

## PWA Configuration

The app is configured as a Progressive Web App:
- Service worker for offline support
- Web manifest for installation
- Push notifications enabled
- Responsive design for all devices

## Deployment

### Firebase Hosting
```bash
# Build the app
npm run build

# Deploy using Firebase CLI
firebase deploy
```

### Vercel
```bash
# Connect your GitHub repository to Vercel
# Push to main or customer-app branch
# Vercel automatically builds and deploys
```

### Netlify
```bash
# Connect your GitHub repository to Netlify
# Configure build settings:
# Build command: npm run build
# Publish directory: dist
```

## Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Create a Pull Request

## License

MIT License - feel free to use this project for your own purposes.

## Support

For support, please create an issue in the repository or contact the team.

---

**Built with ❤️ for RenzoSuperStore**
