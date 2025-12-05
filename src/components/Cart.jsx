import React from 'react';

export function Cart({ cart, onRemove, onCheckout, onClose }) {
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 2000
        }}>
            <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', padding: '2rem', maxHeight: '80vh', overflow: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ margin: 0 }}>Shopping Cart ({cart.length})</h2>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
                </div>

                {cart.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                        Your cart is empty
                    </div>
                ) : (
                    <>
                        <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                            {cart.map(item => (
                                <div key={item.id} style={{ display: 'flex', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                                    <img src={item.image} alt={item.title} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ margin: '0 0 0.5rem 0' }}>{item.title}</h4>
                                        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.category}</p>
                                        <p style={{ margin: '0.5rem 0 0 0', fontWeight: 'bold', color: 'var(--accent-color)' }}>${item.price}</p>
                                    </div>
                                    <button
                                        onClick={() => onRemove(item.id)}
                                        style={{ padding: '0.5rem 1rem', background: '#ff4444', color: 'white', height: 'fit-content' }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                <span>Total:</span>
                                <span style={{ color: 'var(--accent-color)' }}>${total}</span>
                            </div>
                            <button
                                onClick={onCheckout}
                                style={{ width: '100%', padding: '1rem', background: 'var(--accent-color)', color: 'black', fontWeight: 'bold' }}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
