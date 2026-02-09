const STORAGE_KEY = 'explorer_events';

export const EventService = {
    /**
     * Get events for a specific interest, optionally filtering by time.
     * @param {string} interestId 
     * @param {string} filter 'week', 'month', 'all'
     */
    getEvents: (interestId, filter = 'week') => {
        const allEvents = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const now = new Date();

        // 1. Filter by Interest
        let relevant = allEvents.filter(e => e.interestId === interestId);

        // 2. Hide past events (optional, maybe keep them for history but greyed out? For now hide)
        relevant = relevant.filter(e => new Date(e.endTime || e.startTime) > now);

        // 3. Apply Time Filter
        if (filter === 'week') {
            const nextWeek = new Date();
            nextWeek.setDate(now.getDate() + 7);
            relevant = relevant.filter(e => new Date(e.startTime) <= nextWeek);
        } else if (filter === 'month') {
            const nextMonth = new Date();
            nextMonth.setMonth(now.getMonth() + 1);
            relevant = relevant.filter(e => new Date(e.startTime) <= nextMonth);
        }

        return relevant.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
    },

    /**
     * Save new events to local storage, avoiding duplicates.
     */
    cacheEvents: (newEvents) => {
        const current = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const currentIds = new Set(current.map(e => e.id));

        const toAdd = newEvents.filter(e => !currentIds.has(e.id));

        if (toAdd.length > 0) {
            const updated = [...current, ...toAdd];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        }
        return toAdd.length;
    },

    /**
     * Seed some sample events if empty
     */
    seedSamples: () => {
        if (localStorage.getItem(STORAGE_KEY)) return;

        const now = new Date();
        const tomorrow = new Date(now); tomorrow.setDate(now.getDate() + 1);
        const nextWeek = new Date(now); nextWeek.setDate(now.getDate() + 5);

        const samples = [
            {
                id: 'ev_1',
                interestId: 'science', // General science
                subtopic: 'Physics',
                title: 'NASA Live: Spacewalk Coverage',
                startTime: tomorrow.toISOString(),
                endTime: new Date(tomorrow.getTime() + 3600000).toISOString(),
                location: 'Online (NASA TV)',
                eligibility: 'All Ages',
                source: 'NASA',
                link: 'https://www.nasa.gov/live',
                description: 'Watch astronauts conduct repairs on the ISS live.'
            },
            {
                id: 'ev_2',
                interestId: 'technology',
                subtopic: 'Coding',
                title: 'Global Kid Coder Hackathon',
                startTime: nextWeek.toISOString(),
                endTime: new Date(nextWeek.getTime() + 86400000).toISOString(),
                location: 'Online / DevPost',
                eligibility: 'Ages 10-14',
                source: 'DevPost',
                link: 'https://devpost.com',
                description: 'Build your first game in this weekend hackathon.'
            }
        ];

        localStorage.setItem(STORAGE_KEY, JSON.stringify(samples));
    }
};

// Initialize
EventService.seedSamples();
