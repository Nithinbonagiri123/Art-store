import React from 'react';

export function AdminPage({
    viewMode, // 'admin' or 'sell'
    user,
    users,
    products,
    formData,
    handleInputChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleGetLocation,
    // Admin specific
    newUser,
    setNewUser,
    newUserRole,
    setNewUserRole,
    editingUser,
    setEditingUser,
    handleAddUser,
    handleEditUser,
    handleDeleteUser,
    isEditing,
    setIsEditing
}) {
    return (
        <div className="glass-panel" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ margin: 0 }}>{viewMode === 'admin' ? 'Admin Dashboard' : 'Sell Your Art'}</h1>
            </div>

            {viewMode === 'admin' && (
                <div style={{ marginBottom: '3rem', padding: '1.5rem', background: 'var(--bg-card)', borderRadius: '12px' }}>
                    <h2 style={{ marginTop: 0 }}>User Management</h2>
                    <form onSubmit={handleAddUser} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                        <input
                            type="text"
                            value={newUser}
                            onChange={(e) => setNewUser(e.target.value)}
                            placeholder="New username..."
                            style={{ flex: 1, padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-primary)' }}
                        />
                        <select
                            value={newUserRole}
                            onChange={(e) => setNewUserRole(e.target.value)}
                            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-primary)' }}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                        <button type="submit">{editingUser ? 'Update User' : 'Add User'}</button>
                        {editingUser && (
                            <button type="button" onClick={() => { setEditingUser(null); setNewUser(''); setNewUserRole('user'); }} style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                                Cancel
                            </button>
                        )}
                    </form>
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                        {users.map(u => (
                            <div key={u.id} style={{ padding: '0.8rem', background: 'var(--bg-card)', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                {viewMode === 'admin' && (
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                        <label>Assign to User (Seller)</label>
                        <select
                            name="seller"
                            value={formData.seller || ''}
                            onChange={handleInputChange}
                            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-primary)' }}
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
                        style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-primary)' }}
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
                            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-primary)' }}
                        />
                    </div>
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                        <label>Category</label>
                        <input
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-primary)' }}
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gap: '0.5rem', padding: '1rem', background: 'var(--bg-card)', borderRadius: '8px' }}>
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
                            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-primary)' }}
                        />
                        <input
                            name="lat"
                            type="number"
                            value={formData.lat || ''}
                            onChange={handleInputChange}
                            placeholder="Lat"
                            step="any"
                            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-primary)' }}
                        />
                        <input
                            name="lng"
                            type="number"
                            value={formData.lng || ''}
                            onChange={handleInputChange}
                            placeholder="Lng"
                            step="any"
                            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-primary)' }}
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
                        style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-primary)' }}
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
                        style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-primary)', fontFamily: 'inherit' }}
                    />
                </div>
                <button type="submit" style={{ padding: '1rem' }}>
                    {isEditing ? 'Update Product' : 'List Item for Sale'}
                </button>
            </form>

            {(viewMode === 'admin' || (viewMode === 'sell' && products.some(p => p.seller === user.username))) && (
                <>
                    <h2 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                        {viewMode === 'admin' ? 'Global Inventory' : 'Your Listings'}
                    </h2>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {products.filter(p => viewMode === 'admin' || p.seller === user.username).map(product => (
                            <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--bg-card)', borderRadius: '8px' }}>
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
    );
}
