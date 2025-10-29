import React, { createContext, useState, useEffect, useMemo } from 'react';

// 1. Create the context
export const CartContext = createContext();

// 2. Create the provider component
export const CartProvider = ({ children }) => {
    // Load initial cart state from localStorage
    const [cart, setCart] = useState(() => {
        try {
            const localData = localStorage.getItem('cart');
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            console.error("Failed to parse cart from localStorage", error);
            return [];
        }
    });

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // 3. Calculate totals using useMemo for performance
    // This block runs only when the `cart` state changes
    const { subtotal, tax, shipping, total } = useMemo(() => {
        if (cart.length === 0) {
            return { subtotal: 0, tax: 0, shipping: 0, total: 0 };
        }

        const calculatedSubtotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
        const calculatedShipping = calculatedSubtotal > 500 ? 0 : 50; // Free shipping over 500
        const calculatedTax = calculatedSubtotal * 0.05; // 5% tax
        const calculatedTotal = calculatedSubtotal + calculatedShipping + calculatedTax;

        return {
            subtotal: calculatedSubtotal,
            tax: calculatedTax,
            shipping: calculatedShipping,
            total: calculatedTotal
        };
    }, [cart]);

    // 4. Define all the functions to modify the cart
    // (This is your original, working logic)

    const addToCart = (product) => {
        setCart((prev) => {
            const exist = prev.find((item) => item.id === product.id);
            if (exist) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const incrementQty = (id) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
            )
        );
    };

    const decrementQty = (id) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 1) } : item
            )
        );
    };

    const updateQty = (id, qty) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: qty > 0 ? qty : 1 } : item
            )
        );
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    // 5. Create the value object to pass to consumers
    const contextValue = {
        cart,
        addToCart,
        incrementQty,
        decrementQty,
        updateQty,
        removeFromCart,
        clearCart,
        // --- Expose the calculated values ---
        subtotal,
        tax,
        shipping,
        total,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};