import React from 'react';

export function ProductCard({ product, onBuy, onAddToCart, isFavorite, onToggleFavorite, averageRating, reviewCount }) {
    return (
        <div className="glass-panel" style={{ overflow: 'hidden', transition: 'transform 0.3s ease', cursor: 'pointer', position: 'relative' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(product.id);
                }}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(0,0,0,0.6)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                    fontSize: '1.5rem',
                    transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                {isFavorite ? '❤️' : '🤍'}
            </button>
            <img src={product.image} alt={product.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '1.5rem' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.3rem' }}>{product.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}>{product.category}</p>
                {averageRating > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--accent-color)', fontSize: '1.2rem' }}>★</span>
                        <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{averageRating}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})</span>
                    </div>
                )}
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
