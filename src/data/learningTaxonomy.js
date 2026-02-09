export const LEARNING_TAXONOMY = {
    science: {
        title: "Science & Experiments",
        categories: [
            {
                id: 'physics',
                title: 'Physics',
                subtopics: ['Gravity', 'Motion', 'Energy', 'Light', 'Sound', 'Magnetism', 'Electricity', 'Forces', 'Matter', 'Atoms']
            },
            {
                id: 'biology',
                title: 'Biology',
                subtopics: ['Cells', 'Genetics', 'Evolution', 'Ecosystems', 'Human Body', 'Plants', 'Animals', 'Microbes', 'Marine Life', 'Botany']
            },
            {
                id: 'chemistry',
                title: 'Chemistry',
                subtopics: ['Elements', 'Reactions', 'Acids & Bases', 'Polymers', 'Crystals', 'States of Matter', 'Periodic Table', 'Molecules', 'Organic Chemistry', 'Forensics']
            }
        ]
    },
    technology: {
        title: "Technology & Gadgets",
        categories: [
            {
                id: 'coding',
                title: 'Coding',
                subtopics: ['Python', 'JavaScript', 'Game Dev', 'Web Design', 'Algorithms', 'Apps', 'Cybersecurity', 'AI', 'Databases', 'Cloud']
            },
            {
                id: 'robotics',
                title: 'Robotics',
                subtopics: ['Sensors', 'Motors', 'Automation', 'Drones', 'Humanoids', 'Industrial Robots', 'Space Rovers', 'BattleBots', 'Circuits', 'Arduino']
            }
        ]
    },
    space: {
        title: "Space & Astronomy",
        categories: [
            {
                id: 'solar_system',
                title: 'Solar System',
                subtopics: ['Sun', 'Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto & Dwarfs']
            },
            {
                id: 'exploration',
                title: 'Space Exploration',
                subtopics: ['Rockets', 'ISS', 'Apollo Missions', 'Mars Rovers', 'Satellites', 'Space Suits', 'Future Travel', 'SpaceX', 'Telescopes', 'Astronauts']
            }
        ]
    },
    art: {
        title: "Art & Drawing",
        categories: [
            {
                id: 'techniques',
                title: 'Techniques',
                subtopics: ['Sketching', 'Shading', 'Perspective', 'Color Theory', 'Composition', 'Digital Art', 'Watercolor', 'Oil Painting', 'Proportions', 'Mixed Media']
            },
            {
                id: 'history',
                title: 'Art History',
                subtopics: ['Renaissance', 'Impressionism', 'Modern Art', 'Surrealism', 'Abstract', 'Pop Art', 'Ancient Art', 'Famous Artists', 'Sculpture', 'Architecture']
            }
        ]
    },
    math: {
        title: "Math & Logic",
        categories: [
            { id: 'puzzles', title: 'Puzzles', subtopics: ['Sudoku', 'Logic Grids', 'Riddles', 'Magic Squares', 'Brain Teasers', 'Patterns', 'Mazes', 'Binary Code', 'Cryptography', 'Optical Illusions'] },
            { id: 'concepts', title: 'Concepts', subtopics: ['Geometry', 'Fractions', 'Algebra', 'Probability', 'Infinity', 'Pi', 'Golden Ratio', 'Fibonacci', 'Prime Numbers', 'Measurements'] }
        ]
    },
    nature: {
        title: "Nature & Environment",
        categories: [
            { id: 'ecosystems', title: 'Ecosystems', subtopics: ['Rainforests', 'Deserts', 'Oceans', 'Tundras', 'Coral Reefs', 'Wetlands', 'Mountains', 'Savannas', 'Forests', 'Caves'] },
            { id: 'conservation', title: 'Conservation', subtopics: ['Recycling', 'Climate Change', 'Endangered Species', 'Renewable Energy', 'Pollution', 'Sustainability', 'Composting', 'Water Saving', 'Plastic Free', 'Habitat Protection'] }
        ]
    },
    music: {
        title: "Music & Sound",
        categories: [
            { id: 'instruments', title: 'Instruments', subtopics: ['Piano', 'Guitar', 'Drums', 'Violin', 'Synthesizers', 'Ukulele', 'Flute', 'Brass', 'Percussion', 'Electronic'] },
            { id: 'theory', title: 'Theory & Styles', subtopics: ['Rhythm', 'Melody', 'Harmony', 'Scales', 'Classical', 'Jazz', 'Rock', 'Pop', 'Hip Hop', 'World Music'] }
        ]
    },
    dance: {
        title: "Dance & Movement",
        categories: [
            { id: 'styles', title: 'Styles', subtopics: ['Ballet', 'Hip Hop', 'Jazz', 'Tap', 'Contemporary', 'Salsa', 'Breakdancing', 'Folk Dance', 'Ballroom', 'K-Pop'] },
            { id: 'choreography', title: 'Choreography', subtopics: ['Rhythm', 'Formation', 'Improvisation', 'Storytelling', 'Fitness', 'Flexibility', 'Coordination', 'Performance', 'Costumes', 'Music Videos'] }
        ]
    },
    sports: {
        title: "Sports & Fitness",
        categories: [
            { id: 'team', title: 'Team Sports', subtopics: ['Soccer', 'Basketball', 'Baseball', 'Volleyball', 'Football', 'Hockey', 'Rugby', 'Cricket', 'Ultimate Frisbee', 'Water Polo'] },
            { id: 'solo', title: 'Individual', subtopics: ['Running', 'Swimming', 'Gymnastics', 'Tennis', 'Martial Arts', 'Cycling', 'Skateboarding', 'Rock Climbing', 'Yoga', 'Golf'] }
        ]
    },
    games: {
        title: "Games & Strategy",
        categories: [
            { id: 'board', title: 'Tabletop', subtopics: ['Chess', 'Checkers', 'Monopoly Strategy', 'Catan', 'D&D', 'Card Games', 'Go', 'Backgammon', 'Risk', 'Scrabble'] },
            { id: 'video', title: 'Video Games', subtopics: ['Game Design', 'Minecraft Redstone', 'Speedrunning', 'Esports', 'Strategy Games', 'RPGs', 'Level Design', 'Character Creation', 'Game Physics', 'History of Games'] }
        ]
    },
    writing: {
        title: "Storytelling & Writing",
        categories: [
            { id: 'fiction', title: 'Fiction', subtopics: ['Fantasy', 'Sci-Fi', 'Mystery', 'Adventure', 'Character Development', 'World Building', 'Plot Twists', 'Dialogue', 'Heroes & Villains', 'Short Stories'] },
            { id: 'nonfiction', title: 'Non-Fiction', subtopics: ['Journalism', 'Biographies', 'Essays', 'Blogging', 'Persuasive Writing', 'Poetry', 'Screenwriting', 'Comics', 'Diaries', 'Speeches'] }
        ]
    },
    drama: {
        title: "Drama & Acting",
        categories: [
            { id: 'acting', title: 'Acting', subtopics: ['Improv', 'Monologues', 'Voice Acting', 'Method Acting', 'Emotional Range', 'Comedy', 'Stage Presence', 'Auditions', 'Character Study', 'Mime'] },
            { id: 'production', title: 'Production', subtopics: ['Directing', 'Set Design', 'Costumes', 'Lighting', 'Sound Effects', 'Script Analysis', 'Stage Management', 'Makeup', 'Props', 'Special Effects'] }
        ]
    },
    history: {
        title: "History & Civilizations",
        categories: [
            { id: 'ancient', title: 'Ancient World', subtopics: ['Egypt', 'Rome', 'Greece', 'Mayans', 'Vikings', 'China', 'Mesopotamia', 'Incas', 'Aztecs', 'Celts'] },
            { id: 'eras', title: 'Eras & Events', subtopics: ['Middle Ages', 'Renaissance', 'Industrial Revolution', 'World Wars', 'Explorers', 'Inventions', 'Civil Rights', 'Gold Rush', 'Space Race', 'Castles'] }
        ]
    },
    geography: {
        title: "Geography & Cultures",
        categories: [
            { id: 'places', title: 'Places', subtopics: ['Continents', 'Oceans', 'Capitals', 'Landmarks', 'Mountains', 'Rivers', 'Deserts', 'Islands', 'Volcanoes', 'Maps'] },
            { id: 'cultures', title: 'Cultures', subtopics: ['Languages', 'Foods', 'Clothing', 'Festivals', 'Traditions', 'Flags', 'Religions', 'Music', 'Folklore', 'Daily Life'] }
        ]
    },
    helping: {
        title: "Helping People",
        categories: [
            { id: 'community', title: 'Community', subtopics: ['Volunteering', 'Charity', 'Food Banks', 'Animal Shelters', 'Teaching', 'First Aid', 'Accessibility', 'Fundraising', 'Mentoring', 'Leadership'] },
            { id: 'social', title: 'Social Issues', subtopics: ['Empathy', 'Kindness', 'Inclusion', 'Bullying Prevention', 'Human Rights', 'Environment', 'Poverty', 'Health', 'Education', 'Peace'] }
        ]
    },
    animals: {
        title: "Animals & Wildlife",
        categories: [
            { id: 'wild', title: 'Wild Animals', subtopics: ['Lions', 'Tigers', 'Elephants', 'Bears', 'Wolves', 'Whales', 'Sharks', 'Eagles', 'Reptiles', 'Insects'] },
            { id: 'pets', title: 'Pets & Care', subtopics: ['Dogs', 'Cats', 'Horses', 'Hamsters', 'Fish', 'Birds', 'Veterinary Science', 'Training', 'Breeds', 'Animal Behavior'] }
        ]
    },
    building: {
        title: "Building & Making",
        categories: [
            { id: 'materials', title: 'Materials', subtopics: ['Woodworking', 'LEGO', 'Clay', 'Paper Mache', '3D Printing', 'Metal', 'Fabric', 'Cardboard', 'Electronics', 'Recycled Art'] },
            { id: 'projects', title: 'Projects', subtopics: ['Birdhouses', 'Robots', 'Bridges', 'Forts', 'Models', 'Furniture', 'Costumes', 'Inventions', 'Kites', 'Boats'] }
        ]
    },
    cooking: {
        title: "Cooking & Food",
        categories: [
            { id: 'basics', title: 'Basics', subtopics: ['Baking', 'Chopping', 'Measuring', 'Sautéing', 'Grilling', 'Mixing', 'Food Safety', 'Nutrition', 'Flavors', 'Spices'] },
            { id: 'dishes', title: 'Dishes', subtopics: ['Pizza', 'Pasta', 'Cookies', 'Cakes', 'Smoothies', 'Salads', 'Soups', 'Sandwiches', 'Breakfast', 'Desserts'] }
        ]
    },
    photography: {
        title: "Photography & Video",
        categories: [
            { id: 'photo', title: 'Photography', subtopics: ['Lighting', 'Composition', 'Portraits', 'Landscapes', 'Macro', 'Editing', 'Filters', 'Cameras', 'Angles', 'Black & White'] },
            { id: 'video', title: 'Video', subtopics: ['Filming', 'Editing', 'Stop Motion', 'Animation', 'Vlogging', 'Sound', 'Storyboarding', 'Special Effects', 'Transitions', 'Directing'] }
        ]
    },
    business: {
        title: "Business & Ideas",
        categories: [
            { id: 'startup', title: 'Startups', subtopics: ['Ideas', 'Products', 'Marketing', 'Selling', 'Logos', 'Planning', 'Teamwork', 'Customers', 'Goals', 'Pitching'] },
            { id: 'skills', title: 'Skills', subtopics: ['Leadership', 'Negotiation', 'Organization', 'Communication', 'Problem Solving', 'Time Management', 'Creativity', 'Networking', 'Presentation', 'Decision Making'] }
        ]
    },
    money: {
        title: "Money & Numbers",
        categories: [
            { id: 'basics', title: 'Basics', subtopics: ['Saving', 'Spending', 'Budgeting', 'Earning', 'Banking', 'Investing', 'Interest', 'Taxes', 'Currency', 'Value'] },
            { id: 'economics', title: 'Economics', subtopics: ['Supply & Demand', 'Markets', 'Trade', 'Inflation', 'Jobs', 'Entrepreneurship', 'Global Economy', 'Recession', 'Profit', 'scarcity'] }
        ]
    },
    communication: {
        title: "Communication",
        categories: [
            { id: 'speaking', title: 'Speaking', subtopics: ['Public Speaking', 'Debate', 'Storytelling', 'Presentations', 'Voice', 'Confidence', 'Body Language', 'Interviews', 'Conversation', 'Listening'] },
            { id: 'media', title: 'Media', subtopics: ['News', 'Social Media', 'Advertising', 'Radio', 'Podcasts', 'Journalism', 'Internet', 'Fake News', 'Influence', 'Digital Citizenship'] }
        ]
    },
    health: {
        title: "Health & Wellbeing",
        categories: [
            { id: 'body', title: 'Physical', subtopics: ['Exercise', 'Nutrition', 'Sleep', 'Hygiene', 'Anatomy', 'Immune System', 'First Aid', 'Strength', 'Yoga', 'Hydration'] },
            { id: 'mind', title: 'Mental', subtopics: ['Mindfulness', 'Stress', 'Emotions', 'Focus', 'Resilience', 'Positivity', 'Self-Care', 'Confidence', 'Kindness', 'Brain Power'] }
        ]
    },
    climate: {
        title: "Climate & Action",
        categories: [
            { id: 'issues', title: 'Issues', subtopics: ['Global Warming', 'Pollution', 'Deforestation', 'Ocean Acidification', 'Extreme Weather', 'Fossil Fuels', 'Plastic Waste', 'Biodiversity Loss', 'Overfishing', 'Melting Ice'] },
            { id: 'solutions', title: 'Solutions', subtopics: ['Renewable Energy', 'Electric Cars', 'Recycling', 'Planting Trees', 'Sustainable Fashion', 'Conservation', 'Activism', 'Solar Power', 'Wind Energy', 'Innovation'] }
        ]
    },
    // Default fallback for others
    default: {
        title: "General Learning",
        categories: [
            {
                id: 'basics',
                title: 'Basics',
                subtopics: ['Introduction', 'History', 'Key Concepts', 'Famous People', 'How it Works', 'Fun Facts', 'Future Trends', 'DIY Projects', 'Safety', 'Resources']
            }
        ]
    }
};

export const getTaxonomy = (interestId) => {
    return LEARNING_TAXONOMY[interestId] || LEARNING_TAXONOMY.default;
};
