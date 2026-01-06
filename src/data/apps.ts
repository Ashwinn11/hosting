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
        id: 'gutscan',
        name: 'GutScan',
        tagline: 'Food and Gut Health',
        description: 'AI-powered gut health tracker & food diary. Snap meals, track symptoms, and discover which foods support your digestive wellness.',
        bundleId: 'com.foodhabit.app',
        icon: '/gutscan.png',
        color: '#10b981',
        gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        supportEmail: 'support@gutscan.app',
        developerName: 'Briefly',
        platforms: ['ios'],
        features: [
            'AI-Powered Meal Scanning',
            'Symptom & Digestion Tracking',
            'FODMAP Tracking',
            'Gut Health Scoring',
            'Food-Symptom Correlation',
            'Personalized Insights'
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
