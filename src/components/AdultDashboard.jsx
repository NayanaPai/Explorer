import React, { useState } from 'react';
import { MOCK_USER_HISTORY } from '../data/userHistory';
import { INTERESTS } from '../data/interests';
import { useAuth } from '../context/AuthContext';
import { Activity, Heart, Calendar, MessageSquare, Shield, LogOut, Settings, Clock, Bell, Globe, AlertTriangle, Sparkles } from 'lucide-react';

const AdultDashboard = ({ onLogout }) => {
    const { reflections } = useAuth();
    const [activeTab, setActiveTab] = useState('insights'); // 'insights', 'settings'
    const [viewMode, setViewMode] = useState('parent'); // 'parent', 'teacher'

    // Linked Student Data (Mock)
    const history = MOCK_USER_HISTORY;

    // Derived Insights
    const interestsExploredCount = history.selectedInterestIds.length;
    const totalMinutes = Object.values(history.engagement).reduce((acc, curr) => acc + curr, 0);
    const hours = Math.floor(totalMinutes / 60);
    const topInterestId = Object.entries(history.engagement).sort((a, b) => b[1] - a[1])[0]?.[0];
    const topInterest = INTERESTS.find(i => i.id === topInterestId);

    // Mock Teacher Data
    const classStats = [
        { topic: 'Physics', engagement: 85, students: 12 },
        { topic: 'Music', engagement: 65, students: 8 },
        { topic: 'Biology', engagement: 45, students: 5 },
        { topic: 'Space', engagement: 95, students: 15 },
        { topic: 'Coding', engagement: 70, students: 10 }
    ];

    // Mock Settings State
    const [settings, setSettings] = useState({
        screenTimeLimit: 60, // minutes (Soft limit)
        language: 'English',
        notifications: true
    });

    return (
        <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', animation: 'fadeIn 0.5s ease-out' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', background: 'var(--gradient-main)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Enginuity Portal
                    </h1>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <button
                            onClick={() => setViewMode('parent')}
                            style={{
                                padding: '0.4rem 1rem',
                                borderRadius: '20px',
                                border: 'none',
                                background: viewMode === 'parent' ? '#4D96FF' : 'var(--bg-card)',
                                color: viewMode === 'parent' ? 'white' : 'var(--text-muted)',
                                fontWeight: 600,
                                cursor: 'pointer',
                                fontSize: '0.8rem'
                            }}
                        >
                            Parent View
                        </button>
                        <button
                            onClick={() => setViewMode('teacher')}
                            style={{
                                padding: '0.4rem 1rem',
                                borderRadius: '20px',
                                border: 'none',
                                background: viewMode === 'teacher' ? '#FF6B6B' : 'var(--bg-card)',
                                color: viewMode === 'teacher' ? 'white' : 'var(--text-muted)',
                                fontWeight: 600,
                                cursor: 'pointer',
                                fontSize: '0.8rem'
                            }}
                        >
                            Teacher View
                        </button>
                    </div>
                </div>
                <button onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: '1px solid var(--text-muted)', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', color: 'var(--text-muted)' }}>
                    <LogOut size={16} /> Logout
                </button>
            </div>

            {/* Navigation Tabs */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--bg-card-hover)' }}>
                <button
                    onClick={() => setActiveTab('insights')}
                    style={tabStyle(activeTab === 'insights')}
                >
                    <Activity size={18} /> {viewMode === 'teacher' ? 'Classroom Insights' : 'Student Insights'}
                </button>
                <button
                    onClick={() => setActiveTab('settings')}
                    style={tabStyle(activeTab === 'settings')}
                >
                    <Settings size={18} /> Safety & Guidance
                </button>
            </div>

            {/* TAB: INSIGHTS */}
            {activeTab === 'insights' && (
                <>
                    {/* Philosophy Banner */}
                    <div style={{ background: 'var(--gradient-main)', padding: '2rem', borderRadius: 'var(--radius-lg)', color: 'white', display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '3rem' }}>
                        <div style={{ flex: 1 }}>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1rem' }}>Structured Guidance for the Mind</h2>
                            <p style={{ fontSize: '1.1rem', opacity: 0.9, lineHeight: 1.5 }}>
                                Just as athletes receive coaching and early exposure, <strong>Enginuity</strong> provides the longitudinal support needed to turn curiosity into lifelong skills.
                            </p>
                        </div>
                        <Shield size={60} style={{ opacity: 0.3 }} />
                    </div>

                    {viewMode === 'teacher' ? (
                        /* TEACHER MODE: HEATMAP */
                        <section style={{ marginBottom: '3rem' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Globe size={24} /> Classroom Interest Heatmap
                            </h2>
                            <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {classStats.map((stat, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ width: '100px', fontWeight: 600, fontSize: '0.9rem' }}>{stat.topic}</div>
                                        <div style={{ flex: 1, height: '12px', background: 'var(--bg-secondary)', borderRadius: '6px', overflow: 'hidden' }}>
                                            <div style={{ width: `${stat.engagement}%`, height: '100%', background: 'var(--gradient-main)', transition: 'width 1s ease-out' }} />
                                        </div>
                                        <div style={{ width: '80px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{stat.students} kids</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ) : (
                        /* PARENT MODE: EXISTING SNAPSHOTS */
                        <>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                                <DashboardCard
                                    icon={Heart}
                                    color="#FF6B6B"
                                    title="Interests Explored"
                                    value={interestsExploredCount}
                                    label="Topics selected"
                                />
                                <DashboardCard
                                    icon={Activity}
                                    color="#4D96FF"
                                    title="Curiosity Time"
                                    value={`${hours}h ${totalMinutes % 60}m`}
                                    label="Total engagement"
                                />
                                <DashboardCard
                                    icon={Calendar}
                                    color="#6BCB77"
                                    title="Consistency"
                                    value="3 Days"
                                    label="Streak this week"
                                />
                            </div>

                            {topInterest && (
                                <section style={{ marginBottom: '3rem' }}>
                                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Current Spark ⚡</h2>
                                    <div style={{
                                        background: 'var(--bg-card)',
                                        border: `1px solid ${topInterest.color}40`,
                                        borderRadius: 'var(--radius-lg)',
                                        padding: '2rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '2rem',
                                        flexWrap: 'wrap'
                                    }}>
                                        <div style={{ background: `${topInterest.color}20`, padding: '1.5rem', borderRadius: '50%', color: topInterest.color }}>
                                            <topInterest.icon size={48} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>{topInterest.title}</h3>
                                            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                                                They are spending the most time here. They seem fascinated by <strong>{topInterest.category}</strong>.
                                            </p>
                                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                                <ActionChip text={`Ask: "What's the coolest thing you learned about ${topInterest.title}?"`} />
                                                <ActionChip text="Look up a local related event together" />
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )}
                        </>
                    )}

                    {/* AHA! MOMENTS FEED (Shared between modes) */}
                    <section style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Sparkles size={24} color="#FFD700" /> Recent "Aha!" Moments
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {reflections.map(ref => (
                                <ActionCard
                                    key={ref.id}
                                    title={ref.timestamp}
                                    text={`"${ref.text}" - Shared from ${ref.topic}`}
                                    badge="Live Student Input"
                                />
                            ))}
                            <ActionCard
                                title="Today at 4:15 PM"
                                text="'I learned that gravity isn't just pulling things down, it's actually bending space!' - Shared from Physcis: Gravity"
                                badge="New Reflection"
                            />
                            <ActionCard
                                title="Yesterday"
                                text="'The difference between a robot and a machine is the sensor-think-act loop.' - Shared from Technology: Robotics"
                            />
                        </div>
                    </section>

                    {/* Conversation Starters */}
                    <section>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <MessageSquare size={24} /> Recommended Props
                        </h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <ActionCard
                                title="Dinner Spark"
                                text="Ask: 'If you could invent anything based on what you saw today, what would it be?'"
                            />
                            <ActionCard
                                title="Weekend Quest"
                                text="Check the 'Real World Events' tab in their profile for local workshops."
                            />
                        </div>
                    </section>
                </>
            )}

            {/* TAB: SETTINGS & SAFETY */}
            {activeTab === 'settings' && (
                <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Clock size={24} /> Soft Screen Time Limits
                        </h2>
                        <div style={settingCardStyle}>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Daily Guidance Limit</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                    We'll nudge the student to take a break after this amount of time.
                                    <br /><span style={{ color: '#FF6B6B', fontSize: '0.8rem' }}>*Does not forcibly lock the device.</span>
                                </p>
                            </div>
                            <select
                                value={settings.screenTimeLimit}
                                onChange={(e) => setSettings({ ...settings, screenTimeLimit: e.target.value })}
                                style={selectStyle}
                            >
                                <option value={30}>30 Minutes</option>
                                <option value={60}>1 Hour</option>
                                <option value={90}>1.5 Hours</option>
                                <option value={120}>2 Hours</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Globe size={24} /> Language & Accessibility
                        </h2>
                        <div style={settingCardStyle}>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Preferred Content Language</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                    We will prioritize content in this language.
                                </p>
                            </div>
                            <select
                                value={settings.language}
                                onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                                style={selectStyle}
                            >
                                <option value="English">English</option>
                                <option value="Hindi">Hindi</option>
                                <option value="Spanish">Spanish</option>
                                <option value="French">French</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Bell size={24} /> Notifications
                        </h2>
                        <div style={settingCardStyle}>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Weekly Progress Report</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                    Receive a summary of interests explored and suggested activities.
                                </p>
                            </div>
                            <div
                                onClick={() => setSettings({ ...settings, notifications: !settings.notifications })}
                                style={{
                                    width: '48px', height: '24px',
                                    background: settings.notifications ? '#4D96FF' : '#ccc',
                                    borderRadius: '12px',
                                    position: 'relative',
                                    cursor: 'pointer',
                                    transition: 'background 0.2s'
                                }}
                            >
                                <div style={{
                                    width: '20px', height: '20px',
                                    background: 'white',
                                    borderRadius: '50%',
                                    position: 'absolute',
                                    top: '2px',
                                    left: settings.notifications ? '26px' : '2px',
                                    transition: 'left 0.2s'
                                }} />
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#FFEBEE', borderRadius: 'var(--radius-md)', display: 'flex', gap: '1rem', alignItems: 'start', color: '#B71C1C' }}>
                        <AlertTriangle size={24} />
                        <div>
                            <h3 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Content Safety</h3>
                            <p style={{ fontSize: '0.9rem' }}>
                                All content is pre-vetted for safety. If you see something inappropriate,
                                please use the "Report" button on the specific content item. We review all reports within 24 hours.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const tabStyle = (isActive) => ({
    padding: '1rem 2rem',
    background: 'transparent',
    border: 'none',
    borderBottom: isActive ? '3px solid var(--primary-accent)' : '3px solid transparent',
    color: isActive ? 'var(--text-foreground)' : 'var(--text-muted)',
    fontWeight: 600,
    fontSize: '1rem',
    cursor: 'pointer',
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
    transition: 'all 0.2s'
});

const settingCardStyle = {
    background: 'var(--bg-card)',
    padding: '1.5rem',
    borderRadius: 'var(--radius-md)',
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    justifyContent: 'space-between'
};

const selectStyle = {
    padding: '0.5rem 2rem 0.5rem 1rem',
    borderRadius: '4px',
    border: '1px solid var(--bg-card-hover)',
    fontSize: '1rem',
    minWidth: '150px'
};

const DashboardCard = ({ icon: Icon, color, title, value, label }) => (
    <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius-md)', borderTop: `4px solid ${color}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>{title}</h3>
            <Icon color={color} size={20} />
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.25rem' }}>{value}</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{label}</div>
    </div>
);

const ActionChip = ({ text }) => (
    <div style={{
        background: 'var(--bg-main)',
        border: '1px solid var(--text-muted)',
        padding: '0.5rem 1rem',
        borderRadius: '20px',
        fontSize: '0.9rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    }}>
        <MessageSquare size={14} /> {text}
    </div>
);

const ActionCard = ({ title, text, badge }) => (
    <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius-md)', position: 'relative' }}>
        {badge && (
            <div style={{
                position: 'absolute',
                top: '-10px',
                right: '10px',
                background: '#4D96FF',
                color: 'white',
                padding: '2px 8px',
                borderRadius: '10px',
                fontSize: '0.65rem',
                fontWeight: 800,
                boxShadow: '0 2px 5px rgba(77,150,255,0.4)'
            }}>
                {badge}
            </div>
        )}
        <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>{title}</h4>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.4 }}>{text}</p>
    </div>
);

export default AdultDashboard;
