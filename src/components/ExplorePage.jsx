import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronRight, ChevronDown, Calendar, RefreshCw, Filter } from 'lucide-react';
import { getTaxonomy } from '../data/learningTaxonomy';
import { EventService } from '../services/eventService';
import { GeminiService } from '../services/geminiService';
import EventCard from './EventCard';

const ExplorePage = ({ interestId, onBack }) => {
    const taxonomy = getTaxonomy(interestId);

    // State
    const [selectedCategory, setSelectedCategory] = useState(taxonomy?.categories?.[0]?.id);
    const [selectedSubtopic, setSelectedSubtopic] = useState(taxonomy?.categories?.[0]?.subtopics?.[0]);
    const [events, setEvents] = useState([]);
    const [timeFilter, setTimeFilter] = useState('week'); // 'week', 'month', 'all'
    const [loading, setLoading] = useState(false);

    // Initial Load - Get Local Events
    useEffect(() => {
        loadEvents();
    }, [interestId, timeFilter]);

    const loadEvents = () => {
        const localEvents = EventService.getEvents(interestId, timeFilter);
        // Assuming we want to show all events for the interest initially, 
        // or filter by subtopic if we have one? 
        // For 'This Week' default, let's show everything for the interest.
        setEvents(localEvents);
    };

    // Live Fetch handler
    const handleFetchMore = async () => {
        if (!selectedSubtopic) return;
        setLoading(true);
        try {
            console.log(`ExplorePage: Fetching more events for ${selectedSubtopic}...`);
            const newEvents = await GeminiService.findEvents(interestId, selectedSubtopic);

            // Cache them
            const addedCount = EventService.cacheEvents(newEvents);
            console.log(`ExplorePage: Added ${addedCount} new events.`);

            // Reload from cache to update view
            loadEvents();
        } catch (err) {
            console.error("Failed to fetch events", err);
            // Optional: Show toast
        } finally {
            setLoading(false);
        }
    };

    if (!taxonomy) return <div style={{ padding: '2rem' }}>Taxonomy not found.</div>;

    return (
        <div className="animate-fade-in" style={{ display: 'flex', height: 'calc(100vh - 100px)', gap: '2rem', overflow: 'hidden' }}>

            {/* Sidebar Navigation (Reused logic, could be a shared component) */}
            <div style={{ width: '280px', flexShrink: 0, overflowY: 'auto', paddingRight: '1rem', borderRight: '1px solid var(--border-color)' }}>
                <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', marginBottom: '1.5rem', padding: 0 }}>
                    <ArrowLeft size={16} /> Back to Hub
                </button>

                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem', color: '#7209B7' }}>{taxonomy.title} Events</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>Find workshops, webinars, and more.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {taxonomy.categories && taxonomy.categories.map(cat => (
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
                                                background: selectedSubtopic === sub ? 'rgba(114, 9, 183, 0.1)' : 'transparent',
                                                color: selectedSubtopic === sub ? '#7209B7' : 'var(--text-muted)',
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
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, overflowY: 'auto', paddingRight: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Explore Events</h1>
                        <p style={{ color: 'var(--text-muted)' }}>
                            Showing events for <strong>{selectedSubtopic || 'All Topics'}</strong>
                        </p>
                    </div>

                    {/* Filters */}
                    <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--bg-card)', padding: '0.25rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                        {['week', 'month', 'all'].map(f => (
                            <button
                                key={f}
                                onClick={() => setTimeFilter(f)}
                                style={{
                                    background: timeFilter === f ? '#7209B7' : 'transparent',
                                    color: timeFilter === f ? 'white' : 'var(--text-muted)',
                                    border: 'none',
                                    borderRadius: '6px',
                                    padding: '0.4rem 0.8rem',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    textTransform: 'capitalize'
                                }}
                            >
                                {f === 'all' ? 'All Time' : `This ${f}`}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Event Grid */}
                {events.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--border-color)' }}>
                        <Calendar size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                        <h3>No events found in cache</h3>
                        <p>Try fetching live updates for <strong>{selectedSubtopic}</strong></p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                        {events.map(event => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                )}

                {/* Live Fetch Button */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', paddingBottom: '3rem' }}>
                    <button
                        onClick={handleFetchMore}
                        disabled={loading || !selectedSubtopic}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: selectedSubtopic ? '#7209B7' : 'var(--bg-muted)',
                            color: 'white',
                            padding: '0.75rem 2rem',
                            borderRadius: '50px',
                            border: 'none',
                            fontWeight: 600,
                            cursor: selectedSubtopic ? 'pointer' : 'not-allowed',
                            opacity: selectedSubtopic ? 1 : 0.6,
                            boxShadow: '0 4px 15px rgba(114, 9, 183, 0.3)'
                        }}
                    >
                        {loading ? <RefreshCw className="animate-spin" size={18} /> : <Calendar size={18} />}
                        {loading ? 'Finding Events...' : `Find Real-time Events for ${selectedSubtopic || 'Selected Topic'}`}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ExplorePage;
