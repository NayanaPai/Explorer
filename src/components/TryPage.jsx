import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronRight, ChevronDown, Filter, Zap } from 'lucide-react';
import { getTaxonomy } from '../data/learningTaxonomy';
import { TRY_CONTENT } from '../data/tryContent';
import ExperimentCard from './ExperimentCard';

const TryPage = ({ interestId, onBack }) => {
    const taxonomy = getTaxonomy(interestId);

    // State
    const [selectedCategory, setSelectedCategory] = useState(taxonomy?.categories?.[0]?.id || null);
    const [selectedSubtopic, setSelectedSubtopic] = useState(taxonomy?.categories?.[0]?.subtopics?.[0] || null);
    const [experiments, setExperiments] = useState([]);

    // Set defaults on load
    useEffect(() => {
        if (taxonomy && !selectedCategory && taxonomy.categories?.length > 0) {
            setSelectedCategory(taxonomy.categories[0].id);
            setSelectedSubtopic(taxonomy.categories[0].subtopics[0]);
        }
    }, [taxonomy, selectedCategory]);

    // Fetch Content when Subtopic changes
    useEffect(() => {
        const fetchContent = async () => {
            if (!selectedSubtopic) return;

            // Construct key: interest_category_subtopic (simplified for this demo)
            // We just check if TRY_CONTENT has an entry for "interest_subtopic" or "interest_category_subtopic"
            // For Physics->Gravity, we expect 'science_physics_gravity'

            // 1. Try strict key
            let key = `${interestId}_${selectedCategory}_${selectedSubtopic}`.toLowerCase().replace(/ /g, '_');
            // 2. Try simpler key if complex fails (or just hardcoded match for demo)
            if (!TRY_CONTENT[key] && interestId === 'science' && selectedSubtopic === 'Gravity') {
                key = 'science_physics_gravity';
            }

            console.log(`[TryPage] Looking for content with key: ${key}`);

            const data = TRY_CONTENT[key] || [];
            setExperiments(data);
        };

        fetchContent();
    }, [selectedSubtopic, interestId, selectedCategory]);

    return (
        <div className="animate-fade-in" style={{ display: 'flex', height: 'calc(100vh - 100px)', gap: '2rem', overflow: 'hidden' }}>

            {/* Sidebar Navigation (Reused logic from LearnPage) */}
            <div style={{ width: '280px', flexShrink: 0, overflowY: 'auto', paddingRight: '1rem', borderRight: '1px solid var(--border-color)' }}>
                <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', marginBottom: '1.5rem', padding: 0 }}>
                    <ArrowLeft size={16} /> Back to Hub
                </button>

                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem', color: '#F72585' }}>Try It Out</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>Hands-on experiments & projects.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {(!taxonomy?.categories || taxonomy.categories.length === 0) ? (
                        <div style={{ color: 'red' }}>No topics found.</div>
                    ) : (
                        taxonomy.categories.map(cat => (
                            <div key={cat.id}>
                                <div
                                    onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
                                    style={{
                                        fontWeight: 700,
                                        fontSize: '0.95rem',
                                        marginBottom: '0.75rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        color: selectedCategory === cat.id ? 'var(--text-foreground)' : 'var(--text-muted)'
                                    }}
                                >
                                    {cat.title}
                                    {selectedCategory === cat.id ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                </div>

                                {selectedCategory === cat.id && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', paddingLeft: '0.5rem', borderLeft: '2px solid var(--border-color)' }}>
                                        {cat.subtopics.map(sub => (
                                            <button
                                                key={sub}
                                                onClick={() => setSelectedSubtopic(sub)}
                                                style={{
                                                    textAlign: 'left',
                                                    background: selectedSubtopic === sub ? 'rgba(247, 37, 133, 0.1)' : 'transparent',
                                                    color: selectedSubtopic === sub ? '#F72585' : 'var(--text-muted)',
                                                    border: 'none',
                                                    padding: '0.5rem 0.75rem',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    fontSize: '0.9rem',
                                                    fontWeight: selectedSubtopic === sub ? 600 : 400,
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                {sub}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )))}
                </div>
            </div>

            {/* Main Content Area */}
            <div style={{ flex: 1, overflowY: 'auto', paddingRight: '1rem' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                    <div>
                        <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '0.5rem' }}>
                            Experiments for
                        </div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            {selectedSubtopic}
                            <Zap fill="#F72585" color="#F72585" size={32} />
                        </h1>
                    </div>
                </div>

                {/* Content Grid */}
                {experiments.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)', border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-lg)' }}>
                        <Zap size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
                        <h3>No experiments found yet.</h3>
                        <p>We are adding more projects every day! Try "Gravity" in Physics.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', paddingBottom: '2rem' }}>
                        {experiments.map((exp) => (
                            <ExperimentCard key={exp.id} experiment={exp} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TryPage;
