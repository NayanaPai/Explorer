import { useState, useEffect } from 'react'
import { INTERESTS } from './data/interests'
import DiscoveryGrid from './components/DiscoveryGrid'
import QuestionFlow from './components/QuestionFlow'
import ExplorationHub from './components/ExplorationHub'
import ReturningUserDashboard from './components/ReturningUserDashboard'
import LoginSelection from './components/LoginSelection'
import ProfileSetup from './components/ProfileSetup'
import AdultLogin from './components/AdultLogin'
import AdultDashboard from './components/AdultDashboard'
import ProfileModal from './components/ProfileModal'
import MentorLogin from './components/MentorLogin'
import { MOCK_USER_HISTORY } from './data/userHistory'
import { useAuth } from './context/AuthContext'
import ThemeToggle from './components/ThemeToggle'
import MentorConnectPage from './components/MentorConnectPage'
import LearnPage from './components/LearnPage'
import ExplorePage from './components/ExplorePage'
import TryPage from './components/TryPage'

function App() {
    // Auth Context
    const { user, login, logout, ROLES } = useAuth();

    // Local UI State for Onboarding Flows
    const [onboardingView, setOnboardingView] = useState('selection'); // 'selection', 'profile_setup', 'adult_login'

    // App Content State
    const [selectedInterestIds, setSelectedInterestIds] = useState([])
    const [screen, setScreen] = useState('discovery') // 'discovery', 'deepening', 'hub', 'mentors', 'learn', 'explore', 'try'
    const [mentorInterestId, setMentorInterestId] = useState(null);
    const [learnInterestId, setLearnInterestId] = useState(null);
    const [exploreInterestId, setExploreInterestId] = useState(null);
    const [tryInterestId, setTryInterestId] = useState(null);
    const [showProfile, setShowProfile] = useState(false)

    // Restore state for returning students
    useEffect(() => {
        if (user && user.role === ROLES.STUDENT) {
            // For prototype: If user has history (mock), go to hub. Else discovery.
            setScreen('hub');
            setSelectedInterestIds(MOCK_USER_HISTORY.selectedInterestIds);
        } else if (user && user.role === ROLES.GUEST) {
            setScreen('discovery');
            setSelectedInterestIds([]);
        }
    }, [user, ROLES]);


    // Handlers
    const handleLoginMethodSelect = (method) => {
        if (method === 'adult') {
            setOnboardingView('adult_login');
        } else if (method === 'mentor') {
            setOnboardingView('mentor_login');
        } else {
            setOnboardingView('profile_setup');
        }
    };

    const handleProfileComplete = (profileData) => {
        const newUserData = { ...profileData, id: 'student_' + Date.now() };
        login(ROLES.STUDENT, newUserData);
    };

    const handleAdultLogin = (adultData) => {
        login(ROLES.ADULT, adultData);
    };

    const handleLogout = () => {
        logout();
        setScreen('discovery');
        setSelectedInterestIds([]);
        setOnboardingView('selection');
    };

    // --- RENDER LOGIC ---

    // 1. Unauthenticated Flows
    if (!user) {
        if (onboardingView === 'profile_setup') {
            return <ProfileSetup onComplete={handleProfileComplete} />;
        }
        if (onboardingView === 'adult_login') {
            return <AdultLogin onLogin={handleAdultLogin} onBack={() => setOnboardingView('selection')} />;
        }
        if (onboardingView === 'mentor_login') {
            return <MentorLogin onLogin={(data) => login(ROLES.MENTOR, data)} onBack={() => setOnboardingView('selection')} />;
        }
        return (
            <LoginSelection
                onSelectMethod={handleLoginMethodSelect}
                onGuestAccess={() => login(ROLES.GUEST, { name: 'Guest', grade: 'N/A' })}
            />
        );
    }

    // 2. Authenticated: Adult Dashboard
    if (user.role === ROLES.ADULT) {
        return <AdultDashboard onLogout={handleLogout} />;
    }

    // 3. Authenticated: Student / Guest App
    return (
        <div className="container animate-fade-in" style={{ paddingBottom: '100px' }}>

            {/* Header / Avatar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                        onClick={() => setShowProfile(true)}
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'var(--gradient-main)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'transform 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>{user.name.charAt(0)}</span>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                            {user.name} {user.role === ROLES.GUEST && '(Guest)'}
                        </div>
                        {user.shareCode && (
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                                Code: {user.shareCode}
                            </div>
                        )}
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <ThemeToggle />
                    <button
                        onClick={handleLogout}
                        className="hover-lift"
                        style={{
                            background: 'rgba(255,255,255,0.05)',
                            padding: '0.5rem 1rem',
                            borderRadius: 'var(--radius-sm)',
                            color: 'var(--text-muted)',
                            fontSize: '0.85rem',
                            fontWeight: 500
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div >

            <header style={{ textAlign: 'center', marginBottom: '3rem', animation: 'fadeInDown 0.8s ease-out' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <span style={{
                        background: 'rgba(77, 150, 255, 0.1)',
                        color: '#4D96FF',
                        padding: '0.4rem 1rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        letterSpacing: '1px',
                        textTransform: 'uppercase'
                    }}>
                        Expand Your Horizon
                    </span>
                </div>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', background: 'var(--gradient-main)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 800 }}>
                    {screen === 'hub' && user.role !== ROLES.GUEST ? `Enginuity for ${user.name}` : (screen === 'hub' ? 'Enginuity Hub' : 'Discover Your Enginuity')}
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.5 }}>
                    {screen === 'hub' && user.role !== ROLES.GUEST
                        ? 'Building your knowledge-base, one spark at a time. Your journey continues here.'
                        : (screen === 'hub' ? 'Personalized exposure to careers, skills, and community.' : (screen === 'deepening' ? 'Narrowing down your path to a structured pursuit.' : 'Exposure leads to interest. Interest leads to passion. Passion leads to purpose.'))
                    }
                </p>
            </header>

            {/* Profile Modal */}
            {
                showProfile && (
                    <ProfileModal
                        user={{ ...user, selectedInterestIds }}
                        onClose={() => setShowProfile(false)}
                    />
                )
            }

            {/* Content Switcher */}
            {
                screen === 'hub' && user.role === ROLES.STUDENT && (
                    <ReturningUserDashboard onExploreInterest={(id) => {
                        if (!selectedInterestIds.includes(id)) {
                            setSelectedInterestIds(prev => [...prev, id]);
                        }
                    }} />
                )
            }

            {/* Discovery Grid */}
            {
                screen === 'discovery' && (
                    <div style={{ animation: 'fadeInUp 0.8s ease-out 0.2s backwards' }}>
                        <DiscoveryGrid
                            selectedIds={selectedInterestIds}
                            toggleInterest={(id) => setSelectedInterestIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id])}
                        />
                    </div>
                )
            }

            {/* Question Flow */}
            {
                screen === 'deepening' && (
                    <QuestionFlow
                        selectedIds={selectedInterestIds}
                        onComplete={() => setScreen('hub')}
                    />
                )
            }

            {/* Standard Hub */}
            {
                (screen === 'hub') && (
                    <ExplorationHub
                        selectedIds={selectedInterestIds}
                        onExploreMentors={(id) => {
                            setMentorInterestId(id);
                            setScreen('mentors');
                        }}
                        onExploreLearn={(id) => {
                            setLearnInterestId(id);
                            setScreen('learn');
                        }}
                        onExploreEvents={(id) => {
                            setExploreInterestId(id);
                            setScreen('explore');
                        }}
                        onExploreTry={(id) => {
                            setTryInterestId(id);
                            setScreen('try');
                        }}
                    />
                )
            }

            {/* Sub-Pages */}
            {
                (screen === 'mentors') && (
                    <MentorConnectPage
                        interestId={mentorInterestId}
                        onBack={() => setScreen('hub')}
                    />
                )
            }
            {
                (screen === 'learn') && (
                    <LearnPage
                        interestId={learnInterestId}
                        onBack={() => setScreen('hub')}
                    />
                )
            }
            {
                (screen === 'explore') && (
                    <ExplorePage
                        interestId={exploreInterestId}
                        onBack={() => setScreen('hub')}
                    />
                )
            }
            {
                (screen === 'try') && (
                    <TryPage
                        interestId={tryInterestId}
                        onBack={() => setScreen('hub')}
                    />
                )
            }

            {/* Modern Selection Dock (Onboarding) */}
            {
                screen === 'discovery' && selectedInterestIds.length > 0 && (
                    <div style={{
                        position: 'fixed',
                        bottom: '2rem',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '90%',
                        maxWidth: '800px',
                        background: 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(20px)',
                        padding: '1rem 2rem',
                        borderRadius: 'var(--radius-lg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(255,255,255,0.4)',
                        zIndex: 1000,
                        animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                {selectedInterestIds.slice(0, 5).map((id, idx) => {
                                    const interest = INTERESTS.find(i => i.id === id);
                                    return (
                                        <div
                                            key={id}
                                            style={{
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '50%',
                                                background: interest.color,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: '2px solid white',
                                                marginLeft: idx > 0 ? '-10px' : '0',
                                                color: 'white',
                                                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                                            }}
                                        >
                                            <interest.icon size={16} />
                                        </div>
                                    );
                                })}
                                {selectedInterestIds.length > 5 && (
                                    <div style={{ marginLeft: '5px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                                        +{selectedInterestIds.length - 5}
                                    </div>
                                )}
                            </div>
                            <div style={{ borderLeft: '1px solid #ddd', paddingLeft: '1rem' }}>
                                <div style={{ fontWeight: 700, fontSize: '1rem' }}>{selectedInterestIds.length} Spark{selectedInterestIds.length > 1 ? 's' : ''} Selected</div>
                                <button
                                    onClick={() => setSelectedInterestIds([])}
                                    style={{ background: 'transparent', border: 'none', color: '#ff6b6b', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', padding: 0 }}
                                >
                                    Clear all
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={() => setScreen('deepening')}
                            style={{
                                background: 'var(--gradient-main)',
                                color: 'white',
                                padding: '1rem 2.5rem',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '1.1rem',
                                fontWeight: 700,
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                boxShadow: 'var(--shadow-glow)'
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05) translateY(-2px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1) translateY(0)'}
                        >
                            Next: Refine Sparks &rarr;
                        </button>
                    </div>
                )
            }
        </div>
    );
}

export default App
