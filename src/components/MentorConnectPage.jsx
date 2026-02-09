import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, UserPlus, Clock, CheckCircle, BadgeCheck, Briefcase, Award } from 'lucide-react';
import { MentorService } from '../services/mentorService';
import { MentorConnectionService } from '../services/mentorService';
import { useAuth } from '../context/AuthContext';
import { INTERESTS } from '../data/interests';

const MentorConnectPage = ({ interestId, onBack }) => {
    const { user } = useAuth();
    const [mentors, setMentors] = useState([]);
    const [connections, setConnections] = useState({});
    const interest = INTERESTS.find(i => i.id === interestId);

    useEffect(() => {
        // Load Mentors
        const allMentors = MentorService.getMentorsByInterest(interestId);
        setMentors(allMentors);

        // Load Status
        if (user) {
            const conns = MentorConnectionService.getConnections(user.id);
            setConnections(conns);
        }
    }, [interestId, user]);

    const handleConnect = (mentorId) => {
        if (!user) return;
        MentorConnectionService.sendRequest(user.id, mentorId);
        setConnections(prev => ({ ...prev, [mentorId]: 'pending' }));
    };

    // Split into sections if needed, but per requirements: distinguish connected vs to be connected
    const connectedMentors = mentors.filter(m => connections[m.id] === 'connected');
    const pendingMentors = mentors.filter(m => connections[m.id] === 'pending');
    const newMentors = mentors.filter(m => !connections[m.id]);

    return (
        <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <button onClick={onBack} style={{ background: 'var(--bg-card)', border: 'none', padding: '0.8rem', borderRadius: '50%', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}>
                    <ArrowLeft size={24} color="var(--text-foreground)" />
                </button>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 800, background: 'var(--gradient-main)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Mentors in {interest?.title}
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>Connect with experts to guide your journey.</p>
                </div>
            </div>

            {/* List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                {/* My Mentors (Connected) */}
                {connectedMentors.length > 0 && (
                    <Section title="My Mentors" mentors={connectedMentors} connections={connections} onConnect={handleConnect} />
                )}

                {/* Pending Requests */}
                {pendingMentors.length > 0 && (
                    <Section title="Pending Requests" mentors={pendingMentors} connections={connections} onConnect={handleConnect} />
                )}

                {/* Suggested Mentors */}
                <Section title="Suggested for You" mentors={newMentors} connections={connections} onConnect={handleConnect} emptyMsg="No new mentors available right now." />

            </div>
        </div>
    );
};

const Section = ({ title, mentors, connections, onConnect, emptyMsg }) => (
    <div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {title} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 400 }}>({mentors.length})</span>
        </h3>
        {mentors.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>{emptyMsg}</p>
        ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {mentors.map(mentor => (
                    <MentorCard key={mentor.id} mentor={mentor} status={connections[mentor.id]} onConnect={onConnect} />
                ))}
            </div>
        )}
    </div>
);

const MentorCard = ({ mentor, status, onConnect }) => {
    const isConnected = status === 'connected';
    const isPending = status === 'pending';

    return (
        <div className="hover-lift" style={{
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            position: 'relative',
            border: isConnected ? '2px solid #4ade80' : '1px solid transparent',
            boxShadow: 'var(--shadow-sm)'
        }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{
                    width: '60px', height: '60px', borderRadius: '50%',
                    background: 'var(--gradient-main)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.5rem', fontWeight: 700, color: 'white'
                }}>
                    {mentor.name.charAt(0)}
                </div>
                <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {mentor.name}
                        <BadgeCheck size={16} color="#4361EE" fill="white" />
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Briefcase size={14} /> {mentor.role === 'mentor' ? 'Industry Expert' : mentor.role}
                    </p>
                </div>
            </div>

            <p style={{ fontSize: '0.9rem', marginBottom: '1rem', lineHeight: 1.5 }}>
                {mentor.bio}
            </p>

            <div style={{ background: 'rgba(67, 97, 238, 0.05)', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#4361EE', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Award size={14} /> Accreditations
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-foreground)' }}>
                    {mentor.accreditations}
                </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {mentor.expertise.slice(0, 3).map(exp => (
                    <span key={exp} style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', borderRadius: '12px', background: 'var(--bg-main)', border: '1px solid var(--border-color)' }}>
                        {exp}
                    </span>
                ))}
            </div>

            <button
                onClick={() => !isConnected && !isPending && onConnect(mentor.id)}
                disabled={isConnected || isPending}
                style={{
                    width: '100%',
                    padding: '0.8rem',
                    borderRadius: 'var(--radius-md)',
                    border: isConnected ? '1px solid #4ade80' : (isPending ? '1px solid var(--text-muted)' : 'none'),
                    background: isConnected ? 'rgba(74, 222, 128, 0.1)' : (isPending ? 'transparent' : '#4361EE'),
                    color: isConnected ? '#166534' : (isPending ? 'var(--text-muted)' : 'white'),
                    fontWeight: 600,
                    cursor: isConnected || isPending ? 'default' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    transition: 'all 0.2s'
                }}
            >
                {isConnected ? (
                    <>Connected <CheckCircle size={18} /></>
                ) : isPending ? (
                    <>Request Pending <Clock size={18} /></>
                ) : (
                    <>Connect <UserPlus size={18} /></>
                )}
            </button>
        </div>
    );
};

export default MentorConnectPage;
