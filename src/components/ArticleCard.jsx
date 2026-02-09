import React, { useState } from 'react';
import { Bookmark, Share2, Clock, ThumbsUp, CheckCircle, Lightbulb, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ReflectionModal from './ReflectionModal';

const ArticleCard = ({ article, onReadMore }) => {
    const { addReflection } = useAuth();
    const [showReflection, setShowReflection] = useState(false);
    const [completed, setCompleted] = useState(false);

    const handleReflect = (data) => {
        console.log("Reflection Submitted:", data);
        addReflection({
            text: data.thought,
            sentiment: data.sentiment,
            topic: article.title,
            studentName: 'Generic Student'
        });
        setCompleted(true);
        setShowReflection(false);
    };

    return (
        <div className="hover-lift" style={{
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            animation: 'fadeInUp 0.5s ease-out'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#4361EE', fontWeight: 700, letterSpacing: '0.5px' }}>
                    TL;DR
                </span>
                <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                    <Bookmark size={18} />
                </button>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.3 }}>
                {article.title}
            </h3>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, flex: 1 }}>
                {article.summary}
            </p>

            {article.funFact && (
                <div style={{ background: 'rgba(255, 214, 10, 0.1)', borderLeft: '3px solid #FFD60A', padding: '0.75rem', borderRadius: '4px', fontSize: '0.85rem', color: 'var(--text-foreground)' }}>
                    <strong>Did you know?</strong> {article.funFact}
                </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {completed ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#6BCB77', fontWeight: 700 }}>
                            <CheckCircle size={14} /> Explored
                        </span>
                    ) : (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={14} /> 2 min</span>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    {!completed && (
                        <button
                            onClick={() => setShowReflection(true)}
                            style={{ background: 'transparent', border: '1.5px solid #4361EE', color: '#4361EE', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                        >
                            <Lightbulb size={12} /> I did it!
                        </button>
                    )}
                    <button
                        onClick={onReadMore}
                        style={{ background: 'transparent', border: 'none', color: '#4361EE', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}
                    >
                        Read Full &rarr;
                    </button>
                </div>
            </div>

            {showReflection && (
                <ReflectionModal
                    title={article.title}
                    onClose={() => setShowReflection(false)}
                    onSubmit={handleReflect}
                />
            )}
        </div>
    );
};

export default ArticleCard;
