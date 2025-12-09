import React from 'react';
import { NavLink } from 'react-router-dom';

export function Navbar({ user, onLogout, onDeleteAccount, cartCount, onCartClick, theme, onToggleTheme }) {
    const navLinkStyle = ({ isActive }) => ({
        background: isActive ? 'var(--accent-color)' : 'transparent',
        color: isActive ? '#000' : 'var(--text-primary)',
        textDecoration: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        fontWeight: isActive ? 'bold' : 'normal',
        transition: 'all 0.3s ease'
    });

    return (
        <div style={{ position: 'sticky', top: 0, zIndex: 1000, background: 'var(--bg-primary)', opacity: 0.95, backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.3s ease' }}>
            <nav className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, background: 'linear-gradient(45deg, var(--text-primary), var(--accent-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        ART STORE
                    </h1>
                </div>
                <div className="nav-links" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <NavLink to="/gallery" style={navLinkStyle}>
                        Gallery
                    </NavLink>

                    {user && user.role === 'user' && (
                        <>
                            <NavLink to="/sell" style={navLinkStyle}>
                                Sell Art
                            </NavLink>
                            <NavLink to="/orders" style={navLinkStyle}>
                                My Orders
                            </NavLink>
                            <NavLink to="/favorites" style={navLinkStyle}>
                                ❤️ Favorites
                            </NavLink>
                        </>
                    )}

                    {user && user.role === 'admin' && (
                        <NavLink to="/admin" style={navLinkStyle}>
                            Admin Dashboard
                        </NavLink>
                    )}

                    {user && (
                        <>
                            <button
                                onClick={onToggleTheme}
                                style={{ fontSize: '1.2rem', padding: '0.5rem 1rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer' }}
                                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                            >
                                {theme === 'dark' ? '☀️' : '🌙'}
                            </button>
                            <button
                                onClick={onCartClick}
                                style={{ position: 'relative', fontSize: '1.2rem', padding: '0.5rem 1rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer' }}
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
                                    style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer' }}
                                >
                                    Logout
                                </button>
                                {user.role !== 'admin' && (
                                    <button
                                        onClick={onDeleteAccount}
                                        style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem', background: '#ff4444', color: 'white', cursor: 'pointer' }}
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
