// Simulate a user who has visited before
export const MOCK_USER_HISTORY = {
    // Interests they previously selected
    selectedInterestIds: ['science', 'space', 'art'],

    // Activities they started but didn't finish
    incompleteActivities: [
        {
            id: 'act_01',
            interestId: 'science',
            title: 'Make a Volcano',
            type: 'try', // learn, try, see, ask
            progress: 0.4, // 40% complete
            lastAccessed: '2 days ago'
        }
    ],

    // Content they fully consumed
    completedContent: [
        'see_space_01', // watched a video about planets
        'learn_art_01'  // read about color theory
    ],

    // Engagement metrics (time spent in minutes)
    engagement: {
        science: 120, // High engagement -> "Go Deeper"
        space: 45,
        art: 15
    },

    // Pending mentor replies
    mentorReplies: [
        {
            interestId: 'space',
            question: "How do stars die?",
            preview: "Great question! Stars run out of fuel and..."
        }
    ]
};
