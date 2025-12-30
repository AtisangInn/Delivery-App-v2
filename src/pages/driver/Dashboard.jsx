import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { MapPin, Navigation, CheckCircle, Package } from 'lucide-react';

const DriverDashboard = () => {
    const { orders, activeDriver, setActiveDriver, assignDriver, updateOrderStatus } = useStore();
    const [isOnline, setIsOnline] = useState(false);

    // Mock Driver Login
    if (!activeDriver) {
        return (
            <div className="container flex items-center justify-center fade-in" style={{ height: '80vh' }}>
                <div className="card text-center" style={{ maxWidth: '400px', padding: '3rem' }}>
                    <Navigation size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                    <h1 style={{ marginBottom: '0.5rem' }}>Driver Portal</h1>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Login to start accepting deliveries.</p>
                    <div className="flex flex-col gap-2">
                        <button className="btn btn-primary" onClick={() => { setActiveDriver({ id: 1, name: "Thabo M." }); setIsOnline(true); }}>
                            Login as Thabo M.
                        </button>
                        <button className="btn btn-outline" onClick={() => { setActiveDriver({ id: 2, name: "Sarah L." }); setIsOnline(true); }}>
                            Login as Sarah L.
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Filter orders available for pickup (Ready for Pickup) AND not assigned to anyone yet
    const availableOrders = orders.filter(o => o.status === 'Ready for Pickup' && !o.driverId);

    // Orders assigned to THIS driver
    const myActiveDeliveries = orders.filter(o => o.driverId === activeDriver.id && o.status !== 'Delivered');

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            {/* Header */}
            <header className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="section-title" style={{ marginBottom: '0.5rem' }}>Driver Dashboard</h1>
                    <p className="text-muted">Welcome, <strong>{activeDriver.name}</strong></p>
                </div>
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-2" style={{ fontWeight: 600, color: isOnline ? 'green' : 'gray' }}>
                        <span style={{ width: 10, height: 10, background: isOnline ? 'green' : 'gray', borderRadius: '50%' }}></span>
                        {isOnline ? 'Online' : 'Offline'}
                    </span>
                    <button className="btn-outline" style={{ fontSize: '0.8rem' }} onClick={() => setActiveDriver(null)}>Logout</button>
                </div>
            </header>

            {/* Active Delivery Section (If the driver has a job) */}
            {myActiveDeliveries.length > 0 && (
                <div className="mb-8">
                    <h2 className="section-title">Current Delivery</h2>
                    {myActiveDeliveries.map(order => (
                        <div key={order.id} className="card" style={{ background: '#e3f2fd', border: '1px solid #90caf9' }}>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Order #{order.id}</h3>
                                    <div className="flex items-center gap-2 mt-2">
                                        <MapPin size={18} color="var(--primary)" />
                                        <span>123 Main Street, Kagiso</span>
                                    </div>
                                </div>
                                <span className="btn-primary" style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem' }}>In Progress</span>
                            </div>

                            <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                                <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Customer: {order.customer}</p>
                                <ul style={{ listStyle: 'none', color: 'var(--text-muted)' }}>
                                    {order.items.map(i => <li key={i.id}>{i.quantity}x {i.name}</li>)}
                                </ul>
                            </div>

                            <button
                                className="btn btn-primary"
                                style={{ width: '100%', justifyContent: 'center', background: 'green' }}
                                onClick={() => updateOrderStatus(order.id, 'Delivered')}
                            >
                                <CheckCircle size={20} />
                                Complete Delivery
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Available Jobs Pool */}
            <div>
                <h2 className="section-title">Available for Pickup</h2>
                {availableOrders.length === 0 ? (
                    <div className="text-center py-8 card">
                        <Package size={48} color="var(--border)" style={{ marginBottom: '1rem' }} />
                        <p className="text-muted">No orders ready for pickup nearby.</p>
                    </div>
                ) : (
                    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                        {availableOrders.map(order => (
                            <div key={order.id} className="card">
                                <div className="flex justify-between items-start mb-4">
                                    <span style={{ fontWeight: 700 }}>Order #{order.id}</span>
                                    <span style={{ color: 'green', fontWeight: 600 }}>${(order.total * 0.15).toFixed(2)} Earn</span> {/* Est earning */}
                                </div>
                                <div className="mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div style={{ width: 8, height: 8, background: 'var(--primary)', borderRadius: '50%' }}></div>
                                        <span>Restaurant (Pickup)</span>
                                    </div>
                                    <div style={{ borderLeft: '2px dashed #ccc', height: '20px', marginLeft: '3px' }}></div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div style={{ width: 8, height: 8, background: 'green', borderRadius: '50%' }}></div>
                                        <span>Customer (Dropoff)</span>
                                    </div>
                                </div>
                                <button
                                    className="btn btn-primary"
                                    style={{ width: '100%' }}
                                    onClick={() => assignDriver(order.id, activeDriver.id)}
                                >
                                    Accept Delivery
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DriverDashboard;
