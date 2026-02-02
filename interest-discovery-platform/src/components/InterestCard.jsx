import React from 'react';

const InterestCard = ({ interest, isSelected, onClick }) => {
    const Icon = interest.icon;

    return (
        <div
            onClick={onClick}
            style={{
                backgroundColor: isSelected ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                border: `2px solid ${isSelected ? interest.color : 'transparent'}`,
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'all 0.3s var(--ease-spring)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                gap: '1rem',
                boxShadow: isSelected ? `0 0 20px ${interest.color}40` : 'var(--shadow-card)',
                transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                position: 'relative',
                overflow: 'hidden'
            }}
            className="interest-card"
        >
            {/* Background Glow Effect */}
            <div
                style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: `radial-gradient(circle, ${interest.color}20 0%, transparent 70%)`,
                    opacity: isSelected ? 0.5 : 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none'
                }}
            />

            <div
                style={{
                    backgroundColor: `${interest.color}20`,
                    padding: '1rem',
                    borderRadius: '50%',
                    color: interest.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Icon size={32} strokeWidth={2} />
            </div>

            <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                    {interest.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    {interest.description}
                </p>
            </div>
        </div>
    );
};

export default InterestCard;
