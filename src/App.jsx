import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { Login } from './components/Login';
import { Checkout } from './components/Checkout';
import { Cart } from './components/Cart';
import { initialProducts } from './data';

import { Footer } from './components/Footer';


function App() {
    const [view, setView] = useState('gallery');
    const [products, setProducts] = useState(initialProducts);
    const [user, setUser] = useState(null); // Auth state
    const [checkoutProduct, setCheckoutProduct] = useState(null); // Checkout state
    const [cart, setCart] = useState([]); // Shopping cart
    const [showCart, setShowCart] = useState(false); // Cart visibility
    const [orders, setOrders] = useState([]); // Order history
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('artstore-favorites');
        return saved ? JSON.parse(saved) : [];
    }); // Favorites with localStorage
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('artstore-theme');
        return saved || 'dark';
    }); // Theme with localStorage

    // Apply theme to document
    React.useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('artstore-theme', theme);
    }, [theme]);

    // Admin State
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        category: '',
        description: '',
        image: '',
        city: '',
        lat: '',
        lng: ''
    });
    const [isEditing, setIsEditing] = useState(null);

    // User Management State
    const [users, setUsers] = useState([
        { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
        { id: 2, username: 'user', password: 'user123', role: 'user' }
    ]);
    const [newUser, setNewUser] = useState('');
    const [newUserRole, setNewUserRole] = useState('user');
    const [editingUser, setEditingUser] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGetLocation = (e) => {
        e.preventDefault();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setFormData(prev => ({
                    ...prev,
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }));
                alert("Location fetched! Don't forget to add the City name.");
            }, () => {
                alert("Unable to retrieve your location.");
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const productData = {
            ...formData,
            price: Number(formData.price),
            lat: formData.lat ? Number(formData.lat) : undefined,
            lng: formData.lng ? Number(formData.lng) : undefined,
        };

        if (isEditing) {
            setProducts(products.map(p => p.id === isEditing ? { ...productData, id: isEditing } : p));
            setIsEditing(null);
        } else {
            const newProduct = {
                ...productData,
                id: Date.now(),
                seller: formData.seller || user.username // Use selected seller or current user
            };
            setProducts([...products, newProduct]);
        }
        setFormData({ title: '', price: '', category: '', description: '', image: '', city: '', lat: '', lng: '', seller: '' });
        alert(isEditing ? 'Product Updated!' : 'Product Added!');
    };

    const handleEdit = (product) => {
        setFormData({
            ...product,
            seller: product.seller || '',
            city: product.city || '',
            lat: product.lat || '',
            lng: product.lng || ''
        });
        setIsEditing(product.id);
        setView('admin'); // Re-use admin view for selling
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this art piece?')) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    const handleLogin = (credentials) => {
        const foundUser = users.find(u => u.username === credentials.username && u.password === credentials.password);
        if (foundUser) {
            setUser(foundUser);
            setView('gallery');
        } else {
            alert('Invalid username or password');
        }
    };

    const handleRegister = (credentials) => {
        if (users.find(u => u.username === credentials.username)) {
            alert('Username already exists');
            return;
        }
        const newUser = { ...credentials, id: Date.now(), role: 'user' };
        setUsers([...users, newUser]);
        setUser(newUser);
        setView('gallery');
        alert('Registration successful! Welcome to Art Store.');
    };

    const handleAddUser = (e) => {
        e.preventDefault();
        if (newUser.trim()) {
            if (editingUser) {
                setUsers(users.map(u => u.id === editingUser ? { ...u, username: newUser, role: newUserRole } : u));
                setEditingUser(null);
                alert('User updated!');
            } else {
                setUsers([...users, { id: Date.now(), username: newUser, password: 'password123', role: newUserRole }]);
                alert(`User added as ${newUserRole}! Default password is "password123"`);
            }
            setNewUser('');
            setNewUserRole('user');
        }
    };

    const handleEditUser = (user) => {
        setNewUser(user.username);
        setNewUserRole(user.role);
        setEditingUser(user.id);
    };

    const handleDeleteUser = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter(u => u.id !== id));
        }
    };

    const handleBuy = (product) => {
        setCheckoutProduct(product);
    };

    const handleConfirmPurchase = (details) => {
        console.log('Purchase Details:', details);
        const order = {
            id: Date.now(),
            product: details.product,
            address: details.address,
            paymentMode: details.paymentMode,
            date: new Date().toLocaleDateString()
        };
        setOrders([...orders, order]);
        alert(`Thank you for your purchase!\n\nItem: ${details.product.title}\nShipped to: ${details.address}\nPayment: ${details.paymentMode}`);
        setCheckoutProduct(null);
    };

    const handleAddToCart = (product) => {
        if (cart.find(item => item.id === product.id)) {
            alert('This item is already in your cart!');
            return;
        }
        setCart([...cart, product]);
        alert(`${product.title} added to cart!`);
    };

    const handleRemoveFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const handleCartCheckout = () => {
        if (cart.length === 0) return;

        const order = {
            id: Date.now(),
            items: [...cart],
            total: cart.reduce((sum, item) => sum + item.price, 0),
            date: new Date().toLocaleDateString()
        };
        setOrders([...orders, order]);
        alert(`Order placed successfully!\n\nTotal: $${order.total}\nItems: ${cart.length}`);
        setCart([]);
        setShowCart(false);
    };

    const handleToggleFavorite = (productId) => {
        const newFavorites = favorites.includes(productId)
            ? favorites.filter(id => id !== productId)
            : [...favorites, productId];
        setFavorites(newFavorites);
        localStorage.setItem('artstore-favorites', JSON.stringify(newFavorites));
    };

    // Haversine formula to calculate distance
    const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    }

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180)
    }

    const handleNearMe = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;

                const sortedProducts = [...products].map(product => {
                    if (product.lat && product.lng) {
                        return {
                            ...product,
                            distance: getDistanceFromLatLonInKm(userLat, userLng, product.lat, product.lng)
                        };
                    }
                    return { ...product, distance: Infinity };
                }).sort((a, b) => a.distance - b.distance);

                setProducts(sortedProducts);
                alert("Showing art pieces closest to you!");
            }, () => {
                alert("Unable to retrieve your location.");
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const handleSelfDelete = () => {
        if (user.role === 'admin') {
            alert('Admins cannot delete their own account.');
            return;
        }
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            setUsers(users.filter(u => u.id !== user.id));
            setUser(null);
            setView('gallery');
            alert('We were really sry to miss a customer');
        }
    };

    // Search & Filter State (must be declared before any early returns)
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [priceRange, setPriceRange] = useState([0, 500]);
    const [sortBy, setSortBy] = useState('newest');

    // Derived state for categories
    const categories = ['All', ...new Set(products.map(p => p.category))];

    // Filtered and sorted products
    let filteredProducts = products.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
        return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    filteredProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-low': return a.price - b.price;
            case 'price-high': return b.price - a.price;
            case 'newest': return b.id - a.id;
            case 'popular': return (b.views || 0) - (a.views || 0);
            default: return 0;
        }
    });

    if (!user) {
        return <Login onLogin={handleLogin} onRegister={handleRegister} />;
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar
                currentView={view}
                setView={setView}
                user={user}
                onLogout={() => { setUser(null); setView('gallery'); }}
                onDeleteAccount={handleSelfDelete}
                cartCount={cart.length}
                onCartClick={() => setShowCart(true)}
                theme={theme}
                onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            />
            <main className="container" style={{ flex: 1 }}>
                {view === 'gallery' ? (
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        {/* Filters Sidebar */}
                        <div className="glass-panel" style={{ width: '280px', padding: '1.5rem', height: 'fit-content', position: 'sticky', top: '90px' }}>
                            <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.3rem' }}>🔍 Filters</h3>

                            {/* Search */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Search</label>
                                <input
                                    type="text"
                                    placeholder="Search art..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                                />
                            </div>

                            {/* Category */}
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Category</label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
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
                                    style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
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
                                style={{ width: '100%', padding: '0.8rem', marginTop: '1rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.95rem' }}
                            >
                                Clear All Filters
                            </button>
                        </div>

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
                                            onBuy={handleBuy}
                                            onAddToCart={handleAddToCart}
                                            isFavorite={favorites.includes(product.id)}
                                            onToggleFavorite={handleToggleFavorite}
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
                ) : view === 'sell' || view === 'admin' ? (
                    <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h1 style={{ margin: 0 }}>{view === 'admin' ? 'Admin Dashboard' : 'Sell Your Art'}</h1>
                        </div>

                        {view === 'admin' && (
                            <div style={{ marginBottom: '3rem', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                                <h2 style={{ marginTop: 0 }}>User Management</h2>
                                <form onSubmit={handleAddUser} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                    <input
                                        type="text"
                                        value={newUser}
                                        onChange={(e) => setNewUser(e.target.value)}
                                        placeholder="New username..."
                                        style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.3)', color: 'white' }}
                                    />
                                    <select
                                        value={newUserRole}
                                        onChange={(e) => setNewUserRole(e.target.value)}
                                        style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.3)', color: 'white' }}
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    <button type="submit">{editingUser ? 'Update User' : 'Add User'}</button>
                                    {editingUser && (
                                        <button type="button" onClick={() => { setEditingUser(null); setNewUser(''); setNewUserRole('user'); }} style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'white' }}>
                                            Cancel
                                        </button>
                                    )}
                                </form>
                                <div style={{ display: 'grid', gap: '0.5rem' }}>
                                    {users.map(u => (
                                        <div key={u.id} style={{ padding: '0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <span style={{ fontWeight: 'bold', marginRight: '0.5rem' }}>{u.username}</span>
                                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>({u.role})</span>
                                            </div>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button onClick={() => handleEditUser(u)} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: 'var(--bg-secondary)', color: 'white' }}>Edit</button>
                                                <button onClick={() => handleDeleteUser(u.id)} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: '#ff4444', color: 'white' }}>Delete</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <h2 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                            {isEditing ? 'Edit Product' : 'Add New Art Piece'}
                        </h2>
                        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem', marginBottom: '3rem' }}>
                            {view === 'admin' && (
                                <div style={{ display: 'grid', gap: '0.5rem' }}>
                                    <label>Assign to User (Seller)</label>
                                    <select
                                        name="seller"
                                        value={formData.seller || ''}
                                        onChange={handleInputChange}
                                        style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.3)', color: 'white' }}
                                    >
                                        <option value="">-- Assign to Self ({user.username}) --</option>
                                        {users.map(u => (
                                            <option key={u.id} value={u.username}>{u.username} ({u.role})</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                <label>Title</label>
                                <input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.3)', color: 'white' }}
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div style={{ display: 'grid', gap: '0.5rem' }}>
                                    <label>Price ($)</label>
                                    <input
                                        name="price"
                                        type="number"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        required
                                        style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.3)', color: 'white' }}
                                    />
                                </div>
                                <div style={{ display: 'grid', gap: '0.5rem' }}>
                                    <label>Category</label>
                                    <input
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        required
                                        style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.3)', color: 'white' }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gap: '0.5rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <label style={{ fontWeight: 'bold' }}>Location</label>
                                    <button
                                        type="button"
                                        onClick={handleGetLocation}
                                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', background: 'transparent', border: '1px solid var(--accent-color)', color: 'var(--accent-color)' }}
                                    >
                                        📍 Use My Location
                                    </button>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
                                    <input
                                        name="city"
                                        value={formData.city || ''}
                                        onChange={handleInputChange}
                                        placeholder="City Name"
                                        required
                                        style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.3)', color: 'white' }}
                                    />
                                    <input
                                        name="lat"
                                        type="number"
                                        value={formData.lat || ''}
                                        onChange={handleInputChange}
                                        placeholder="Lat"
                                        step="any"
                                        style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.3)', color: 'white' }}
                                    />
                                    <input
                                        name="lng"
                                        type="number"
                                        value={formData.lng || ''}
                                        onChange={handleInputChange}
                                        placeholder="Lng"
                                        step="any"
                                        style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.3)', color: 'white' }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                <label>Image URL</label>
                                <input
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="https://..."
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.3)', color: 'white' }}
                                />
                            </div>
                            <div style={{ display: 'grid', gap: '0.5rem' }}>
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                    rows="4"
                                    style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.3)', color: 'white', fontFamily: 'inherit' }}
                                />
                            </div>
                            <button type="submit" style={{ padding: '1rem' }}>
                                {isEditing ? 'Update Product' : 'List Item for Sale'}
                            </button>
                        </form>

                        {(view === 'admin' || (view === 'sell' && products.some(p => p.seller === user.username))) && (
                            <>
                                <h2 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                                    {view === 'admin' ? 'Global Inventory' : 'Your Listings'}
                                </h2>
                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    {products.filter(p => view === 'admin' || p.seller === user.username).map(product => (
                                        <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <img src={product.image} alt={product.title} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                                                <div>
                                                    <h4 style={{ margin: 0 }}>{product.title}</h4>
                                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>${product.price}</span>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button onClick={() => handleEdit(product)} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', background: 'var(--bg-secondary)', color: 'white' }}>Edit</button>
                                                <button onClick={() => handleDelete(product.id)} style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', background: '#ff4444', color: 'white' }}>Delete</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                ) : view === 'orders' ? (
                    <div className="glass-panel" style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
                        <h1 style={{ marginBottom: '2rem' }}>My Orders</h1>
                        {orders.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                                You haven't placed any orders yet.
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gap: '2rem' }}>
                                {orders.map(order => (
                                    <div key={order.id} className="glass-panel" style={{ padding: '1.5rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                                            <div>
                                                <h3 style={{ margin: '0 0 0.5rem 0' }}>Order #{order.id}</h3>
                                                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{order.date}</p>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>
                                                    ${order.total || order.product.price}
                                                </p>
                                            </div>
                                        </div>
                                        {order.items ? (
                                            <div style={{ display: 'grid', gap: '1rem' }}>
                                                {order.items.map(item => (
                                                    <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                                        <img src={item.image} alt={item.title} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                                                        <div>
                                                            <h4 style={{ margin: '0 0 0.25rem 0' }}>{item.title}</h4>
                                                            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>${item.price}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                                <img src={order.product.image} alt={order.product.title} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                                                <div>
                                                    <h4 style={{ margin: '0 0 0.25rem 0' }}>{order.product.title}</h4>
                                                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>${order.product.price}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : view === 'favorites' ? (
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
                                        onBuy={handleBuy}
                                        onAddToCart={handleAddToCart}
                                        isFavorite={true}
                                        onToggleFavorite={handleToggleFavorite}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ) : null}

            </main>
            {view !== 'admin' && <Footer />}
            {checkoutProduct && (
                <Checkout
                    product={checkoutProduct}
                    onCancel={() => setCheckoutProduct(null)}
                    onConfirm={handleConfirmPurchase}
                />
            )}
            {showCart && (
                <Cart
                    cart={cart}
                    onRemove={handleRemoveFromCart}
                    onCheckout={handleCartCheckout}
                    onClose={() => setShowCart(false)}
                />
            )}
        </div>
    );
}

export default App;
