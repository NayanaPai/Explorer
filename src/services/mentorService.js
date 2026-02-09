/**
 * Mentor Service
 * 
 * Manages Mentor profiles, authentication, and retrieval.
 * Stores data in localStorage for the prototype.
 */

const STORAGE_KEY = 'explorer_mentors_v1';

export const MentorService = {

    /**
     * Get all registered mentors
     */
    getAllMentors: () => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            console.error("MentorService: Failed to parse storage", e);
            return [];
        }
    },

    /**
     * Get mentors filtered by an interest ID (expertise)
     */
    getMentorsByInterest: (interestId) => {
        const all = MentorService.getAllMentors();
        return all.filter(m => m.expertise && m.expertise.includes(interestId));
    },

    /**
     * Register a new mentor
     * @returns {object} The new mentor profile
     */
    register: (profileData) => {
        const mentors = MentorService.getAllMentors();

        // Simple check for existing email
        if (mentors.find(m => m.email === profileData.email)) {
            throw new Error("Email already registered");
        }

        const newMentor = {
            id: crypto.randomUUID(),
            ...profileData,
            role: 'mentor',
            joinedAt: new Date().toISOString()
        };

        mentors.push(newMentor);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mentors));
        return newMentor;
    },

    /**
     * Login a mentor by email (Passwordless/Mock for prototype)
     */
    login: (email) => {
        const mentors = MentorService.getAllMentors();
        const mentor = mentors.find(m => m.email === email);

        if (!mentor) {
            throw new Error("Mentor not found");
        }

        return mentor;
    },

    /**
     * Seed sample mentors if none exist
     */
    seedSamples: () => {
        if (MentorService.getAllMentors().length === 0) {
            const SAMPLES = [
                {
                    name: "Dr. Elena Rossi",
                    email: "elena@science.org",
                    bio: "Marine Biologist specializing in coral reef conservation. I love showing students the wonders of the ocean.",
                    accreditations: "PhD in Marine Biology, Scripps Institution of Oceanography",
                    expertise: ["science", "nature", "animals", "climate"]
                },
                {
                    name: "Mark Chen",
                    email: "mark@tech.io",
                    bio: "Robotics Engineer at a major tech company. I build robots that help people walk.",
                    accreditations: "MS in Robotics, MIT; IEEE Senior Member",
                    expertise: ["technology", "building", "math", "games"]
                },
                {
                    name: "Sarah Jenkins",
                    email: "sarah@art.studio",
                    bio: "Professional Illustrator and Concept Artist for video games.",
                    accreditations: "BFA in Illustration, RISD",
                    expertise: ["art", "writing", "photography"]
                },
                {
                    name: "Capt. James T. Kirk (Ret.)",
                    email: "james@space.gov",
                    bio: "Retired Astronaut with 3 missions to the ISS. Let's reach for the stars!",
                    accreditations: "NASA Astronaut Corps, Air Force Pilot Wings",
                    expertise: ["space", "science", "technology"]
                },
                {
                    name: "Chef Andre",
                    email: "andre@food.com",
                    bio: "Executive Chef focused on molecular gastronomy - combining food and science!",
                    accreditations: "Le Cordon Bleu, Michelin Star Recipient",
                    expertise: ["cooking", "science", "health"]
                }
            ];

            SAMPLES.forEach(s => MentorService.register(s));
            console.log("MentorService: Seeded 5 sample mentors.");
        }
    }
};

// Auto-seed on load
MentorService.seedSamples();

/**
 * Mentor Connection Service Extension
 */
export const MentorConnectionService = {
    getKey: (studentId) => `explorer_connections_${studentId}`,

    getConnections: (studentId) => {
        try {
            const raw = localStorage.getItem(MentorConnectionService.getKey(studentId));
            return raw ? JSON.parse(raw) : {}; // { mentorId: 'pending' | 'connected' }
        } catch (e) {
            return {};
        }
    },

    getStatus: (studentId, mentorId) => {
        const conns = MentorConnectionService.getConnections(studentId);
        return conns[mentorId] || 'none';
    },

    sendRequest: (studentId, mentorId) => {
        const conns = MentorConnectionService.getConnections(studentId);
        conns[mentorId] = 'pending';
        localStorage.setItem(MentorConnectionService.getKey(studentId), JSON.stringify(conns));
        return 'pending';
    },

    // For prototype, we might auto-accept after a reload or just keep pending
};
