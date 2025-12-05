import React from 'react';

export function ProductCard({ product, onBuy }) {
    return (
        <div className="glass-panel product-card" style={{ overflow: 'hidden', transition: 'transform 0.3s ease' }}>
            <div style={{ height: '200px', overflow: 'hidden' }}>
                <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                />
            </div>
            <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{product.title}</h3>
                    <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>${product.price}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0 0 1rem 0' }}>{product.category}</p>
                <p style={{ color: '#ccc', fontSize: '0.95rem', lineHeight: '1.4' }}>{product.description}</p>
                <button onClick={() => onBuy(product)} style={{ width: '100%', marginTop: '1rem' }}>Buy Now</button>
            </div>
        </div>
    );
}
