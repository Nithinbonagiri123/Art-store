import React from 'react';

export function Navbar({ currentView, setView, user, onLogout, onDeleteAccount, cartCount, onCartClick, theme, onToggleTheme }) {
    return (
        <div style={{ position: 'sticky', top: 0, zIndex: 1000, background: 'rgba(10,10,10,0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--border-color)' }}>
            <nav className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, background: 'linear-gradient(45deg, #fff, var(--accent-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        ART STORE
                    </h1>
                </div>
                <div className="nav-links" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <button
                        onClick={() => setView('gallery')}
                        style={{ background: currentView === 'gallery' ? 'var(--accent-color)' : 'transparent', color: currentView === 'gallery' ? 'black' : 'white' }}
                    >
                        Gallery
                    </button>

                    {user && user.role === 'user' && (
                        <>
                            <button
                                onClick={() => setView('sell')}
                                style={{ background: currentView === 'sell' ? 'var(--accent-color)' : 'transparent', color: currentView === 'sell' ? 'black' : 'white' }}
                            >
                                Sell Art
                            </button>
                            <button
                                onClick={() => setView('orders')}
                                style={{ background: currentView === 'orders' ? 'var(--accent-color)' : 'transparent', color: currentView === 'orders' ? 'black' : 'white' }}
                            >
                                My Orders
                            </button>
                            <button
                                onClick={() => setView('favorites')}
                                style={{ background: currentView === 'favorites' ? 'var(--accent-color)' : 'transparent', color: currentView === 'favorites' ? 'black' : 'white' }}
                            >
                                ❤️ Favorites
                            </button>
                        </>
                    )}

                    {user && user.role === 'admin' && (
                        <button
                            onClick={() => setView('admin')}
                            style={{ background: currentView === 'admin' ? 'var(--accent-color)' : 'transparent', color: currentView === 'admin' ? '#000' : 'var(--text-primary)' }}
                        >
                            Admin Dashboard
                        </button>
                    )}

                    {user && (
                        <>
                            <button
                                onClick={onToggleTheme}
                                style={{ fontSize: '1.2rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.1)' }}
                                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                            >
                                {theme === 'dark' ? '☀️' : '🌙'}
                            </button>
                            <button
                                onClick={onCartClick}
                                style={{ position: 'relative', fontSize: '1.2rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.1)' }}
                            >
                                🛒
                                {cartCount > 0 && (
                                    <span style={{
                                        position: 'absolute',
                                        top: '-5px',
                                        right: '-5px',
                                        background: 'var(--accent-color)',
                                        color: 'black',
                                        borderRadius: '50%',
                                        width: '20px',
                                        height: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.7rem',
                                        fontWeight: 'bold'
                                    }}>
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '1rem', borderLeft: '1px solid var(--border-color)', paddingLeft: '1rem' }}>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{user.username}</span>
                                <button
                                    onClick={onLogout}
                                    style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', background: 'rgba(255,255,255,0.1)' }}
                                >
                                    Logout
                                </button>
                                {user.role !== 'admin' && (
                                    <button
                                        onClick={onDeleteAccount}
                                        style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', background: '#ff4444', color: 'white' }}
                                    >
                                        Delete Account
                                    </button>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </nav>
        </div>
    );
}
