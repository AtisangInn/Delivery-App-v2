import React from 'react';
import { Search, ShoppingBag, User, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import '../index.css';

const Navbar = () => {
  const { cart } = useStore();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'var(--surface)',
      borderBottom: '1px solid var(--border)',
      padding: '1rem 0'
    }}>
      <div className="container flex items-center justify-between">
        <Link to="/" className="logo flex items-center gap-2">
          <div style={{ width: 32, height: 32, background: 'var(--primary)', borderRadius: '8px' }}></div>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--secondary)' }}>Kagiso<span style={{ color: 'var(--primary)' }}>Eats</span></span>
        </Link>

        <div className="search-bar flex items-center gap-2" style={{
          background: 'var(--background)',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--radius-md)',
          width: '40%'
        }}>
          <MapPin size={18} color="var(--primary)" />
          <span style={{ fontSize: '0.9rem', fontWeight: 500, marginRight: '1rem' }}>New York, NY</span>
          <div style={{ width: 1, height: 20, background: '#ccc' }}></div>
          <Search size={18} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search for food..."
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              width: '100%',
              fontSize: '0.95rem'
            }}
          />
        </div>

        <div className="nav-actions flex items-center gap-4">
          <button className="flex items-center gap-2" style={{ fontWeight: 600 }}>
            <User size={20} />
            Login
          </button>
          <Link to="/cart" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <ShoppingBag size={20} />
            <span>{cartCount}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
