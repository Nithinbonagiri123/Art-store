import React from 'react';

export function ProductCard({ product, onBuy, onAddToCart }) {
    return (
        <div className="glass-panel" style={{ overflow: 'hidden', transition: 'transform 0.3s ease', cursor: 'pointer' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
            <img src={product.image} alt={product.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '1.5rem' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.3rem' }}>{product.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0 0 1rem 0' }}>{product.category}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>${product.price}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                    <button
                        onClick={() => onAddToCart(product)}
                        style={{ flex: 1, padding: '0.8rem', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--accent-color)', color: 'var(--accent-color)' }}
                    >
                        Add to Cart
                    </button>
                    <button
                        onClick={() => onBuy(product)}
                        style={{ flex: 1, padding: '0.8rem' }}
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    );
}
