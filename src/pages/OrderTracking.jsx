import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrderTracking = () => {
    const { orders } = useStore();
    const navigate = useNavigate();

    // In a real app, we would fetch the user's specific active order. 
    // Here we just grab the most recent one placed in the current session.
    const activeOrder = orders[0];

    if (!activeOrder) {
        return (
            <div className="container text-center py-8">
                <h2>No active orders</h2>
                <button className="btn btn-primary mt-4" onClick={() => navigate('/')}>Browser Food</button>
            </div>
        );
    }

    // Status Progress Logic
    const steps = ['Pending', 'Preparing', 'Ready for Pickup', 'Out for Delivery', 'Delivered'];
    const currentStepIndex = steps.indexOf(activeOrder.status);

    return (
        <div className="container" style={{ padding: '2rem 1rem', maxWidth: '800px' }}>
            <h1 className="section-title">Track Order</h1>

            <div className="card mb-8">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 style={{ fontSize: '1.5rem' }}>Order #{activeOrder.id}</h2>
                        <span style={{ color: 'var(--text-muted)' }}>From {activeOrder.items[0]?.name?.split(' ')[0] || 'Restaurant'}</span>
                    </div>
                    <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>${activeOrder.total.toFixed(2)}</span>
                </div>

                {/* Progress Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', margin: '3rem 0' }}>
                    {/* Line */}
                    <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '4px', background: '#eee', zIndex: 0, transform: 'translateY(-50%)' }}></div>
                    <div style={{ position: 'absolute', top: '50%', left: 0, width: `${(currentStepIndex / (steps.length - 1)) * 100}%`, height: '4px', background: 'green', zIndex: 0, transform: 'translateY(-50%)', transition: 'width 0.5s ease' }}></div>

                    {steps.map((step, index) => {
                        const completed = index <= currentStepIndex;
                        return (
                            <div key={step} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    background: completed ? 'green' : '#eee',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '0.5rem',
                                    transition: 'background 0.3s'
                                }}>
                                    {completed ? <CheckCircle size={16} /> : <Clock size={16} color="#aaa" />}
                                </div>
                                <span style={{ fontSize: '0.8rem', fontWeight: completed ? 600 : 400, color: completed ? 'var(--text-main)' : 'var(--text-muted)', textAlign: 'center', maxWidth: '80px' }}>{step}</span>
                            </div>
                        )
                    })}
                </div>

                {activeOrder.status === 'Out for Delivery' && (
                    <div style={{ background: '#e3f2fd', padding: '1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '48px', height: '48px', background: '#bbdefb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            🚗
                        </div>
                        <div>
                            <h4 style={{ fontWeight: 600 }}>Driver is on the way!</h4>
                            <p style={{ fontSize: '0.9rem' }}>Your food is being delivered by a Kagiso Eats partner.</p>
                        </div>
                    </div>
                )}
                {activeOrder.status === 'Delivered' && (
                    <div style={{ background: '#d4edda', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
                        <h4 style={{ fontWeight: 600, color: 'green' }}>Enjoy your meal!</h4>
                    </div>
                )}
            </div>

            <button className="btn btn-outline" onClick={() => navigate('/')}>Back to Home</button>
        </div>
    );
};

export default OrderTracking;
