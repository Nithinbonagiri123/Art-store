import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import { Login } from './components/Login';
import { Checkout } from './components/Checkout';
import { Cart } from './components/Cart';
import { GalleryPage } from './pages/GalleryPage';
import { AdminPage } from './pages/AdminPage';
import { OrdersPage } from './pages/OrdersPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { initialProducts } from './data';
import { Footer } from './components/Footer';

function App() {
    const navigate = useNavigate();
    const location = useLocation();

    const [products, setProducts] = useState(initialProducts);
    const [user, setUser] = useState(null); // Auth state
    const [checkoutProduct, setCheckoutProduct] = useState(null); // Checkout state
    const [cart, setCart] = useState([]); // Shopping cart
    const [showCart, setShowCart] = useState(false); // Cart visibility
    const [orders, setOrders] = useState([]); // Order history
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('artstore-favorites');
        return saved ? JSON.parse(saved) : [];
    });
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('artstore-theme');
        return saved || 'dark';
    });
    const [showFilters, setShowFilters] = useState(true);
    const [reviews, setReviews] = useState(() => {
        const saved = localStorage.getItem('artstore-reviews');
        return saved ? JSON.parse(saved) : [];
    });

    // Apply theme
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('artstore-theme', theme);
    }, [theme]);

    // Admin State
    const [formData, setFormData] = useState({
        title: '', price: '', category: '', description: '', image: '', city: '', lat: '', lng: ''
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

    // Search & Filter State
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [priceRange, setPriceRange] = useState([0, 500]);
    const [sortBy, setSortBy] = useState('newest');

    // Handlers
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
                toast.success("Location fetched! Don't forget to add the City name.");
            }, () => {
                toast.error("Unable to retrieve your location.");
            });
        } else {
            toast.error("Geolocation is not supported by this browser.");
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
                seller: formData.seller || user.username
            };
            setProducts([...products, newProduct]);
        }
        setFormData({ title: '', price: '', category: '', description: '', image: '', city: '', lat: '', lng: '', seller: '' });
        toast.success(isEditing ? 'Product Updated!' : 'Product Added!');
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
        navigate('/admin'); // Re-use admin view for selling, wait, logic was check view. 
        // If user is admin, goto admin? Or sell?
        // Original logic: view='admin'
        // If I am user, I can't go to admin.
        // If I am user and clicking edit on "My Listings", I probably go to /sell?
        if (user.role === 'admin') navigate('/admin');
        else navigate('/sell');
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this art piece?')) {
            setProducts(products.filter(p => p.id !== id));
            toast.success('Art piece deleted.');
        }
    };

    const handleLogin = (credentials) => {
        const foundUser = users.find(u => u.username === credentials.username && u.password === credentials.password);
        if (foundUser) {
            setUser(foundUser);
            navigate('/gallery');
            toast.success(`Welcome back, ${foundUser.username}!`);
        } else {
            toast.error('Invalid username or password');
        }
    };

    const handleRegister = (credentials) => {
        if (users.find(u => u.username === credentials.username)) {
            toast.error('Username already exists');
            return;
        }
        const newUser = { ...credentials, id: Date.now(), role: 'user' };
        setUsers([...users, newUser]);
        setUser(newUser);
        navigate('/gallery');
        toast.success('Registration successful! Welcome to Art Store.');
    };

    const handleAddUser = (e) => {
        e.preventDefault();
        if (newUser.trim()) {
            if (editingUser) {
                setUsers(users.map(u => u.id === editingUser ? { ...u, username: newUser, role: newUserRole } : u));
                setEditingUser(null);
                toast.success('User updated!');
            } else {
                setUsers([...users, { id: Date.now(), username: newUser, password: 'password123', role: newUserRole }]);
                toast.success(`User added as ${newUserRole}! Default password is "password123"`);
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
            toast.success('User deleted.');
        }
    };

    const handleBuy = (product) => {
        setCheckoutProduct(product);
    };

    const handleConfirmPurchase = (details) => {
        const order = {
            id: Date.now(),
            product: details.product,
            address: details.address,
            paymentMode: details.paymentMode,
            date: new Date().toLocaleDateString()
        };
        setOrders([...orders, order]);
        toast.success(`Thank you for your purchase! Item: ${details.product.title}`);
        setCheckoutProduct(null);
    };

    const handleAddToCart = (product) => {
        if (cart.find(item => item.id === product.id)) {
            toast('This item is already in your cart!', { icon: '🛒' });
            return;
        }
        setCart([...cart, product]);
        toast.success(`${product.title} added to cart!`);
    };

    const handleRemoveFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
        toast.success('Item removed from cart');
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
        toast.success(`Order placed successfully! Total: $${order.total}`);
        setCart([]);
        setShowCart(false);
    };

    const handleToggleFavorite = (productId) => {
        const newFavorites = favorites.includes(productId)
            ? favorites.filter(id => id !== productId)
            : [...favorites, productId];
        setFavorites(newFavorites);
        localStorage.setItem('artstore-favorites', JSON.stringify(newFavorites));

        if (!favorites.includes(productId)) {
            toast.success('Added to favorites', { icon: '❤️' });
        }
    };

    const getAverageRating = (productId) => {
        const productReviews = reviews.filter(r => r.productId === productId);
        if (productReviews.length === 0) return 0;
        const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
        return (sum / productReviews.length).toFixed(1);
    };

    // Haversine
    const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
        var R = 6371;
        var dLat = deg2rad(lat2 - lat1);
        var dLon = deg2rad(lon2 - lon1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
    const deg2rad = (deg) => deg * (Math.PI / 180);

    const handleNearMe = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                const sortedProducts = [...products].map(product => {
                    if (product.lat && product.lng) {
                        return { ...product, distance: getDistanceFromLatLonInKm(userLat, userLng, product.lat, product.lng) };
                    }
                    return { ...product, distance: Infinity };
                }).sort((a, b) => a.distance - b.distance);
                setProducts(sortedProducts);
                toast.success("Showing art pieces closest to you!");
            }, () => toast.error("Unable to retrieve your location."));
        } else {
            toast.error("Geolocation is not supported by this browser.");
        }
    };

    const handleSelfDelete = () => {
        if (user.role === 'admin') {
            toast.error('Admins cannot delete their own account.');
            return;
        }
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            setUsers(users.filter(u => u.id !== user.id));
            setUser(null);
            navigate('/');
            toast.success('We were really sry to miss a customer');
        }
    };

    const categories = ['All', ...new Set(products.map(p => p.category))];
    let filteredProducts = products.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
        return matchesSearch && matchesCategory && matchesPrice;
    });

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
        return (
            <>
                <Toaster position="top-right"
                    toastOptions={{
                        style: { background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }
                    }}
                />
                <Login onLogin={handleLogin} onRegister={handleRegister} />
            </>
        );
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Toaster position="top-right"
                toastOptions={{
                    style: { background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)' }
                }}
            />
            <Navbar
                currentView={location.pathname.substring(1) || 'gallery'}
                setView={(view) => navigate(`/${view}`)}
                user={user}
                onLogout={() => { setUser(null); navigate('/'); }}
                onDeleteAccount={handleSelfDelete}
                cartCount={cart.length}
                onCartClick={() => setShowCart(true)}
                theme={theme}
                onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            />
            <main className="container" style={{ flex: 1 }}>
                <Routes>
                    <Route path="/" element={<Navigate to="/gallery" replace />} />
                    <Route path="/gallery" element={
                        <GalleryPage
                            filteredProducts={filteredProducts}
                            products={products}
                            favorites={favorites}
                            reviews={reviews}
                            onBuy={handleBuy}
                            onAddToCart={handleAddToCart}
                            onToggleFavorite={handleToggleFavorite}
                            getAverageRating={getAverageRating}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            handleNearMe={handleNearMe}
                            categories={categories}
                            showFilters={showFilters}
                            setShowFilters={setShowFilters}
                        />
                    } />
                    <Route path="/admin" element={
                        <AdminPage
                            viewMode="admin"
                            user={user}
                            users={users}
                            products={products}
                            formData={formData}
                            handleInputChange={handleInputChange}
                            handleSubmit={handleSubmit}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                            handleGetLocation={handleGetLocation}
                            newUser={newUser}
                            setNewUser={setNewUser}
                            newUserRole={newUserRole}
                            setNewUserRole={setNewUserRole}
                            editingUser={editingUser}
                            setEditingUser={setEditingUser}
                            handleAddUser={handleAddUser}
                            handleEditUser={handleEditUser}
                            handleDeleteUser={handleDeleteUser}
                            isEditing={isEditing}
                            setIsEditing={setIsEditing}
                        />
                    } />
                    <Route path="/sell" element={
                        <AdminPage
                            viewMode="sell"
                            user={user}
                            users={users}
                            products={products}
                            formData={formData}
                            handleInputChange={handleInputChange}
                            handleSubmit={handleSubmit}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                            handleGetLocation={handleGetLocation}
                            // Admin props not strictly needed for sell but passed to keep prop shape consistent or ignore
                            newUser="" setNewUser={() => { }} newUserRole="" setNewUserRole={() => { }} editingUser={null} setEditingUser={() => { }} handleAddUser={() => { }} handleEditUser={() => { }} handleDeleteUser={() => { }}
                            isEditing={isEditing}
                            setIsEditing={setIsEditing}
                        />
                    } />
                    <Route path="/orders" element={<OrdersPage orders={orders} />} />
                    <Route path="/favorites" element={
                        <FavoritesPage
                            favorites={favorites}
                            products={products}
                            onBuy={handleBuy}
                            onAddToCart={handleAddToCart}
                            onToggleFavorite={handleToggleFavorite}
                            getAverageRating={getAverageRating}
                            reviews={reviews}
                        />
                    } />
                    <Route path="*" element={<Navigate to="/gallery" replace />} />
                </Routes>
            </main>
            {user && location.pathname !== '/admin' && <Footer />}

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
