import React, { useState } from 'react';

export function StarRating({ rating, onRate, readonly = false, size = '1.5rem' }) {
    const [hover, setHover] = useState(0);

    return (
        <div style={{ display: 'flex', gap: '0.25rem' }}>
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    onClick={() => !readonly && onRate && onRate(star)}
                    onMouseEnter={() => !readonly && setHover(star)}
                    onMouseLeave={() => !readonly && setHover(0)}
                    style={{
                        fontSize: size,
                        cursor: readonly ? 'default' : 'pointer',
                        color: star <= (hover || rating) ? 'var(--accent-color)' : 'var(--text-secondary)',
                        transition: 'color 0.2s'
                    }}
                >
                    ★
                </span>
            ))}
        </div>
    );
}
