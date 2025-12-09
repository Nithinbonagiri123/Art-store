import React, { useState } from 'react';

export function Login({ onLogin, onRegister }) {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isRegistering) {
            onRegister({ username, password, email });
        } else {
            onLogin({ username, password });
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'var(--bg-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 2000
        }}>
            <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '3rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                    {isRegistering ? 'Create Account' : 'Welcome Back'}
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    {isRegistering ? 'Join our art community' : 'Sign in to continue'}
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-primary)' }}
                    />
                    {isRegistering && (
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-primary)' }}
                        />
                    )}
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-primary)' }}
                    />

                    <button type="submit" style={{ padding: '1rem', background: 'var(--accent-color)', color: 'black', fontWeight: 'bold' }}>
                        {isRegistering ? 'Sign Up' : 'Login'}
                    </button>
                </form>

                <button
                    onClick={() => setIsRegistering(!isRegistering)}
                    style={{ marginTop: '1.5rem', background: 'transparent', border: 'none', color: 'var(--text-secondary)', textDecoration: 'underline', cursor: 'pointer' }}
                >
                    {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
                </button>
            </div>
        </div>
    );
}
