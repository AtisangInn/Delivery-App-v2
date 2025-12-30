# Kagiso Eats - MVP (Phase 1)

This is the first iteration of the **Kagiso Eats** Hyperlocal Food Delivery Platform.
It demonstrates the core **Customer** and **Partner** workflows using a shared frontend state.

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```
2. **Run the Development Server**
   ```bash
   npm run dev
   ```
3. **Open the App**
   Navigate to `http://localhost:5173`

## 📱 Features Implemented

### 1. Customer App (/)
- **Restaurant Discovery**: Browse popular local restaurants (Burger King, Sushi Master, etc.).
- **Menu Viewing**: Click on any restaurant to view their specific menu.
- **Cart Management**: Add items to basket, view summary, and checkout.
- **Order Placement**: "Pay & Order" simulates sending an order to the backend.

### 2. Partner Dashboard (/partner)
To simulate the restaurant side:
1. Open a new tab or use the footer link "Partner Login".
2. Navigate to `/partner`.
3. You will see **Incoming Orders** placed by customers in real-time (shared state).
4. **Actions**: Mark orders as "Preparing" -> "Ready for Pickup".

## 🛠️ Tech Stack
- **Framework**: React + Vite
- **Styling**: Vanilla CSS (Custom Design System with CSS Variables)
- **Icons**: Lucide React
- **Routing**: React Router DOM (v6)

## ⚠️ Note
This MVP uses **local state (React Context)**. Refreshing the browser will reset active orders.
