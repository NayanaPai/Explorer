import React from 'react';
import { Calendar, Clock, MapPin, Users, ExternalLink } from 'lucide-react';

const EventCard = ({ event }) => {
    const startDate = new Date(event.startTime);
    const dateStr = startDate.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
    const timeStr = startDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="hover-lift" style={{
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Header strip */}
            <div style={{ background: '#7209B7', height: '6px' }}></div>

            <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#7209B7', background: 'rgba(114, 9, 183, 0.1)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                        {event.source}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{dateStr}</span>
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.3 }}>{event.title}</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={14} /> {timeStr}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <MapPin size={14} /> {event.location}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Users size={14} /> {event.eligibility}
                    </div>
                </div>

                <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', lineHeight: 1.5, flex: 1 }}>
                    {event.description}
                </p>

                <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        marginTop: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        background: 'var(--bg-main)',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--text-foreground)',
                        fontWeight: 600,
                        textDecoration: 'none',
                        border: '1px solid var(--border-color)',
                        transition: 'background 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-main)'}
                >
                    Register / Info <ExternalLink size={14} />
                </a>
            </div>
        </div>
    );
};

export default EventCard;
