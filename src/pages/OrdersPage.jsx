import React from 'react';

export function OrdersPage({ orders }) {
    return (
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
    );
}
