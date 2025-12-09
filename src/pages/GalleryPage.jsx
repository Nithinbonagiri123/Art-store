import React from 'react';
import { ProductCard } from '../components/ProductCard';

export function GalleryPage({
    filteredProducts,
    products, // needed for favorites filter in App, but here we just need filtered
    favorites,
    reviews,
    onBuy,
    onAddToCart,
    onToggleFavorite,
    getAverageRating,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    handleNearMe,
    categories,
    showFilters,
    setShowFilters
}) {
    return (
        <div>
            {/* Filter Toggle Button */}
            <div style={{ marginBottom: '1rem' }}>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    style={{ padding: '0.8rem 1.5rem', borderRadius: '8px', background: 'var(--accent-color)', color: 'black', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    {showFilters ? '✕ Hide Filters' : '🔍 Show Filters'}
                </button>
            </div>

            <div style={{ position: 'relative' }}>
                {/* Filters Sidebar */}
                {showFilters && (
                    <div className="glass-panel" style={{
                        width: '280px',
                        padding: '1.5rem',
                        position: 'absolute',
                        top: '0',
                        left: '0',
                        zIndex: 20,
                        boxShadow: '0 8px 32px var(--shadow-color)'
                    }}>
                        <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.3rem' }}>🔍 Filters</h3>

                        {/* Search */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Search</label>
                            <input
                                type="text"
                                placeholder="Search art..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-primary)' }}
                            />
                        </div>

                        {/* Category */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Category</label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-primary)' }}
                            >
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>

                        {/* Price Range */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                Price Range: ${priceRange[0]} - ${priceRange[1]}
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="500"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                style={{ width: '100%', accentColor: 'var(--accent-color)' }}
                            />
                        </div>

                        {/* Sort */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Sort By</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-primary)' }}
                            >
                                <option value="newest">Newest First</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="popular">Most Popular</option>
                            </select>
                        </div>

                        {/* Location Filter */}
                        <button
                            onClick={handleNearMe}
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', background: 'transparent', border: '1px solid var(--accent-color)', color: 'var(--accent-color)', fontSize: '0.95rem' }}
                        >
                            📍 Find Near Me
                        </button>

                        {/* Clear Filters */}
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCategory('All');
                                setPriceRange([0, 500]);
                                setSortBy('newest');
                            }}
                            style={{ width: '100%', padding: '0.8rem', marginTop: '1rem', borderRadius: '8px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.95rem' }}
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}        </div>

            {/* Products Grid */}
            <div style={{ flex: 1 }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Curated Art Collection</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
                        Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'piece' : 'pieces'}
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                    {filteredProducts.map(product => (
                        <div key={product.id} style={{ position: 'relative' }}>
                            <ProductCard
                                product={product}
                                onBuy={onBuy}
                                onAddToCart={onAddToCart}
                                isFavorite={favorites.includes(product.id)}
                                onToggleFavorite={onToggleFavorite}
                                averageRating={getAverageRating(product.id)}
                                reviewCount={reviews.filter(r => r.productId === product.id).length}
                            />
                            {product.distance !== undefined && product.distance !== Infinity && (
                                <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', zIndex: 10 }}>
                                    {product.distance.toFixed(0)} km away ({product.city})
                                </div>
                            )}
                        </div>
                    ))}
                    {filteredProducts.length === 0 && (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                            No art pieces found matching your criteria.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
