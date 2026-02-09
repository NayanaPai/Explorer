import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronRight, ChevronDown, Bell, Search, Loader, Sparkles } from 'lucide-react';
import { getTaxonomy } from '../data/learningTaxonomy';
import { CurationAgent } from '../agent/curationAgent';
import ArticleCard from './ArticleCard';

const LearnPage = ({ interestId, onBack }) => {
    console.log("LearnPage mounted with interestId:", interestId);
    const taxonomy = getTaxonomy(interestId);
    console.log("Taxonomy resolved:", taxonomy);

    if (!taxonomy) {
        return <div style={{ padding: '2rem', color: 'red' }}>Error: Taxonomy not found for {interestId}</div>;
    }

    // State
    const [selectedCategory, setSelectedCategory] = useState(taxonomy?.categories?.[0]?.id || null);
    const [selectedSubtopic, setSelectedSubtopic] = useState(taxonomy?.categories?.[0]?.subtopics?.[0] || null);

    useEffect(() => {
        if (taxonomy && !selectedCategory && taxonomy.categories?.length > 0) {
            console.log("Setting default category/topic from taxonomy", taxonomy);
            setSelectedCategory(taxonomy.categories[0].id);
            setSelectedSubtopic(taxonomy.categories[0].subtopics[0]);
        }
    }, [taxonomy, selectedCategory]);

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [followedTopics, setFollowedTopics] = useState([]);
    const [localTaxonomy, setLocalTaxonomy] = useState(taxonomy);
    const [expanding, setExpanding] = useState(false);

    // Sync local state when taxonomy changes (e.g. initial load)
    useEffect(() => {
        setLocalTaxonomy(taxonomy);
    }, [taxonomy]);

    // Fetch Articles when Subtopic changes
    useEffect(() => {
        const fetchArticles = async () => {
            if (!selectedSubtopic) return;

            setLoading(true);
            setArticles([]); // Clear previous

            try {
                // Call real Agent
                console.log(`LearnPage: Fetching articles for ${selectedSubtopic}...`);
                const data = await CurationAgent.generateArticles(interestId, selectedSubtopic);

                if (Array.isArray(data)) {
                    setArticles(data);
                } else {
                    console.error("[LearnPage] Received data is NOT an array:", data);
                    setArticles([]);
                }
            } catch (err) {
                console.error("Failed to fetch articles", err);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [selectedSubtopic, interestId]);

    const handleLoadMoreTopics = async () => {
        if (!selectedCategory) return;
        setExpanding(true);
        try {
            // Collect all current subtopics to avoid duplicates
            const currentSubtopics = localTaxonomy.categories.flatMap(c => c.subtopics);

            const newTopics = await import('../services/geminiService').then(m => m.GeminiService.expandTaxonomy(interestId, currentSubtopics));

            // Add to current category
            setLocalTaxonomy(prev => {
                const newCats = prev.categories.map(c => {
                    if (c.id === selectedCategory) {
                        return { ...c, subtopics: [...c.subtopics, ...newTopics] };
                    }
                    return c;
                });
                return { ...prev, categories: newCats };
            });
        } catch (err) {
            console.error("Failed to expand taxonomy", err);
        } finally {
            setExpanding(false);
        }
    };

    const toggleFollow = () => {
        setFollowedTopics(prev => {
            if (prev.includes(selectedSubtopic)) return prev.filter(t => t !== selectedSubtopic);
            return [...prev, selectedSubtopic];
        });
    };

    const isFollowing = followedTopics.includes(selectedSubtopic);

    return (
        <div className="animate-fade-in" style={{ display: 'flex', height: 'calc(100vh - 100px)', gap: '2rem', overflow: 'hidden' }}>

            {/* Sidebar Navigation */}
            <div style={{ width: '280px', flexShrink: 0, overflowY: 'auto', paddingRight: '1rem', borderRight: '1px solid var(--border-color)' }}>
                <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', marginBottom: '1.5rem', padding: 0 }}>
                    <ArrowLeft size={16} /> Back to Hub
                </button>

                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem', color: '#4361EE' }}>{localTaxonomy?.title || 'Learning'}</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>Pick a topic to start learning.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {(!localTaxonomy?.categories || localTaxonomy.categories.length === 0) ? (
                        <div style={{ color: 'red' }}>No topics found for this interest.</div>
                    ) : (
                        localTaxonomy.categories.map(cat => (
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
                                                    background: selectedSubtopic === sub ? 'rgba(67, 97, 238, 0.1)' : 'transparent',
                                                    color: selectedSubtopic === sub ? '#4361EE' : 'var(--text-muted)',
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

                    {/* Load More Button */}
                    <button
                        onClick={handleLoadMoreTopics}
                        disabled={expanding}
                        style={{
                            marginTop: '1rem',
                            padding: '0.5rem',
                            background: 'rgba(67, 97, 238, 0.05)',
                            color: '#4361EE',
                            border: '1px dashed #4361EE',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        {expanding ? <Loader size={12} className="animate-spin" /> : <Sparkles size={12} />}
                        {expanding ? 'Generating...' : 'Load More Topics'}
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div style={{ flex: 1, overflowY: 'auto', paddingRight: '1rem' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                    <div>
                        <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '0.5rem' }}>
                            Currently Learning
                        </div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0 }}>
                            {selectedSubtopic}
                        </h1>
                    </div>
                    <button
                        onClick={toggleFollow}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.75rem 1.25rem',
                            borderRadius: '50px',
                            border: isFollowing ? '1px solid #4361EE' : '1px solid var(--border-color)',
                            background: isFollowing ? 'rgba(67, 97, 238, 0.1)' : 'white',
                            color: isFollowing ? '#4361EE' : 'var(--text-muted)',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        <Bell size={18} fill={isFollowing ? "#4361EE" : "none"} />
                        {isFollowing ? 'Following' : 'Follow Topic'}
                    </button>
                </div>

                {/* Content Grid */}
                {loading ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '400px', gap: '1rem', color: 'var(--text-muted)' }}>
                        <Loader className="animate-spin" size={32} color="#4361EE" />
                        <p>Curating the best content for you...</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', paddingBottom: '2rem' }}>
                        {articles.map((article, idx) => (
                            <ArticleCard key={idx} article={article} />
                        ))}

                        {/* Agent Trigger Card */}
                        <div style={{
                            border: '2px dashed var(--border-color)',
                            borderRadius: 'var(--radius-lg)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '2rem',
                            textAlign: 'center',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            minHeight: '200px'
                        }}>
                            <Sparkles size={32} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Want to know more?</h3>
                            <p style={{ fontSize: '0.9rem' }}>Ask the AI Agent to find something specific.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LearnPage;
