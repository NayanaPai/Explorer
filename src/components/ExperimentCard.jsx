import React, { useState } from 'react';
import { FlaskConical, ExternalLink, Clock, BarChart, FileText, Youtube, CheckCircle, Sparkles } from 'lucide-react';
import ReflectionModal from './ReflectionModal';

const ExperimentCard = ({ experiment }) => {
    const [showReflection, setShowReflection] = useState(false);
    const [completed, setCompleted] = useState(false);

    const handleReflect = (data) => {
        console.log("Experiment Reflection:", data);
        setCompleted(true);
    };

    return (
        <div className="hover-lift" style={{
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            animation: 'fadeInUp 0.5s ease-out'
        }}>
            {/* Header / Video Placeholder */}
            {/* ... keeping existing header code ... */}
            <div style={{
                height: '160px',
                background: 'var(--bg-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
            }}>
                {experiment.videoUrl ? (
                    <iframe
                        width="100%"
                        height="100%"
                        src={experiment.videoUrl}
                        title={experiment.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ border: 'none' }}
                    />
                ) : (
                    <FlaskConical size={48} color="var(--text-muted)" style={{ opacity: 0.3 }} />
                )}

                <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 600
                }}>
                    {experiment.type}
                </div>
            </div>

            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{experiment.title}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                        {experiment.description}
                    </p>
                </div>

                {/* Meta Tags */}
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Clock size={14} /> {experiment.duration}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <BarChart size={14} /> {experiment.difficulty}
                    </div>
                </div>

                {/* Materials List */}
                <div style={{ background: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: '6px', fontSize: '0.85rem' }}>
                    <strong style={{ display: 'block', marginBottom: '0.25rem', color: 'var(--text-foreground)' }}>You need:</strong>
                    <div style={{ color: 'var(--text-muted)' }}>
                        {experiment.materials.join(', ')}
                    </div>
                </div>

                {/* Footer Action */}
                <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Source: {experiment.source}</span>
                        <a
                            href={experiment.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                color: '#F72585',
                                textDecoration: 'none',
                                fontWeight: 700,
                                fontSize: '0.9rem'
                            }}
                        >
                            Open Guide <ExternalLink size={14} />
                        </a>
                    </div>

                    {completed ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#6BCB77', fontWeight: 800, padding: '0.75rem', background: '#6BCB7710', borderRadius: '12px' }}>
                            <CheckCircle size={20} /> Project Logged!
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowReflection(true)}
                            style={{
                                background: '#F72585',
                                color: 'white',
                                padding: '0.75rem',
                                borderRadius: '12px',
                                border: 'none',
                                fontWeight: 800,
                                fontSize: '1rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <Sparkles size={18} /> I did this!
                        </button>
                    )}
                </div>
            </div>

            {showReflection && (
                <ReflectionModal
                    title={experiment.title}
                    onClose={() => setShowReflection(false)}
                    onSubmit={handleReflect}
                />
            )}
        </div>
    );
};

export default ExperimentCard;
