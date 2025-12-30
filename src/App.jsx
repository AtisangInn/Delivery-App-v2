import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Restaurant from './pages/Restaurant';
import Cart from './pages/Cart';
import PartnerDashboard from './pages/partner/Dashboard';
import DriverDashboard from './pages/driver/Dashboard'; // Import Driver
import OrderTracking from './pages/OrderTracking'; // Import Tracking
import { StoreProvider } from './context/StoreContext';

function App() {
  return (
    <StoreProvider>
      <Router>
        <div className="app">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/restaurant/:id" element={<Restaurant />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/track" element={<OrderTracking />} />
            <Route path="/partner" element={<PartnerDashboard />} />
            <Route path="/driver" element={<DriverDashboard />} />
          </Routes>

          <footer className="footer container py-8 mt-8 text-center" style={{ padding: '2rem 0', borderTop: '1px solid var(--border)', color: 'var(--text-muted)' }}>
            <p>© 2025 Kagiso Eats. Built for the community.</p>
            <div className="flex justify-center gap-4 mt-2">
              <Link to="/partner">Partner Login</Link>
              <Link to="/driver">Driver Login</Link>
            </div>
          </footer>
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
