import React from 'react';

const QuestionCard = ({ interest, question, onAnswer, onSkip, current, total }) => {
    const Icon = interest.icon;

    return (
        <div style={{
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            padding: '2.5rem',
            maxWidth: '600px',
            margin: '0 auto',
            boxShadow: 'var(--shadow-card)',
            textAlign: 'center',
            animation: 'fadeInUp 0.5s ease-out'
        }}>
            <div style={{
                margin: '0 auto 1.5rem',
                background: `${interest.color}20`,
                color: interest.color,
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Icon size={32} />
            </div>

            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{interest.title}</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Question {current} of {total}
            </p>

            <h3 style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '2.5rem', lineHeight: 1.3 }}>
                {question}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <button
                    onClick={() => onAnswer(true)}
                    style={{
                        background: 'var(--bg-card-hover)',
                        border: '2px solid transparent',
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--text-main)',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        transition: 'all 0.2s',
                        // Hover handled by CSS usually, but inline simplest for now
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.borderColor = interest.color;
                        e.currentTarget.style.background = `${interest.color}20`;
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = 'transparent';
                        e.currentTarget.style.background = 'var(--bg-card-hover)';
                    }}
                >
                    Yes!
                </button>
                <button
                    onClick={() => onAnswer(false)}
                    style={{
                        background: 'var(--bg-card-hover)',
                        border: '2px solid transparent',
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--text-main)',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.borderColor = 'var(--text-muted)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = 'transparent';
                    }}
                >
                    Not really
                </button>
            </div>

            <button
                onClick={onSkip}
                style={{
                    background: 'transparent',
                    color: 'var(--text-muted)',
                    textDecoration: 'underline',
                    fontSize: '0.9rem'
                }}
            >
                Skip this question
            </button>
        </div>
    );
};

export default QuestionCard;
