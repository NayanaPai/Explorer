import { useState, useEffect } from 'react'
import DiscoveryGrid from './components/DiscoveryGrid'
import QuestionFlow from './components/QuestionFlow'
import ExplorationHub from './components/ExplorationHub'
import ReturningUserDashboard from './components/ReturningUserDashboard'
import LoginSelection from './components/LoginSelection'
import ProfileSetup from './components/ProfileSetup'
import AdultLogin from './components/AdultLogin'
import AdultDashboard from './components/AdultDashboard'
import { MOCK_USER_HISTORY } from './data/userHistory'
import { useAuth } from './context/AuthContext'

function App() {
    // Auth Context
    const { user, login, logout, ROLES } = useAuth();

    // Local UI State for Onboarding Flows
    const [onboardingView, setOnboardingView] = useState('selection'); // 'selection', 'profile_setup', 'adult_login'

    // App Content State
    const [selectedInterestIds, setSelectedInterestIds] = useState([])
    const [screen, setScreen] = useState('discovery') // 'discovery', 'deepening', 'hub'

    // Restore state for returning students
    useEffect(() => {
        if (user && user.role === ROLES.STUDENT) {
            // For prototype: If user has history (mock), go to hub. Else discovery.
            // We'll assume if they logged in with profile, they might be returning.
            // Simulating "Existing Session" restore:
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
        } else {
            // Phone, School Code, QR -> Go to Profile Setup (Mock flow)
            setOnboardingView('profile_setup');
        }
    };

    const handleProfileComplete = (profileData) => {
        const newUserData = { ...profileData, id: 'student_' + Date.now() };
        login(ROLES.STUDENT, newUserData);
        // Effect will handle screen transition
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
        // Default: Selection Screen
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
        <div className="app-container" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', paddingBottom: '100px' }}>

            {/* Header / Avatar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ opacity: 0.5, fontSize: '0.9rem' }}>
                        Explorer: <strong>{user.name}</strong> {user.role === ROLES.GUEST && '(Guest)'}
                    </div>
                    {user.shareCode && (
                        <div style={{
                            background: 'var(--bg-card)',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            border: '1px dashed var(--text-muted)',
                            fontSize: '0.8rem',
                            color: 'var(--text-muted)',
                            fontFamily: 'monospace'
                        }}>
                            Code: <strong>{user.shareCode}</strong>
                        </div>
                    )}
                </div>
                <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.9rem' }}>
                    Logout
                </button>
            </div>

            <header style={{ textAlign: 'center', marginBottom: '3rem', animation: 'fadeInDown 0.8s ease-out' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem', background: 'var(--gradient-main)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 800 }}>
                    {screen === 'hub' && user.role !== ROLES.GUEST ? `Welcome back, ${user.name}!` : (screen === 'hub' ? 'Your Exploration Hub' : 'What excites you?')}
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                    {screen === 'hub' && user.role !== ROLES.GUEST
                        ? 'Ready to continue your journey?'
                        : (screen === 'hub' ? 'Dive deeper into what you love.' : (screen === 'deepening' ? 'Let\'s get a bit more specific...' : 'Pick as many interests as you like. There are no wrong answers!'))
                    }
                </p>
            </header>

            {/* Content Switcher */}
            {screen === 'hub' && user.role === ROLES.STUDENT && (
                <ReturningUserDashboard onExploreInterest={(id) => {
                    if (!selectedInterestIds.includes(id)) {
                        setSelectedInterestIds(prev => [...prev, id]);
                    }
                    // Stay on Hub for now
                }} />
            )}

            {/* Discovery Grid */}
            {screen === 'discovery' && (
                <div style={{ animation: 'fadeInUp 0.8s ease-out 0.2s backwards' }}>
                    <DiscoveryGrid
                        selectedIds={selectedInterestIds}
                        toggleInterest={(id) => setSelectedInterestIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id])}
                    />
                </div>
            )}

            {/* Question Flow */}
            {screen === 'deepening' && (
                <QuestionFlow
                    selectedIds={selectedInterestIds}
                    onComplete={() => setScreen('hub')}
                />
            )}

            {/* Standard Hub (for Guests or after deepening) */}
            {(screen === 'hub') && (
                <ExplorationHub selectedIds={selectedInterestIds} />
            )}


            {/* Floating Continue Button */}
            {screen === 'discovery' && (
                <div style={{ position: 'fixed', bottom: '2rem', left: '0', width: '100%', display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
                    <button
                        onClick={() => setScreen('deepening')}
                        disabled={selectedInterestIds.length === 0}
                        style={{
                            pointerEvents: 'auto',
                            background: 'var(--gradient-main)',
                            color: 'white',
                            padding: '1rem 3rem',
                            borderRadius: 'var(--radius-lg)',
                            fontSize: '1.2rem',
                            fontWeight: 600,
                            boxShadow: 'var(--shadow-glow)',
                            transform: selectedInterestIds.length > 0 ? 'translateY(0)' : 'translateY(100px)',
                            opacity: selectedInterestIds.length > 0 ? 1 : 0,
                            transition: 'all 0.5s var(--ease-spring)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        Continue {selectedInterestIds.length > 0 && <span>({selectedInterestIds.length})</span>}
                    </button>
                </div>
            )}
        </div>
    )
}

export default App
