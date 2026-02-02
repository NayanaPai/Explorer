import React, { useState, useEffect } from 'react';
import { MOCK_USER_HISTORY } from '../data/userHistory';
import { INTERESTS } from '../data/interests';
import { LongitudinalAgent } from '../agent/longitudinalAgent';
import { Clock, ArrowRight, Star, Sparkles, MapPin, PlayCircle, MessageCircle, Trophy, BrainCircuit, Loader2 } from 'lucide-react';

const ReturningUserDashboard = ({ onExploreInterest }) => {
    const [agentRecommendations, setAgentRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendations = async () => {
            // Guard against missing data for the agent analysis
            if (!MOCK_USER_HISTORY) {
                setLoading(false);
                return;
            }
            setLoading(true);
            try {
                const recs = await LongitudinalAgent.analyzePath(MOCK_USER_HISTORY);
                setAgentRecommendations(recs || []); // Fallback to empty array if recs is null/undefined
            } catch (err) {
                console.error("Failed to load recommendations", err);
                setAgentRecommendations([]); // Ensure state is an array even on error
            } finally {
                setLoading(false);
            }
        };
        fetchRecommendations();
    }, []); // Empty dependency array means this runs once on mount

    // Guard against missing data for the entire dashboard
    if (!MOCK_USER_HISTORY || !INTERESTS) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;

    const { incompleteActivities = [], engagement = {}, mentorReplies = [] } = MOCK_USER_HISTORY;

    // 1. Continue Logic
    const continueItems = [
        ...incompleteActivities.map(act => ({ type: 'activity', ...act })),
        ...mentorReplies.map(rep => ({ type: 'mentor', ...rep }))
    ];

    // 2. Go Deeper Logic (Highest engagement)
    let topInterest = null;
    const engagementEntries = Object.entries(engagement);
    if (engagementEntries.length > 0) {
        const topInterestId = engagementEntries.sort((a, b) => b[1] - a[1])[0][0];
        topInterest = INTERESTS.find(i => i.id === topInterestId);
    }

    // 3. Try Something New Logic (Adjacent categories)
    const historyIds = MOCK_USER_HISTORY.selectedInterestIds || [];
    // Ensure we handle case where historyIds might be empty or invalid
    const userCategories = historyIds.map(id =>
        INTERESTS.find(i => i.id === id)?.category
    ).filter(Boolean);

    // Find interests in same categories but NOT selected
    const adjacentInterests = INTERESTS.filter(i =>
        i.category &&
        userCategories.includes(i.category) &&
        !historyIds.includes(i.id)
    ).slice(0, 3);

    // 4. Real World Connections (Mock)
    const events = [
        { title: 'Local Science Fair', type: 'Event', date: 'This Saturday', icon: MapPin },
        { title: '7-Day Eco Challenge', type: 'Challenge', date: 'Starts Monday', icon: Trophy },
    ];

    return (
        <div style={{ animation: 'fadeIn 0.8s ease-out', paddingBottom: '4rem' }}>

            {/* SECTION 0: Gemini's Path (The Showcase) */}
            <section style={{ marginBottom: '4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <div style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', padding: '0.5rem', borderRadius: '12px', color: 'white' }}>
                        <BrainCircuit size={24} />
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: 0 }}>Gemini's Path for You</h2>
                            {agentRecommendations.length > 0 && (
                                <span style={{
                                    fontSize: '0.75rem',
                                    padding: '0.2rem 0.6rem',
                                    borderRadius: '12px',
                                    background: agentRecommendations[0]._source?.includes('LIVE') ? '#dcfce7' : '#f1f5f9',
                                    color: agentRecommendations[0]._source?.includes('LIVE') ? '#166534' : '#64748b',
                                    fontWeight: 700,
                                    border: '1px solid currentColor'
                                }}>
                                    {agentRecommendations[0]._source}
                                </span>
                            )}
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Based on your unique learning journey</p>
                    </div>
                </div>

                {loading ? (
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        height: '200px', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)',
                        color: 'var(--text-muted)', gap: '0.5rem'
                    }}>
                        <Loader2 size={24} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
                        <span>Gemini 3.0 Pro is analyzing your history...</span>
                        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                    </div>
                ) : agentRecommendations.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                        {agentRecommendations.map((rec, idx) => (
                            <div key={idx} style={{
                                background: 'var(--bg-card)',
                                borderRadius: 'var(--radius-lg)',
                                padding: '1.5rem',
                                border: '1px solid var(--bg-card-hover)',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                {/* Badge */}
                                <div style={{
                                    position: 'absolute', top: 0, right: 0,
                                    background: rec.type === 'RESUME' ? '#FFD93D' : rec.type === 'CHALLENGE' ? '#FF6B6B' : '#4D96FF',
                                    color: '#222', fontSize: '0.75rem', fontWeight: 800,
                                    padding: '0.25rem 1rem',
                                    borderBottomLeftRadius: '12px'
                                }}>
                                    {rec.type}
                                </div>

                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '0.5rem', marginBottom: '0.25rem' }}>{rec.title}</h3>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{rec.subtitle}</div>

                                {/* Reasoning Block */}
                                <div style={{
                                    background: '#f8fafc',
                                    padding: '1rem',
                                    borderRadius: '12px',
                                    marginBottom: '1.5rem',
                                    borderLeft: '4px solid #6366f1'
                                }}>
                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem', color: '#6366f1', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
                                        <Sparkles size={12} /> Why this?
                                    </div>
                                    <p style={{ color: '#475569', fontSize: '0.9rem', fontStyle: 'italic', lineHeight: 1.5 }}>
                                        "{rec.reasoning}"
                                    </p>
                                </div>

                                <button style={{
                                    marginTop: 'auto',
                                    width: '100%',
                                    padding: '0.75rem',
                                    background: 'var(--bg-main)',
                                    border: '1px solid var(--text-muted)',
                                    borderRadius: 'var(--radius-md)',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'background 0.2s'
                                }}>
                                    {rec.action}
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Optional: Message if no recommendations are found after loading
                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                        No personalized recommendations at this time. Keep exploring!
                    </div>
                )}
            </section>

            {/* SECTION 1: Continue Where You Left Off */}
            {continueItems.length > 0 && (
                <section style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={24} color="var(--primary-accent)" />
                        Jump Back In
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {continueItems.map((item, idx) => {
                            const interest = INTERESTS.find(i => i.id === item.interestId);
                            // Skip if interest not found
                            if (!interest) return null;

                            return (
                                <div key={idx} style={{
                                    background: 'var(--bg-card)',
                                    borderRadius: 'var(--radius-md)',
                                    padding: '1.5rem',
                                    borderLeft: `4px solid ${interest.color}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s'
                                }}
                                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    <div style={{ background: 'var(--bg-card-hover)', padding: '0.75rem', borderRadius: '50%' }}>
                                        {item.type === 'activity' ? <PlayCircle size={24} color={interest.color} /> : <MessageCircle size={24} color={interest.color} />}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                                            {item.type === 'activity' ? 'Finish Activity' : 'Mentor Reply'} • {interest.title}
                                        </div>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                                            {item.type === 'activity' ? item.title : item.preview}
                                        </h3>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>
            )}

            {/* SECTION 2: Go Deeper */}
            {topInterest && (
                <section style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Star size={24} color="#FFD700" />
                        Level Up: {topInterest.title}
                    </h2>
                    <div style={{
                        background: `linear-gradient(135deg, ${topInterest.color}20 0%, var(--bg-card) 100%)`,
                        borderRadius: 'var(--radius-lg)',
                        padding: '2rem',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '1rem',
                        border: `1px solid ${topInterest.color}40`
                    }}>
                        <div>
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Want to explore rockets next?</h3>
                            <p style={{ color: 'var(--text-muted)', maxWidth: '500px' }}>
                                You've spent a lot of time on Space & Astronomy. We think you're ready for some advanced rocket science concepts!
                            </p>
                        </div>
                        <button
                            onClick={() => onExploreInterest(topInterest.id)}
                            style={{
                                background: topInterest.color,
                                color: 'white',
                                padding: '0.75rem 1.5rem',
                                borderRadius: 'var(--radius-md)',
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            Go Deeper <ArrowRight size={18} />
                        </button>
                    </div>
                </section>
            )}

            {/* SECTION 3: Try Something New */}
            {adjacentInterests.length > 0 && (
                <section style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Sparkles size={24} color="#00D2D3" />
                        You Might Also Like
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        {adjacentInterests.map(interest => {
                            const Icon = interest.icon;
                            return (
                                <div key={interest.id} style={{
                                    background: 'var(--bg-card)',
                                    borderRadius: 'var(--radius-md)',
                                    padding: '1.5rem',
                                    textAlign: 'center',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    cursor: 'pointer'
                                }}
                                    onClick={() => onExploreInterest(interest.id)}
                                >
                                    <div style={{
                                        position: 'absolute', top: 10, right: 10,
                                        background: 'var(--primary-accent)', color: 'white',
                                        fontSize: '0.7rem', padding: '0.25rem 0.5rem', borderRadius: '10px'
                                    }}>
                                        Try
                                    </div>
                                    <div style={{ color: interest.color, marginBottom: '1rem', display: 'inline-block' }}>
                                        <Icon size={32} />
                                    </div>
                                    <h4 style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{interest.title}</h4>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{interest.category}</p>
                                </div>
                            )
                        })}
                    </div>
                </section>
            )}

            {/* SECTION 4: Real-World Connections */}
            <section>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={24} color="#43AA8B" />
                    Real World Events
                </h2>
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                    {events.map((evt, idx) => (
                        <div key={idx} style={{
                            flex: 1,
                            minWidth: '250px',
                            background: 'var(--bg-card)',
                            borderRadius: 'var(--radius-md)',
                            padding: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}>
                            <div style={{ background: '#43AA8B20', padding: '0.75rem', borderRadius: '50%', color: '#43AA8B' }}>
                                <evt.icon size={24} />
                            </div>
                            <div>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{evt.title}</h4>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{evt.type} • {evt.date}</div>
                            </div>
                            <button style={{ marginLeft: 'auto', background: 'transparent', border: '1px solid var(--text-muted)', color: 'var(--text-muted)', padding: '0.5rem 1rem', borderRadius: '20px' }}>
                                View
                            </button>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default ReturningUserDashboard;
