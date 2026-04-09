import React from 'react';

export default function Loading(): React.ReactElement {
    return (
        <>
            <div
                aria-label="Loading"
                role="status"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '200px'
                }}
            >
                <div
                    style={{
                        width: '32px',
                        height: '32px',
                        background: 'var(--glass-bg)',
                        border: '3px solid var(--glass-border)',
                        borderTopColor: 'var(--interactive-accent)',
                        borderRadius: '50%',
                        boxShadow: 'var(--card-shadow)',
                        backdropFilter: 'saturate(180%) blur(10px)',
                        animation: 'spin 0.8s linear infinite'
                    }}
                />
            </div>
            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </>
    );
}
