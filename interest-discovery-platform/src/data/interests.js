import {
  FlaskConical, Cpu, Calculator, Leaf, Rocket, Palette, Music,
  Move, Trophy, Gamepad2, Feather, Theater, ScrollText, Globe,
  HeartHandshake, Dog, Hammer, ChefHat, Camera, Lightbulb,
  Coins, MessageCircle, Heart, Sprout
} from 'lucide-react';

export const INTERESTS = [
  {
    id: 'science',
    title: 'Science & Experiments',
    category: 'STEM',
    description: 'Discover how things work',
    icon: FlaskConical,
    color: '#FF6B6B',
    questions: [
      "Do you like doing experiments or watching them?",
      "Do you enjoy learning why things happen?"
    ]
  },
  {
    id: 'technology',
    title: 'Technology & Gadgets',
    category: 'STEM',
    description: 'Machines, computers, tools',
    icon: Cpu,
    color: '#4D96FF',
    questions: [
      "Do you like using gadgets or understanding how they work?",
      "Have you ever tried fixing something?"
    ]
  },
  {
    id: 'math',
    title: 'Math & Logic',
    category: 'STEM',
    description: 'Puzzles, patterns, thinking',
    icon: Calculator,
    color: '#6BCB77',
    questions: [
      "Do you enjoy puzzles?",
      "Do you like finding patterns?"
    ]
  },
  {
    id: 'nature',
    title: 'Nature & Environment',
    category: 'Nature',
    description: 'Plants, animals, Earth',
    icon: Leaf,
    color: '#FFD93D',
    questions: [
      "Do you enjoy being outdoors?",
      "Plants or animals—which interests you more?"
    ]
  },
  {
    id: 'space',
    title: 'Space & Astronomy',
    category: 'STEM',
    description: 'Planets, stars, universe',
    icon: Rocket,
    color: '#6C5DD3',
    questions: [
      "Do you wonder what's beyond Earth?",
      "Do movies about space excite you?"
    ]
  },
  {
    id: 'art',
    title: 'Art & Drawing',
    category: 'Creative',
    description: 'Creating visual art',
    icon: Palette,
    color: '#FF9F1C',
    questions: [
      "Do you like creating freely or following steps?",
      "Do colors or shapes excite you more?"
    ]
  },
  {
    id: 'music',
    title: 'Music & Sound',
    category: 'Creative',
    description: 'Rhythm, instruments',
    icon: Music,
    color: '#F94144',
    questions: [
      "Do you enjoy listening to music or making it?",
      "Can you feel the rhythm in songs?"
    ]
  },
  {
    id: 'dance',
    title: 'Dance & Movement',
    category: 'Creative',
    description: 'Express through movement',
    icon: Move,
    color: '#F3722C',
    questions: [
      "Do you like moving to music?",
      "Do you enjoy performing for others?"
    ]
  },
  {
    id: 'sports',
    title: 'Sports & Fitness',
    category: 'Physical',
    description: 'Physical activity, teamwork',
    icon: Trophy,
    color: '#90BE6D',
    questions: [
      "Do you enjoy team sports or solo activities?",
      "Do you like practice or competition?"
    ]
  },
  {
    id: 'games',
    title: 'Games & Strategy',
    category: 'Analysis',
    description: 'Board games, problem solving',
    icon: Gamepad2,
    color: '#577590',
    questions: [
      "Do you like strategy games?",
      "Do you enjoy planning ahead?"
    ]
  },
  {
    id: 'writing',
    title: 'Storytelling & Writing',
    category: 'Creative',
    description: 'Stories, imagination',
    icon: Feather,
    color: '#43AA8B',
    questions: [
      "Do you enjoy writing your own stories?",
      "Do you like reading books?"
    ]
  },
  {
    id: 'drama',
    title: 'Drama & Acting',
    category: 'Creative',
    description: 'Performing and expression',
    icon: Theater,
    color: '#F9C74F',
    questions: [
      "Do you like pretending to be someone else?",
      "Do you enjoy being on stage?"
    ]
  },
  {
    id: 'history',
    title: 'History & Civilizations',
    category: 'Humanities',
    description: 'Past societies',
    icon: ScrollText,
    color: '#B5179E',
    questions: [
      "Do you like learning about the past?",
      "Are you interested in how people lived long ago?"
    ]
  },
  {
    id: 'geography',
    title: 'Geography & Cultures',
    category: 'Humanities',
    description: 'People and places',
    icon: Globe,
    color: '#4CC9F0',
    questions: [
      "Do you like maps and places?",
      "Do you want to travel the world?"
    ]
  },
  {
    id: 'helping',
    title: 'Helping People',
    category: 'Social',
    description: 'Care, service, empathy',
    icon: HeartHandshake,
    color: '#F72585',
    questions: [
      "Do you enjoy helping friends?",
      "Do you like solving problems for others?"
    ]
  },
  {
    id: 'animals',
    title: 'Animals & Wildlife',
    category: 'Nature',
    description: 'Living creatures',
    icon: Dog,
    color: '#7209B7',
    questions: [
      "Do you have or want a pet?",
      "Do you like watching animals in nature?"
    ]
  },
  {
    id: 'building',
    title: 'Building & Making',
    category: 'STEM',
    description: 'Hands-on creation',
    icon: Hammer,
    color: '#3A0CA3',
    questions: [
      "Do you like using your hands?",
      "Building from instructions or imagination?"
    ]
  },
  {
    id: 'cooking',
    title: 'Cooking & Food Science',
    category: 'Life Skills',
    description: 'Food experiments',
    icon: ChefHat,
    color: '#F15BB5',
    questions: [
      "Do you like checking recipes?",
      "Do you enjoy tasting new foods?"
    ]
  },
  {
    id: 'photography',
    title: 'Photography & Video',
    category: 'Creative',
    description: 'Capturing moments',
    icon: Camera,
    color: '#00F5D4',
    questions: [
      "Do you like taking photos?",
      "Do you enjoy editing videos?"
    ]
  },
  {
    id: 'business',
    title: 'Business & Ideas',
    category: 'Social',
    description: 'Solving problems',
    icon: Lightbulb,
    color: '#FEE440',
    questions: [
      "Do you have ideas for new things to sell?",
      "Do you like organizing events?"
    ]
  },
  {
    id: 'money',
    title: 'Money & Numbers',
    category: 'Life Skills',
    description: 'Saving, value',
    icon: Coins,
    color: '#9B5DE5',
    questions: [
      "Do you like saving money?",
      "Are you good with numbers?"
    ]
  },
  {
    id: 'communication',
    title: 'Communication & Speaking',
    category: 'Social',
    description: 'Expressing ideas',
    icon: MessageCircle,
    color: '#00BBF9',
    questions: [
      "Do you like talking to groups?",
      "Are you good at explaining things?"
    ]
  },
  {
    id: 'health',
    title: 'Health & Wellbeing',
    category: 'Life Skills',
    description: 'Body and mind',
    icon: Heart,
    color: '#FF006E',
    questions: [
      "Do you like learning about the body?",
      "Is staying healthy important to you?"
    ]
  },
  {
    id: 'climate',
    title: 'Climate & Sustainability',
    category: 'Nature',
    description: 'Protecting Earth',
    icon: Sprout,
    color: '#3F37C9',
    questions: [
      "Do you worry about the environment?",
      "Do you recycle or save water?"
    ]
  }
];
