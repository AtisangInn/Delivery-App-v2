import React, { createContext, useState, useContext } from 'react';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]); // Shared orders between customer and restaurant
    const [user, setUser] = useState({ name: 'Guest', role: 'customer' }); // customer, restaurant, driver
    const [activeDriver, setActiveDriver] = useState(null); // Simulate a logged-in driver

    // Mock Drivers
    const drivers = [
        { id: 1, name: "Thabo M.", vehicle: "Motorbike", status: "Available" },
        { id: 2, name: "Sarah L.", vehicle: "Car", status: "Busy" }
    ];

    // Mock Restaurants Data
    const restaurants = [
        {
            id: 1,
            name: "Burger King",
            rating: 4.5,
            time: "25-35 min",
            deliveryFee: 1.99,
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
            tags: ["Burgers", "American"],
            menu: [
                { id: 101, name: "Whopper Meal", price: 9.99, description: "Flame-grilled beef patty, sesame bun, cheese, pickles." },
                { id: 102, name: "Chicken Royale", price: 7.99, description: "Crispy chicken breast with lettuce and mayo." },
                { id: 103, name: "Fries (Medium)", price: 2.99, description: "Classic salted fries." }
            ]
        },
        {
            id: 2,
            name: "Sushi Master",
            rating: 4.8,
            time: "40-50 min",
            deliveryFee: 3.99,
            image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
            tags: ["Sushi", "Japanese"],
            menu: [
                { id: 201, name: "Salmon Roll", price: 8.50, description: "Fresh salmon, avocado, rice." },
                { id: 202, name: "Tuna Sashimi", price: 12.00, description: "5 pieces of premium tuna." }
            ]
        },
        {
            id: 3,
            name: "Pizza Hut",
            rating: 4.3,
            time: "30-45 min",
            deliveryFee: 2.49,
            image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3",
            tags: ["Pizza", "Italian"],
            menu: [
                { id: 301, name: "Pepperoni Passion", price: 14.99, description: "Double pepperoni and extra cheese." },
                { id: 302, name: "Veggie Supreme", price: 13.99, description: "Mushrooms, onions, peppers, and sweetcorn." }
            ]
        }
    ];

    const addToCart = (item, restaurantId) => {
        // Basic check to clear cart if ordering from different restaurant
        if (cart.length > 0 && cart[0].restaurantId !== restaurantId) {
            if (!window.confirm("Start a new basket? You have items from another restaurant.")) return;
            setCart([{ ...item, restaurantId, quantity: 1 }]);
            return;
        }

        setCart(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { ...item, restaurantId, quantity: 1 }];
        });
    };

    const removeFromCart = (itemId) => {
        setCart(prev => prev.filter(i => i.id !== itemId));
    };

    const placeOrder = () => {
        const newOrder = {
            id: Date.now(),
            items: cart,
            total: cart.reduce((acc, item) => acc + (item.price * item.quantity), 0) + (cart.length > 0 ? 1.99 : 0),
            status: 'Pending', // Pending -> Preparing -> Ready -> Out for Delivery -> Delivered
            restaurantId: cart[0].restaurantId,
            customer: user.name,
            timestamp: new Date().toISOString(),
            driverId: null
        };
        setOrders(prev => [newOrder, ...prev]);
        setCart([]);
        return newOrder.id;
    };

    const updateOrderStatus = (orderId, status) => {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    };

    const assignDriver = (orderId, driverId) => {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, driverId, status: 'Out for Delivery' } : o));
    };

    const value = {
        restaurants,
        cart,
        addToCart,
        removeFromCart,
        orders,
        placeOrder,
        updateOrderStatus,
        assignDriver,
        user,
        setUser,
        activeDriver,
        setActiveDriver
    };

    return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};
