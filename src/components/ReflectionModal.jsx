import React, { useState } from 'react';
import { X, Send, Heart, Lightbulb, Sparkles } from 'lucide-react';

const ReflectionModal = ({ title, onClose, onSubmit }) => {
    const [thought, setThought] = useState('');
    const [sentiment, setSentiment] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (thought.trim()) {
            onSubmit({ thought, sentiment });
            onClose();
        }
    };

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
            padding: '2rem'
        }}>
            <div style={{
                background: 'var(--bg-card)',
                width: '100%',
                maxWidth: '500px',
                borderRadius: 'var(--radius-lg)',
                padding: '2.5rem',
                position: 'relative',
                boxShadow: 'var(--shadow-lg)',
                animation: 'fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}>
                <button
                    onClick={onClose}
                    style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                    <X size={24} />
                </button>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        background: 'rgba(255, 215, 0, 0.1)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem',
                        color: '#FFD700'
                    }}>
                        <Sparkles size={32} />
                    </div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>Moment of "Aha!"</h2>
                    <p style={{ color: 'var(--text-muted)' }}>You just explored <strong>{title}</strong>. What's one thing that surprised you?</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <textarea
                        value={thought}
                        onChange={(e) => setThought(e.target.value)}
                        placeholder="I realized that..."
                        autoFocus
                        style={{
                            width: '100%',
                            minHeight: '120px',
                            padding: '1rem',
                            borderRadius: 'var(--radius-md)',
                            background: 'var(--bg-secondary)',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-foreground)',
                            fontSize: '1rem',
                            resize: 'none',
                            outline: 'none',
                            transition: 'border-color 0.2s'
                        }}
                    />

                    <div>
                        <p style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text-muted)' }}>How do you feel about this now?</p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            {[
                                { id: 'excited', icon: Heart, label: 'Excited', color: '#FF6B6B' },
                                { id: 'curious', icon: Lightbulb, label: 'Curious', color: '#4D96FF' },
                                { id: 'puzzled', icon: Sparkles, label: 'Want more', color: '#6BCB77' }
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setSentiment(item.id)}
                                    style={{
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.75rem',
                                        borderRadius: '12px',
                                        border: `2px solid ${sentiment === item.id ? item.color : 'transparent'}`,
                                        background: sentiment === item.id ? `${item.color}10` : 'var(--bg-secondary)',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <item.icon size={20} color={sentiment === item.id ? item.color : 'var(--text-muted)'} />
                                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: sentiment === item.id ? 'var(--text-foreground)' : 'var(--text-muted)' }}>{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={!thought.trim()}
                        style={{
                            background: 'var(--gradient-main)',
                            color: 'white',
                            padding: '1rem',
                            borderRadius: 'var(--radius-md)',
                            border: 'none',
                            fontWeight: 700,
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            cursor: thought.trim() ? 'pointer' : 'not-allowed',
                            opacity: thought.trim() ? 1 : 0.5,
                            transition: 'transform 0.2s'
                        }}
                    >
                        Share with Guidance <Send size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReflectionModal;
