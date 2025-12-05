import React from 'react';

export function Footer() {
    return (
        <footer style={{
            marginTop: 'auto',
            padding: '2rem 0',
            borderTop: '1px solid var(--border-color)',
            textAlign: 'center',
            color: 'var(--text-secondary)',
            fontSize: '0.9rem'
        }}>
            <div className="container">
                <p>&copy; {new Date().getFullYear()} Art Store. All rights reserved.</p>
            </div>
        </footer>
    );
}
