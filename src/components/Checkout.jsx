import React, { useState } from 'react';

export function Checkout({ product, onCancel, onConfirm }) {
    const [address, setAddress] = useState('');
    const [paymentMode, setPaymentMode] = useState('credit_card');

    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm({ address, paymentMode, product });
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
            <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', padding: '2rem', position: 'relative' }}>
                <button
                    onClick={onCancel}
                    style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', color: 'var(--text-secondary)', fontSize: '1.5rem', cursor: 'pointer' }}
                >
                    &times;
                </button>

                <h2 style={{ marginTop: 0, marginBottom: '1.5rem', textAlign: 'center' }}>Checkout</h2>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
                    <img src={product.image} alt={product.title} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                    <div>
                        <h3 style={{ margin: '0 0 0.5rem 0' }}>{product.title}</h3>
                        <span style={{ color: 'var(--accent-color)', fontWeight: 'bold', fontSize: '1.2rem' }}>${product.price}</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                        <label>Shipping Address</label>
                        <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            rows="3"
                            placeholder="123 Art Street, Creative City..."
                            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.3)', color: 'white', fontFamily: 'inherit' }}
                        />
                    </div>

                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                        <label>Payment Mode</label>
                        <select
                            value={paymentMode}
                            onChange={(e) => setPaymentMode(e.target.value)}
                            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.3)', color: 'white' }}
                        >
                            <option value="credit_card">Credit Card</option>
                            <option value="paypal">PayPal</option>
                            <option value="crypto">Cryptocurrency (ETH/BTC)</option>
                        </select>
                    </div>

                    <button type="submit" style={{ padding: '1rem', fontSize: '1.1rem' }}>
                        Confirm Purchase
                    </button>
                </form>
            </div>
        </div>
    );
}
