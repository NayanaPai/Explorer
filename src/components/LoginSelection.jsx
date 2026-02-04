import React from 'react';
import { Smartphone, School, QrCode, User, ArrowRight } from 'lucide-react';

const LoginSelection = ({ onSelectMethod, onGuestAccess }) => {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            animation: 'fadeIn 0.8s ease-out'
        }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{
                    fontSize: '2.5rem',
                    marginBottom: '1rem',
                    background: 'var(--gradient-main)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 800
                }}>
                    Hello! Who are you?
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
                    Choose how you want to start.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.5rem',
                width: '100%',
                maxWidth: '800px',
                marginBottom: '3rem'
            }}>
                {/* Option 1: Phone */}
                <button
                    onClick={() => onSelectMethod('phone')}
                    style={optionStyle}
                >
                    <div style={iconContainerStyle('#4D96FF')}>
                        <Smartphone size={32} color="white" />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Phone Number</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Get a code on your phone</p>
                    </div>
                </button>

                {/* Option 2: School Code */}
                <button
                    onClick={() => onSelectMethod('school')}
                    style={optionStyle}
                >
                    <div style={iconContainerStyle('#FF6B6B')}>
                        <School size={32} color="white" />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>School Code</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Use the code from your teacher</p>
                    </div>
                </button>

                {/* Option 3: QR Code */}
                <button
                    onClick={() => onSelectMethod('qr')}
                    style={optionStyle}
                >
                    <div style={iconContainerStyle('#6BCB77')}>
                        <QrCode size={32} color="white" />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Scan QR Badge</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Use your printed badge</p>
                    </div>
                </button>
            </div>

            {/* Guest Option */}
            <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', alignItems: 'center' }}>
                <button
                    onClick={onGuestAccess}
                    style={{
                        background: 'transparent',
                        border: '2px solid var(--text-muted)',
                        color: 'var(--text-muted)',
                        padding: '1rem 3rem',
                        borderRadius: 'var(--radius-lg)',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.2s',
                        cursor: 'pointer'
                    }}
                >
                    <User size={20} />
                    Explore as Guest
                </button>

                <button
                    onClick={() => onSelectMethod('adult')}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-muted)',
                        padding: '0.5rem',
                        fontSize: '0.9rem',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        opacity: 0.8
                    }}
                >
                    I am a Parent or Teacher
                </button>
            </div>
        </div>
    );
};

const optionStyle = {
    background: 'var(--bg-card)',
    border: 'none',
    borderRadius: 'var(--radius-lg)',
    padding: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: 'var(--shadow-sm)',
    textAlign: 'left',
    width: '100%'
};

const iconContainerStyle = (color) => ({
    background: color,
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
});

export default LoginSelection;
