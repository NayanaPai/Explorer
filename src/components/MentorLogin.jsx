import React, { useState } from 'react';
import { Mail, ArrowRight, ArrowLeft, Award, CheckCircle, Briefcase } from 'lucide-react';
import { MentorService } from '../services/mentorService';
import { INTERESTS } from '../data/interests';

const MentorLogin = ({ onLogin, onBack }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        bio: '',
        accreditations: '',
        expertise: [], // Array of interest IDs
        agreed: false
    });

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        try {
            const mentor = MentorService.login(formData.email);
            onLogin({ ...mentor, role: 'mentor' });
        } catch (err) {
            alert(err.message);
        }
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        if (!formData.agreed) {
            alert("Please attest to your qualifications.");
            return;
        }
        if (formData.expertise.length === 0) {
            alert("Please select at least one area of expertise.");
            return;
        }

        try {
            const newMentor = MentorService.register({
                name: formData.name,
                email: formData.email,
                bio: formData.bio,
                accreditations: formData.accreditations,
                expertise: formData.expertise
            });
            alert("Registration successful! You can now log in.");
            setIsRegistering(false);
            // Auto-login?
            // onLogin({ ...newMentor, role: 'mentor' });
        } catch (err) {
            alert(err.message);
        }
    };

    const toggleInterest = (id) => {
        setFormData(prev => {
            const exists = prev.expertise.includes(id);
            if (exists) {
                return { ...prev, expertise: prev.expertise.filter(i => i !== id) };
            } else {
                return { ...prev, expertise: [...prev.expertise, id] };
            }
        });
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
            <div style={{ width: '100%', maxWidth: '500px', background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
                <button onClick={onBack} style={{ background: 'transparent', border: 'none', cursor: 'pointer', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                    <ArrowLeft size={16} /> Back
                </button>

                <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem', textAlign: 'center', color: '#4361EE' }}>
                    {isRegistering ? 'Mentor Registration' : 'Mentor Sign In'}
                </h1>
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    {isRegistering ? 'Share your expertise and inspire the next generation.' : 'Welcome back, Mentor.'}
                </p>

                {isRegistering ? (
                    <form onSubmit={handleRegisterSubmit}>
                        <div style={fieldStyle}>
                            <label style={labelStyle}>Full Name</label>
                            <input
                                type="text"
                                required
                                style={inputStyle}
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div style={fieldStyle}>
                            <label style={labelStyle}>Email Address</label>
                            <input
                                type="email"
                                required
                                style={inputStyle}
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div style={fieldStyle}>
                            <label style={labelStyle}>Professional Bio (Short)</label>
                            <textarea
                                required
                                style={{ ...inputStyle, minHeight: '80px', fontFamily: 'inherit' }}
                                maxLength={200}
                                placeholder="e.g. Aerospace Engineer with 10 years experience at NASA..."
                                value={formData.bio}
                                onChange={e => setFormData({ ...formData, bio: e.target.value })}
                            />
                        </div>

                        <div style={fieldStyle}>
                            <label style={labelStyle}>Accreditations & Certifications</label>
                            <textarea
                                required
                                style={{ ...inputStyle, minHeight: '60px', fontFamily: 'inherit' }}
                                placeholder="e.g. PhD in Physics, PMP Certified..."
                                value={formData.accreditations}
                                onChange={e => setFormData({ ...formData, accreditations: e.target.value })}
                            />
                        </div>

                        <div style={fieldStyle}>
                            <label style={labelStyle}>Areas of Expertise (Select all that apply)</label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                                {INTERESTS.map(interest => (
                                    <button
                                        key={interest.id}
                                        type="button"
                                        onClick={() => toggleInterest(interest.id)}
                                        style={{
                                            padding: '0.4rem 0.8rem',
                                            borderRadius: '20px',
                                            border: `1px solid ${formData.expertise.includes(interest.id) ? '#4361EE' : 'var(--border-color)'}`,
                                            background: formData.expertise.includes(interest.id) ? 'rgba(67, 97, 238, 0.1)' : 'transparent',
                                            color: formData.expertise.includes(interest.id) ? '#4361EE' : 'var(--text-muted)',
                                            fontSize: '0.85rem',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {interest.title}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{ ...fieldStyle, display: 'flex', alignItems: 'flex-start', gap: '0.8rem', background: 'rgba(67, 97, 238, 0.05)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                            <input
                                type="checkbox"
                                id="attest"
                                required
                                checked={formData.agreed}
                                onChange={e => setFormData({ ...formData, agreed: e.target.checked })}
                                style={{ marginTop: '4px' }}
                            />
                            <label htmlFor="attest" style={{ fontSize: '0.9rem', color: 'var(--text-foreground)', lineHeight: 1.4 }}>
                                <strong>I attest</strong> that the information provided above is true and accurate. I agree to serve as a mentor and uphold the platform's safety guidelines.
                            </label>
                        </div>

                        <button type="submit" style={buttonStyle}>
                            Complete Registration <CheckCircle size={20} />
                        </button>

                        <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
                            Already registered? <span onClick={() => setIsRegistering(false)} style={{ color: '#4361EE', cursor: 'pointer', fontWeight: 600 }}>Sign In</span>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleLoginSubmit}>
                        <div style={fieldStyle}>
                            <label style={labelStyle}>Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={20} color="var(--text-muted)" style={{ position: 'absolute', top: '12px', left: '12px' }} />
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    style={{ ...inputStyle, paddingLeft: '2.5rem' }}
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" style={buttonStyle}>
                            Sign In <ArrowRight size={20} />
                        </button>

                        <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem' }}>
                            New Mentor? <span onClick={() => setIsRegistering(true)} style={{ color: '#4361EE', cursor: 'pointer', fontWeight: 600 }}>Apply Now</span>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

const fieldStyle = { marginBottom: '1.2rem' };
const labelStyle = { display: 'block', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.95rem' };
const inputStyle = {
    width: '100%',
    padding: '0.8rem',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-color)',
    background: 'var(--bg-main)',
    color: 'var(--text-foreground)',
    fontSize: '1rem'
};

const buttonStyle = {
    width: '100%',
    padding: '1rem',
    borderRadius: 'var(--radius-md)',
    background: '#4361EE',
    color: 'white',
    border: 'none',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '1rem',
    boxShadow: '0 4px 12px rgba(67, 97, 238, 0.3)'
};

export default MentorLogin;
