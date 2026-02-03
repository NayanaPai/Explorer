import React, { useState, useEffect } from 'react';
import { INTERESTS } from '../data/interests';
import { getHubContent } from '../data/hubContent';
import { ContentService } from '../services/contentService';
import { CurationAgent } from '../agent/curationAgent';
import { BookOpen, Zap, Eye, MessageSquare, Sparkles, CheckCircle, Info } from 'lucide-react';

const ExplorationHub = ({ selectedIds }) => {
    // Select the first one by default
    const [activeInterestId, setActiveInterestId] = useState(selectedIds[0]);
    const [aiContent, setAiContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showProof, setShowProof] = useState(false);

    const activeInterest = INTERESTS.find(i => i.id === activeInterestId);
    // Keep legacy content for 'Try', 'See', 'Ask' pillars for now
    const legacyContent = getHubContent(activeInterestId);

    useEffect(() => {
        const fetchContent = async () => {
            setLoading(true);
            setAiContent(null); // Clear previous content
            setShowProof(false);

            console.log(`ExplorationHub: Fetching live curation for ${activeInterestId}...`);
            try {
                const data = await CurationAgent.ask(activeInterestId);
                setAiContent(data);
            } catch (err) {
                console.error("ExplorationHub: CurationAgent failed", err);
            } finally {
                setLoading(false);
            }
        };
        if (activeInterestId) {
            fetchContent();
        }
    }, [activeInterestId]);

    return (
        <div style={{ animation: 'fadeIn 0.8s ease-out' }}>
            {/* Interest Tabs */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                overflowX: 'auto',
                paddingBottom: '1rem',
                marginTop: '-1rem',
                marginBottom: '2rem'
            }}>
                {selectedIds.map(id => {
                    const interest = INTERESTS.find(i => i.id === id);
                    const isActive = id === activeInterestId;
                    const Icon = interest.icon;

                    return (
                        <button
                            key={id}
                            onClick={() => setActiveInterestId(id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.75rem 1.25rem',
                                borderRadius: '50px',
                                background: isActive ? interest.color : 'var(--bg-card)',
                                color: isActive ? '#fff' : 'var(--text-muted)',
                                fontWeight: 600,
                                border: 'none',
                                transition: 'all 0.3s',
                                whiteSpace: 'nowrap',
                                boxShadow: isActive ? `0 4px 15px ${interest.color}60` : 'none'
                            }}
                        >
                            <Icon size={20} />
                            {interest.title}
                        </button>
                    );
                })}
            </div>

            {/* AI Trust Banner & Verification Proof */}
            {aiContent && !loading && (
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{
                        background: 'linear-gradient(to right, #eef2ff, #f5f3ff)',
                        border: '1px solid #c7d2fe',
                        borderRadius: 'var(--radius-md)',
                        padding: '0.75rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontSize: '0.9rem',
                        color: '#4338ca',
                        cursor: 'pointer'
                    }} onClick={() => setShowProof(!showProof)}>
                        <Sparkles size={16} fill="#4338ca" />
                        <span style={{ fontWeight: 600 }}>AI Agent Curation:</span>
                        <span>Content for <strong>{activeInterest.title}</strong> was validated on <strong>{aiContent.lastUpdated}</strong> by {aiContent.sourceType}.</span>
                        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 600, textDecoration: 'underline' }}>
                            <CheckCircle size={16} />
                            {showProof ? 'Hide Proof' : 'View Proof'}
                        </div>
                    </div>

                    {/* Agentic Workflow Visualization */}
                    {showProof && aiContent.verificationLog && (
                        <div style={{
                            background: '#1e1b4b',
                            color: '#a5b4fc',
                            marginTop: '0.5rem',
                            borderRadius: 'var(--radius-md)',
                            padding: '1rem',
                            fontSize: '0.85rem',
                            fontFamily: 'monospace',
                            animation: 'fadeInDown 0.3s'
                        }}>
                            <h5 style={{ color: '#fff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Sparkles size={14} /> Agentic Workflow Log (LangGraph Simulation)
                            </h5>
                            {aiContent.verificationLog.map((log, idx) => (
                                <div key={idx} style={{ marginBottom: '0.5rem', display: 'flex', gap: '1rem' }}>
                                    <span style={{ color: '#818cf8', minWidth: '140px' }}>[{log.step}]</span>
                                    <span style={{ color: log.status === 'Pass' || log.status === 'Success' ? '#4ade80' : '#e2e8f0' }}>
                                        {log.details}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* 4 Pillars Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem'
            }}>
                {/* KNOWLEDGE Pillar */}
                <PillarCard
                    title="Knowledge"
                    subtitle="Build understanding"
                    icon={BookOpen}
                    color="#4CC9F0"
                    isLoading={loading}
                    badge={aiContent?._source === 'LIVE_AGENT' ? 'AI Validated' : 'Offline'}
                >
                    {loading ? <p>Researching vetted sources...</p> : (
                        <>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 700 }}>{aiContent.knowledge?.title || 'Overview'}</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1rem', lineHeight: 1.5 }}>
                                {aiContent.knowledge?.summary || 'Information loading...'}
                            </p>
                            {aiContent.knowledge?.funFact && (
                                <div style={{ background: 'rgba(76, 201, 240, 0.1)', padding: '0.75rem', borderRadius: '8px', fontSize: '0.9rem', color: '#4CC9F0', border: '1px solid rgba(76, 201, 240, 0.2)' }}>
                                    <strong>Fun Fact:</strong> {aiContent.knowledge.funFact}
                                </div>
                            )}
                        </>
                    )}
                </PillarCard>

                {/* EVENTS Pillar */}
                <PillarCard
                    title="Events"
                    subtitle="Build belief"
                    icon={Eye}
                    color="#7209B7"
                    isLoading={loading}
                    badge={aiContent?.events ? 'Live' : null}
                >
                    {loading ? <p>Looking for webinars & exhibits...</p> : aiContent.events ? (
                        <>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{aiContent.events.title}</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>{aiContent.events.summary}</p>
                            <div style={{ fontSize: '0.85rem', color: '#7209B7', fontWeight: 600 }}>
                                📅 {aiContent.events.date}
                            </div>
                        </>
                    ) : <p style={{ color: 'var(--text-muted)' }}>No live events found for this week.</p>}
                </PillarCard>

                {/* MENTORS Pillar */}
                <PillarCard
                    title="Mentors"
                    subtitle="Get guidance"
                    icon={MessageSquare}
                    color="#4361EE"
                    isLoading={loading}
                    badge={aiContent?.mentors ? 'Experts' : null}
                >
                    {loading ? <p>Connecting with experts...</p> : aiContent.mentors ? (
                        <>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{aiContent.mentors.title}</h4>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>{aiContent.mentors.bio}</p>
                            <div style={{ background: 'rgba(67, 97, 238, 0.1)', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', display: 'inline-block', color: '#4361EE', fontWeight: 600 }}>
                                Focus: {aiContent.mentors.expertise}
                            </div>
                        </>
                    ) : <p style={{ color: 'var(--text-muted)' }}>Searching for role models...</p>}
                </PillarCard>

                {/* EXPERIMENTS Pillar */}
                <PillarCard
                    title="Experiments"
                    subtitle="Take action"
                    icon={Zap}
                    color="#F72585"
                    isLoading={loading}
                    badge={aiContent?.experiments ? 'Safe' : null}
                >
                    {loading ? <p>Designing safety-first experiments...</p> : aiContent.experiments ? (
                        <>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{aiContent.experiments.title}</h4>
                            <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                                {aiContent.experiments.steps?.slice(0, 3).map((s, i) => <li key={i}>{s}</li>)}
                            </ul>
                            <div style={{ fontSize: '0.75rem', background: 'rgba(247, 37, 133, 0.1)', color: '#F72585', padding: '0.5rem', borderRadius: '4px', borderLeft: '3px solid #F72585' }}>
                                ⚠️ {aiContent.experiments.safetyNote}
                            </div>
                        </>
                    ) : <p style={{ color: 'var(--text-muted)' }}>No experiments available today.</p>}
                </PillarCard>
            </div>
        </div>
    );
};

const PillarCard = ({ title, subtitle, icon: Icon, color, content, children, isLoading, badge }) => (
    <div className="hover-lift" style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        transition: 'transform 0.3s',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative'
    }}>
        <div style={{ background: color, padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <h3 style={{ color: 'white', fontSize: '1.25rem' }}>{title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem' }}>{subtitle}</p>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.5rem', borderRadius: '50%' }}>
                <Icon size={24} color="white" />
            </div>
        </div>

        {badge && (
            <div style={{
                position: 'absolute', top: '12px', right: '60px',
                background: 'white', color: color,
                padding: '2px 8px', borderRadius: '12px',
                fontSize: '0.7rem', fontWeight: 700
            }}>
                {badge}
            </div>
        )}

        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* If children exist (Custom AI Content), render them. Else render legacy content structure */}
            {children ? children : (
                <>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{content?.title}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{content?.content}</p>
                </>
            )}

            <div style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
                <span style={{
                    color: color,
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                }}>
                    Explore now →
                </span>
            </div>
        </div>
    </div>
);

export default ExplorationHub;
