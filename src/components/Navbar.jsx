import React from 'react';

export function Navbar({ currentView, setView, user, onLogout, onDeleteAccount }) {
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
                        style={{ background: currentView === 'gallery' ? 'var(--accent-color)' : 'transparent', color: currentView === 'gallery' ? '#000' : 'var(--text-primary)' }}
                    >
                        Gallery
                    </button>

                    {user && user.role === 'user' && (
                        <button
                            onClick={() => setView('sell')}
                            style={{ background: currentView === 'sell' ? 'var(--accent-color)' : 'transparent', color: currentView === 'sell' ? '#000' : 'var(--text-primary)' }}
                        >
                            Sell Art
                        </button>
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
                    )}
                </div>
            </nav>
        </div>
    );
}
