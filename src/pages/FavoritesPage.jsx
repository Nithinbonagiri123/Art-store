import React from 'react';
import { ProductCard } from '../components/ProductCard';

export function FavoritesPage({
    favorites,
    products,
    onBuy,
    onAddToCart,
    onToggleFavorite,
    getAverageRating,
    reviews
}) {
    return (
        <div>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>❤️ My Favorites</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>Art pieces you've saved for later</p>
            </div>
            {favorites.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                    You haven't added any favorites yet. Click the heart icon on any art piece to save it!
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                    {products.filter(p => favorites.includes(p.id)).map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onBuy={onBuy}
                            onAddToCart={onAddToCart}
                            isFavorite={true}
                            onToggleFavorite={onToggleFavorite}
                            averageRating={getAverageRating(product.id)}
                            reviewCount={reviews.filter(r => r.productId === product.id).length}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
