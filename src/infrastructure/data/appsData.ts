import type { AppEntity } from '../../core/domain/entities/App';

export const apps: AppEntity[] = [
    {
        id: 'playpulse',
        name: 'PlayPulse',
        tagline: 'Mini Games Arcade',
        description: '10+ addictive mini games in one app! Bubble Shooter, 2048, Snake & more. Play offline anytime, anywhere.',
        bundleId: 'com.brolee.app',
        icon: '/playpulse.png',
        color: '#4ECDC4',
        gradient: 'linear-gradient(135deg, #4ECDC4 0%, #556270 100%)',
        supportEmail: 'support@playpulse.app',
        developerName: 'Briefly',
        platforms: ['ios', 'android'],
        features: [
            '10+ Games in One App',
            'Play Offline',
            'No Sign-up Required',
            'Track Your Progress',
            'Beautiful Graphics',
            'Regular Updates'
        ],
        games: [
            'Bubble Shooter Classic',
            'Brick Breaker Blitz',
            'Snake Retro',
            'Color Switch Challenge',
            'Block Blast Puzzle',
            '2048 Number Puzzle',
            'Memory Match',
            'Doodle Jump',
            'Flappy Bird Challenge',
            'Fruit Ninja Slice'
        ]
    },
    {
        id: 'gutbuddy',
        name: 'Gut Buddy',
        tagline: 'Join 50,000+ Happy Guts',
        description: 'Your personal gut health companion. Build habits that last a lifetime with simple tracking and personalized insights.',
        bundleId: 'com.foodhabit.app',
        icon: '/gutbuddy.png',
        color: '#FF7495',
        gradient: 'linear-gradient(135deg, #FCE762 0%, #FF7495 100%)',
        supportEmail: 'support@gutbuddy.app',
        developerName: 'Briefly',
        platforms: ['ios'],
        features: [
            'Real-time Gut Health Scoring',
            'Bowel Movement Tracking (Bristol Scale)',
            'Daily Wellness Missions (Water, Fiber)',
            'Medical Health Alerts & Notices',
            'Personalized Habits & Insights',
            'Comprehensive Health Reports'
        ],
        iosUrl: 'https://apps.apple.com/app/gut-buddy-digestive-tracker/id6755035965'
    },
    {
        id: 'masterly',
        name: 'Masterly AI',
        tagline: 'Master Your Studies',
        description: 'Your personal AI study companion. Scan materials, generate quizzes, and master any subject with the power of AI.',
        bundleId: 'com.masterly.app',
        icon: '/masterly.png',
        color: '#2D4F1E',
        gradient: 'linear-gradient(135deg, #2D4F1E 0%, #A44231 100%)',
        supportEmail: 'support@masterlyapp.in',
        developerName: 'Briefly',
        platforms: ['ios'],
        features: [
            'AI Quiz Generation', 
            'Study Material Scanning', 
            'Voice Notes & Transcription',
            'Smart Flashcards',
            'Progress Tracking'
        ],
        externalUrl: 'https://masterlyapp.in',
        iosUrl: 'https://apps.apple.com/us/app/masterly-ai-quiz-study-app/id6753760295'
    }
];
