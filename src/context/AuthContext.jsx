import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // User State: null or { id, name, role, ... }
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reflections, setReflections] = useState([]);

    // Roles
    const ROLES = {
        STUDENT: 'student',
        GUEST: 'guest',
        ADULT: 'parent_teacher',
        MENTOR: 'mentor'
    };

    // Load from local storage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('user_profile');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = (role, data) => {
        const newUser = { ...data, role };
        setUser(newUser);

        // Persist everything for the hackathon prototype to ensure a good demo experience
        // Previously we skipped ADULT persisting, but let's keep everything for smoothness
        localStorage.setItem('user_profile', JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user_profile');
    };

    const addReflection = (reflection) => {
        setReflections(prev => [
            {
                ...reflection,
                id: Date.now(),
                timestamp: 'Just now'
            },
            ...prev
        ]);
    };

    const canAccess = (feature) => {
        if (!user) return false;

        switch (feature) {
            case 'dashboard':
                return user.role === ROLES.STUDENT || user.role === ROLES.ADULT; // Adults have their own dashboard
            case 'student_dashboard':
                return user.role === ROLES.STUDENT; // Specific to returning students
            case 'adult_dashboard':
                return user.role === ROLES.ADULT;
            case 'save_progress':
                return user.role === ROLES.STUDENT;
            case 'deep_dive':
                // Adults can view deep dives? Maybe read-only.
                // Guests can view deep dives.
                return true;
            default:
                return false;
        }
    };

    const value = {
        user,
        loading,
        reflections,
        login,
        logout,
        addReflection,
        canAccess,
        ROLES
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
