import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Heart } from 'lucide-react';

const CATEGORIES = [
    { id: 1, name: 'Burgers', icon: '🍔' },
    { id: 2, name: 'Pizza', icon: '🍕' },
    { id: 3, name: 'Sushi', icon: '🍣' },
    { id: 4, name: 'Asian', icon: '🍜' },
    { id: 5, name: 'Vegan', icon: '🥗' },
    { id: 6, name: 'Dessert', icon: '🍰' },
];

const POPULAR_RESTAURANTS = [
    {
        id: 1,
        name: "Burger King",
        rating: 4.5,
        time: "25-35 min",
        deliveryFee: "$1.99",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60",
        tags: ["Burgers", "American"]
    },
    {
        id: 2,
        name: "Sushi Master",
        rating: 4.8,
        time: "40-50 min",
        deliveryFee: "$3.99",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=60",
        tags: ["Sushi", "Japanese"]
    },
    {
        id: 3,
        name: "Pizza Hut",
        rating: 4.3,
        time: "30-45 min",
        deliveryFee: "$2.49",
        image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=500&q=60",
        tags: ["Pizza", "Italian"]
    },
    {
        id: 4,
        name: "Green Bowl",
        rating: 4.9,
        time: "15-25 min",
        deliveryFee: "Free",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=60",
        tags: ["Healthy", "Vegan"]
    }
];

const Home = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero" style={{
                background: 'linear-gradient(to right, #FFF3E0, #FFE0B2)',
                padding: '3rem 0',
                marginBottom: '2rem'
            }}>
                <div className="container flex items-center justify-between">
                    <div style={{ maxWidth: '600px' }}>
                        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem', color: '#2D3436' }}>
                            Craving something? <br />
                            <span style={{ color: 'var(--primary)' }}>We deliver.</span>
                        </h1>
                        <p style={{ fontSize: '1.2rem', color: '#636e72', marginBottom: '2rem' }}>
                            Get your favorite meals delivered fresh and hot to your doorstep in minutes.
                        </p>
                        <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                            Order Now
                        </button>
                    </div>
                    <div className="hero-image" style={{ width: '400px', height: '300px', background: '#fff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img
                            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=60"
                            alt="Delicious Food"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
                        />
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="container categories" style={{ marginBottom: '3rem' }}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="section-title" style={{ marginBottom: 0 }}>Explore Categories</h2>
                    <a href="#" style={{ color: 'var(--primary)', fontWeight: 600 }}>View All</a>
                </div>

                <div className="flex gap-4" style={{ overflowX: 'auto', paddingBottom: '1rem' }}>
                    {CATEGORIES.map(cat => (
                        <div key={cat.id} className="card flex-col items-center justify-center" style={{
                            minWidth: '120px',
                            height: '120px',
                            cursor: 'pointer',
                            border: '1px solid transparent'
                        }}
                            onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                            onMouseOut={(e) => e.currentTarget.style.borderColor = 'transparent'}
                        >
                            <span style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{cat.icon}</span>
                            <span style={{ fontWeight: 600 }}>{cat.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Popular Restaurants */}
            <section className="container">
                <h2 className="section-title">Popular Restaurants</h2>
                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                    {POPULAR_RESTAURANTS.map(restaurant => (
                        <div key={restaurant.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                            <Link to={`/restaurant/${restaurant.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
                                <div style={{ height: '180px', position: 'relative' }}>
                                    <img src={restaurant.image} alt={restaurant.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0' }} />
                                    <button style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px',
                                        background: 'white',
                                        padding: '5px',
                                        borderRadius: '50%',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                        zIndex: 2
                                    }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            // Add to wishlist
                                        }}
                                    >
                                        <Heart size={18} color={restaurant.id === 1 ? 'red' : '#ccc'} fill={restaurant.id === 1 ? 'red' : 'none'} />
                                    </button>
                                </div>
                                <div style={{ padding: '1rem' }}>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{restaurant.name}</h3>
                                        <div className="flex items-center gap-1" style={{ background: '#f1f2f6', padding: '2px 6px', borderRadius: '4px' }}>
                                            <Star size={14} color="orange" fill="orange" />
                                            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{restaurant.rating}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted" style={{ fontSize: '0.9rem', color: '#636e72', marginBottom: '1rem' }}>
                                        <span>{restaurant.tags.join(', ')}</span>
                                        <span>•</span>
                                        <Clock size={14} />
                                        <span>{restaurant.time}</span>
                                    </div>
                                    <div className="flex justify-between items-center" style={{ borderTop: '1px solid #f1f2f6', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
                                        <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{restaurant.deliveryFee} Delivery</span>
                                        <span className="btn-primary" style={{ padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem' }}>View Menu</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            <div style={{ height: '4rem' }}></div>
        </div>
    );
};

export default Home;
