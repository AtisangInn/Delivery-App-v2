import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Star, Clock, Plus, ArrowLeft } from 'lucide-react';

const Restaurant = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { restaurants, addToCart, cart } = useStore();

    const restaurant = restaurants.find(r => r.id === parseInt(id));

    if (!restaurant) return <div>Restaurant not found</div>;

    const cartQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div className="restaurant-page fade-in">
            {/* Hero/Header */}
            <div style={{ height: '250px', position: 'relative' }}>
                <img src={restaurant.image} alt={restaurant.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 0 }} />
                <div style={{
                    position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'
                }}></div>
                <div className="container" style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', color: 'white', width: '100%' }}>
                    <button onClick={() => navigate('/')} style={{ color: 'white', display: 'flex', items: 'center', gap: '0.5rem', marginBottom: '1rem', fontWeight: 600 }}>
                        <ArrowLeft size={20} /> Back
                    </button>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 700 }}>{restaurant.name}</h1>
                    <div className="flex items-center gap-4" style={{ fontSize: '1rem', marginTop: '0.5rem' }}>
                        <span className="flex items-center gap-1"><Star size={16} fill="orange" color="orange" /> {restaurant.rating}</span>
                        <span>•</span>
                        <span>{restaurant.tags.join(', ')}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Clock size={16} /> {restaurant.time}</span>
                        <span>•</span>
                        <span>Delivery: ${restaurant.deliveryFee}</span>
                    </div>
                </div>
            </div>

            {/* Menu Section */}
            <div className="container py-8" style={{ padding: '2rem 1rem' }}>
                <h2 className="section-title">Menu</h2>
                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {restaurant.menu.map(item => (
                        <div key={item.id} className="card flex justify-between items-center" style={{ padding: '1.25rem' }}>
                            <div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem' }}>{item.name}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>{item.description}</p>
                                <span style={{ fontWeight: 700, color: 'var(--primary)' }}>${item.price.toFixed(2)}</span>
                            </div>
                            <button
                                className="btn-primary"
                                style={{ padding: '0.5rem', borderRadius: '50%', minWidth: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                onClick={() => addToCart(item, restaurant.id)}
                            >
                                <Plus size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sticky Cart Button Mobile */}
            {cartQuantity > 0 && (
                <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 100 }}>
                    <button className="btn btn-primary" onClick={() => alert('Checkout logic coming next!')} style={{ padding: '1rem 2rem', userSelect: 'none', boxShadow: 'var(--shadow-lg)' }}>
                        View Basket ({cartQuantity})
                    </button>
                </div>
            )}
        </div>
    );
};

export default Restaurant;
