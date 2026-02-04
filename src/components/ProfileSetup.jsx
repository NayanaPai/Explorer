import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, User, Globe, GraduationCap } from 'lucide-react';
import { generateShareCode } from '../utils/idGenerator';

const ProfileSetup = ({ onComplete }) => {
    const [step, setStep] = useState(1);
    const [profile, setProfile] = useState({
        language: '',
        name: '',
        grade: ''
    });

    const handleNext = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            // Generate Share Code on completion
            const shareCode = generateShareCode();
            onComplete({ ...profile, shareCode });
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const isStepValid = () => {
        if (step === 1) return profile.language !== '';
        if (step === 2) return profile.name.trim().length > 0;
        if (step === 3) return profile.grade !== '';
        return false;
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            animation: 'fadeIn 0.5s ease-out'
        }}>
            <div style={{ width: '100%', maxWidth: '500px' }}>
                {/* Progress Bar */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '3rem' }}>
                    {[1, 2, 3].map(i => (
                        <div key={i} style={{
                            flex: 1,
                            height: '6px',
                            borderRadius: '3px',
                            background: i <= step ? 'var(--gradient-main)' : 'var(--bg-card-hover)',
                            transition: 'all 0.3s'
                        }} />
                    ))}
                </div>

                {/* Step 1: Language */}
                {step === 1 && (
                    <div style={stepContainerStyle}>
                        <Globe size={48} color="var(--primary-accent)" style={{ marginBottom: '1rem' }} />
                        <h2 style={titleStyle}>First, pick your language</h2>
                        <div style={gridStyle}>
                            {['English', 'Hindi', 'Spanish', 'French'].map(lang => (
                                <button
                                    key={lang}
                                    onClick={() => setProfile({ ...profile, language: lang })}
                                    style={optionButtonStyle(profile.language === lang)}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2: Name */}
                {step === 2 && (
                    <div style={stepContainerStyle}>
                        <User size={48} color="var(--primary-accent)" style={{ marginBottom: '1rem' }} />
                        <h2 style={titleStyle}>What should we call you?</h2>
                        <input
                            type="text"
                            placeholder="Type your nickname..."
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            style={inputStyle}
                            autoFocus
                        />
                        <p style={{ color: 'var(--text-muted)', marginTop: '1rem', fontSize: '0.9rem' }}>
                            You don't need to use your real name if you don't want to!
                        </p>
                    </div>
                )}

                {/* Step 3: Grade */}
                {step === 3 && (
                    <div style={stepContainerStyle}>
                        <GraduationCap size={48} color="var(--primary-accent)" style={{ marginBottom: '1rem' }} />
                        <h2 style={titleStyle}>Which grade are you in?</h2>
                        <div style={gridStyle}>
                            {['6th Grade', '7th Grade', '8th Grade', '9th Grade'].map(grade => (
                                <button
                                    key={grade}
                                    onClick={() => setProfile({ ...profile, grade })}
                                    style={optionButtonStyle(profile.grade === grade)}
                                >
                                    {grade}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Navigation */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
                    {step > 1 ? (
                        <button onClick={handleBack} style={navButtonStyle}>
                            <ChevronLeft size={20} /> Back
                        </button>
                    ) : <div></div>}

                    <button
                        onClick={handleNext}
                        disabled={!isStepValid()}
                        style={{
                            ...navButtonStyle,
                            background: isStepValid() ? 'var(--gradient-main)' : 'var(--bg-card-hover)',
                            color: isStepValid() ? 'white' : 'var(--text-muted)',
                            cursor: isStepValid() ? 'pointer' : 'not-allowed',
                            padding: '1rem 2rem'
                        }}
                    >
                        {step === 3 ? 'Start Exploring' : 'Next'}
                        {step === 3 ? <Check size={20} /> : <ChevronRight size={20} />}
                    </button>
                </div>
            </div>
        </div>
    );
};

const stepContainerStyle = {
    textAlign: 'center',
    animation: 'fadeInUp 0.5s ease-out'
};

const titleStyle = {
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: '2rem'
};

const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem'
};

const optionButtonStyle = (isSelected) => ({
    background: isSelected ? 'var(--primary-accent)' : 'var(--bg-card)',
    color: isSelected ? 'white' : 'var(--text-foreground)',
    border: isSelected ? 'none' : '2px solid transparent',
    padding: '1.5rem',
    borderRadius: 'var(--radius-md)',
    fontSize: '1.1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: isSelected ? 'var(--shadow-glow)' : 'none'
});

const inputStyle = {
    width: '100%',
    padding: '1.5rem',
    fontSize: '1.5rem',
    borderRadius: 'var(--radius-md)',
    border: '2px solid var(--bg-card-hover)',
    background: 'var(--bg-card)',
    color: 'var(--text-foreground)',
    textAlign: 'center',
    outline: 'none',
    transition: 'border-color 0.2s'
};

const navButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'transparent',
    border: 'none',
    color: 'var(--text-foreground)',
    fontSize: '1.1rem',
    fontWeight: 600,
    cursor: 'pointer',
    padding: '1rem',
    borderRadius: 'var(--radius-md)'
};

export default ProfileSetup;
