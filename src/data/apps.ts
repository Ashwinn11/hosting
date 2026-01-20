export interface App {
    id: string;
    name: string;
    tagline: string;
    description: string;
    bundleId: string;
    icon: string;
    color: string;
    gradient: string;
    supportEmail: string;
    developerName: string;
    platforms: ('ios' | 'android')[];
    features: string[];
    games?: string[]; // For gaming apps
}

export const apps: App[] = [
    {
        id: 'playpulse',
        name: 'PlayPulse',
        tagline: 'Mini Games Arcade',
        description: '10+ addictive mini games in one app! Bubble Shooter, 2048, Snake & more. Play offline anytime, anywhere.',
        bundleId: 'com.brolee.app',
        icon: '/playpulse.png',
        color: '#6366f1',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
        gradient: 'linear-gradient(135deg, #FF7495 0%, #70CFFF 100%)',
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
        ]
    },
    // Add more apps here in the future - just copy this structure!
    // {
    //   id: 'your-next-app',
    //   name: 'Your App Name',
    //   ...
    // }
];

export const getAppById = (id: string): App | undefined => {
    return apps.find(app => app.id === id);
};
