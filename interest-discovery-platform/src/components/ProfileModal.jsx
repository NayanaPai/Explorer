import React from 'react';
import { X, User, Award, History, Star } from 'lucide-react';
import { INTERESTS } from '../data/interests';

const ProfileModal = ({ user, onClose }) => {
    // Find full interest objects for the user's selected interests
    const userInterests = INTERESTS.filter(i => user.selectedInterestIds?.includes(i.id));

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            animation: 'fadeIn 0.3s ease-out'
        }} onClick={onClose}>
            <div
                style={{
                    background: 'var(--bg-card)',
                    width: '90%',
                    maxWidth: '500px',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2rem',
                    position: 'relative',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}
                onClick={e => e.stopPropagation()}
                className="animate-fade-in"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1.5rem',
                        right: '1.5rem',
                        background: 'rgba(255,255,255,0.05)',
                        border: 'none',
                        color: 'white',
                        padding: '0.5rem',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <X size={20} />
                </button>

                {/* Profile Header */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'var(--gradient-main)',
                        margin: '0 auto 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        fontWeight: 800,
                        boxShadow: 'var(--shadow-glow)'
                    }}>
                        {user.name.charAt(0)}
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>{user.name}</h2>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontFamily: 'monospace' }}>
                        Explorer Code: {user.shareCode}
                    </div>
                </div>

                {/* Stats / Highlights */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                        <Award size={20} color="var(--primary-accent)" style={{ marginBottom: '0.5rem' }} />
                        <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>12</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Activities Done</div>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                        <History size={20} color="var(--secondary-accent)" style={{ marginBottom: '0.5rem' }} />
                        <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>4</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Active Paths</div>
                    </div>
                </div>

                {/* Interests Section */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Star size={16} color="#FFD700" /> My Interests
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                        {userInterests.map(interest => (
                            <div key={interest.id} style={{
                                background: 'rgba(255,255,255,0.05)',
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                fontSize: '0.85rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                border: `1px solid ${interest.color}40`
                            }}>
                                <interest.icon size={14} color={interest.color} />
                                {interest.title}
                            </div>
                        ))}
                        {userInterests.length === 0 && <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No interests selected yet.</div>}
                    </div>
                </div>

                {/* Action Footer */}
                <button
                    onClick={onClose}
                    style={{
                        width: '100%',
                        padding: '1rem',
                        background: 'var(--gradient-main)',
                        borderRadius: 'var(--radius-md)',
                        color: 'white',
                        fontWeight: 600,
                        marginTop: '1rem',
                        boxShadow: 'var(--shadow-glow)'
                    }}
                >
                    Back to Exploration
                </button>
            </div>
        </div>
    );
};

export default ProfileModal;
