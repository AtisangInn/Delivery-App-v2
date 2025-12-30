import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

const PartnerDashboard = () => {
    const { orders, updateOrderStatus } = useStore();

    // Filter for 'Burger King' (ID 1) as an example restaurant logged in
    const restaurantOrders = orders.filter(o => o.restaurantId === 1);

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="section-title" style={{ marginBottom: '0.5rem' }}>Partner Portal</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Welcome back, <strong>Burger King</strong></p>
                </div>
                <div className="card text-center" style={{ padding: '0.5rem 1rem' }}>
                    <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Status</span>
                    <span style={{ fontWeight: 600, color: 'green' }}>● Open for Orders</span>
                </div>
            </header>

            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div className="card">
                    <h3>Active Orders</h3>
                    <span style={{ fontSize: '2rem', fontWeight: 700 }}>{restaurantOrders.filter(o => o.status !== 'Delivered').length}</span>
                </div>
                <div className="card">
                    <h3>Total Sales (Today)</h3>
                    <span style={{ fontSize: '2rem', fontWeight: 700 }}>${restaurantOrders.reduce((acc, o) => acc + o.total, 0).toFixed(2)}</span>
                </div>
                <div className="card">
                    <h3>Avg Prep Time</h3>
                    <span style={{ fontSize: '2rem', fontWeight: 700 }}>15m</span>
                </div>
            </div>

            <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Incoming Orders</h2>
            <div className="orders-list">
                {restaurantOrders.length === 0 ? (
                    <p className="text-muted">No active orders yet.</p>
                ) : (
                    restaurantOrders.map(order => (
                        <div key={order.id} className="card" style={{ marginBottom: '1rem', borderLeft: `4px solid ${order.status === 'Pending' ? 'orange' : 'green'}` }}>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 style={{ fontWeight: 700 }}>Order #{order.id}</h3>
                                        <span style={{
                                            background: order.status === 'Pending' ? '#fff3cd' : '#d4edda',
                                            color: order.status === 'Pending' ? '#856404' : '#155724',
                                            padding: '0.2rem 0.5rem',
                                            borderRadius: '4px',
                                            fontSize: '0.8rem',
                                            fontWeight: 600
                                        }}>{order.status}</span>
                                    </div>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{new Date(order.timestamp).toLocaleTimeString()}</p>
                                </div>
                                <span style={{ fontWeight: 700 }}>${order.total.toFixed(2)}</span>
                            </div>

                            <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                                {order.items.map(item => (
                                    <div key={item.id} className="flex justify-between" style={{ marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                                        <span>{item.quantity}x {item.name}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-2 justify-end">
                                {order.status === 'Pending' && (
                                    <>
                                        <button className="btn-outline" style={{ borderColor: 'red', color: 'red' }}>Reject</button>
                                        <button
                                            className="btn-primary"
                                            onClick={() => updateOrderStatus(order.id, 'Preparing')}
                                        >
                                            Accept Order
                                        </button>
                                    </>
                                )}
                                {order.status === 'Preparing' && (
                                    <button
                                        className="btn-primary"
                                        style={{ backgroundColor: '#2d3436' }}
                                        onClick={() => updateOrderStatus(order.id, 'Ready for Pickup')}
                                    >
                                        Mark Ready
                                    </button>
                                )}
                                {order.status === 'Ready for Pickup' && (
                                    <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>Waiting for driver...</span>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PartnerDashboard;
