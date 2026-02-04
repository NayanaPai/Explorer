import React, { useState } from 'react';
import { Mail, Lock, Key, ArrowRight, ArrowLeft } from 'lucide-react';
import { validateShareCode, formatShareCode } from '../utils/idGenerator';

const AdultLogin = ({ onLogin, onBack }) => {
    const [step, setStep] = useState('login'); // 'login', 'link_student'
    const [email, setEmail] = useState('');
    const [studentCode, setStudentCode] = useState('');

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        // Mock validation
        if (email.includes('@')) {
            setStep('link_student');
        } else {
            alert('Please enter a valid mock email');
        }
    };

    const handleCodeChange = (e) => {
        const val = e.target.value;
        setStudentCode(formatShareCode(val));
    };

    const handleLinkSubmit = (e) => {
        e.preventDefault();
        if (validateShareCode(studentCode)) {
            onLogin({
                role: 'parent', // or 'teacher'
                email: email,
                linkedStudentId: 'mock_student_01'
            });
        } else {
            alert('Please enter a valid code (e.g. ABC-123-XYZ)');
        }
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
            <div style={{ width: '100%', maxWidth: '400px', background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
                <button onClick={onBack} style={{ background: 'transparent', border: 'none', cursor: 'pointer', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                    <ArrowLeft size={16} /> Back
                </button>

                <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem', textAlign: 'center' }}>
                    {step === 'login' ? 'Parent & Teacher Login' : 'Link Student Profile'}
                </h1>
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    {step === 'login' ? 'Access guidance and insights.' : 'Enter the code from the student\'s profile.'}
                </p>

                {step === 'login' && (
                    <form onSubmit={handleLoginSubmit}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={20} color="var(--text-muted)" style={{ position: 'absolute', top: '12px', left: '12px' }} />
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={inputStyle}
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" style={buttonStyle}>
                            Continue <ArrowRight size={20} />
                        </button>
                    </form>
                )}

                {step === 'link_student' && (
                    <form onSubmit={handleLinkSubmit}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Student Share Code</label>
                            <div style={{ position: 'relative' }}>
                                <Key size={20} color="var(--text-muted)" style={{ position: 'absolute', top: '12px', left: '12px' }} />
                                <input
                                    type="text"
                                    placeholder="e.g. 7X2-9K3-M2P"
                                    value={studentCode}
                                    onChange={handleCodeChange}
                                    style={{ ...inputStyle, fontFamily: 'monospace', letterSpacing: '1px' }}
                                    maxLength={11}
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" style={buttonStyle}>
                            View Dashboard <ArrowRight size={20} />
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

const inputStyle = {
    width: '100%',
    padding: '0.8rem 1rem 0.8rem 2.5rem',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--text-muted)',
    background: 'var(--bg-main)',
    color: 'var(--text-foreground)',
    fontSize: '1rem'
};

const buttonStyle = {
    width: '100%',
    padding: '1rem',
    borderRadius: 'var(--radius-md)',
    background: 'var(--text-foreground)', // Dark button for "Adult" feel
    color: 'var(--bg-main)',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem'
};

export default AdultLogin;
