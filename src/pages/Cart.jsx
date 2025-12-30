import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, ChevronRight } from 'lucide-react';

const Cart = () => {
    const { cart, removeFromCart, placeOrder } = useStore();
    const [orderId, setOrderId] = useState(null);

    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const deliveryFee = cart.length > 0 ? 1.99 : 0; // Mock delivery fee needed per restaurant reference really
    const total = subtotal + deliveryFee;

    if (orderId) {
        return (
            <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
                <div style={{ background: '#d4edda', color: '#155724', padding: '2rem', borderRadius: '12px', display: 'inline-block' }}>
                    <h2 style={{ marginBottom: '1rem' }}>Order Placed Successfully!</h2>
                    <p>Order ID: <strong>#{orderId}</strong></p>
                    <p style={{ marginTop: '1rem' }}>The restaurant has received your order and starts preparing it shortly.</p>
                    <button className="btn btn-primary" style={{ marginTop: '2rem' }} onClick={() => window.location.href = '/track'}>Track Order</button>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '2rem 1rem', maxWidth: '800px' }}>
            <h1 className="section-title">Your Basket</h1>

            {cart.length === 0 ? (
                <div className="text-center" style={{ padding: '3rem', color: 'var(--text-muted)' }}>
                    <ShoppingBag size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
                    <p>Your basket is empty. Go find some delicious food!</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
                    {/* Cart Items */}
                    <div className="card">
                        {cart.map(item => (
                            <div key={item.id} className="flex justify-between items-center" style={{ padding: '1rem 0', borderBottom: '1px solid var(--border)' }}>
                                <div className="flex gap-4 items-center">
                                    <div style={{ background: '#f1f2f6', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 600 }}>
                                        {item.quantity}x
                                    </div>
                                    <div>
                                        <h4 style={{ fontWeight: 600 }}>{item.name}</h4>
                                        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>${item.price}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span style={{ fontWeight: 600 }}>${(item.price * item.quantity).toFixed(2)}</span>
                                    <button className="btn-outline" onClick={() => removeFromCart(item.id)} style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="card" style={{ height: 'fit-content' }}>
                        <h3 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1rem' }}>Summary</h3>
                        <div className="flex justify-between mb-2">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-4">
                            <span>Delivery Fee</span>
                            <span>${deliveryFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-4" style={{ fontSize: '1.2rem', fontWeight: 700 }}>
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        <button
                            className="btn btn-primary"
                            style={{ width: '100%', justifyContent: 'center' }}
                            onClick={() => setOrderId(placeOrder())}
                        >
                            Pay & Order <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
