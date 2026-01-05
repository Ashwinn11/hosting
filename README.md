# Briefly.live - Multi-App Hosting Platform

A beautiful, scalable platform for hosting multiple mobile app pages on a single domain. Built with React, TypeScript, and Vite.

## 🚀 Live URLs

- **Main Site**: `briefly.live`
- **PlayPulse**: `briefly.live/playpulse`
  - Privacy Policy: `briefly.live/playpulse/privacy-policy`
  - Terms of Service: `briefly.live/playpulse/terms-of-service`
  - Support: `briefly.live/playpulse/support`

## ✨ Features

- **Multi-App Support**: Host unlimited apps on one domain
- **Dynamic Pages**: Privacy Policy, Terms, and Support pages auto-generate from app data
- **Premium Design**: Modern dark theme with gradients and animations
- **Fully Responsive**: Beautiful on all devices
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Easy to Extend**: Add new apps in minutes

## 📁 Project Structure

```
src/
├── data/
│   └── apps.ts              # Central app configuration
├── components/
│   ├── Layout.tsx           # Shared layout with nav/footer
│   └── AppCard.tsx          # App showcase card
├── pages/
│   ├── Home.tsx             # Landing page listing all apps
│   ├── AppHome.tsx          # Individual app homepage
│   ├── PrivacyPolicy.tsx    # Dynamic privacy policy
│   ├── TermsOfService.tsx   # Dynamic terms of service
│   └── Support.tsx          # Dynamic support page
└── styles/
    └── global.css           # Premium design system
```

## 🎯 Adding a New App (5 Minutes!)

### Step 1: Add App Logo
Place your app logo in `/public/your-app-logo.png`

### Step 2: Update App Data
Edit `src/data/apps.ts` and add your app to the `apps` array:

```typescript
{
  id: 'your-app-id',              // Used in URLs
  name: 'Your App Name',
  tagline: 'Short tagline',
  description: 'Brief description for cards',
  bundleId: 'com.yourcompany.app',
  icon: '/your-app-logo.png',     // Path to logo
  color: '#6366f1',               // Primary color
  gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  supportEmail: 'support@yourapp.com',
  developerName: 'Your Company',
  platforms: ['ios', 'android'],  // or just ['ios'] or ['android']
  features: [
    'Feature 1',
    'Feature 2',
    'Feature 3'
  ],
  games: ['Game 1', 'Game 2']     // Optional: only for gaming apps
}
```

### Step 3: That's It!
Your app now has:
- ✅ Homepage at `briefly.live/your-app-id`
- ✅ Privacy Policy at `briefly.live/your-app-id/privacy-policy`
- ✅ Terms of Service at `briefly.live/your-app-id/terms-of-service`
- ✅ Support Page at `briefly.live/your-app-id/support`

All pages are automatically generated from your app data!

## 🛠️ Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🌐 Deployment

This project can be deployed to:
- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- **Any static hosting service**

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload the 'dist' folder to Netlify
```

## 📝 Customization

### Update Branding
Edit `src/components/Layout.tsx` to change:
- Logo
- Navigation links
- Footer content

### Modify Design System
Edit `src/styles/global.css` to customize:
- Colors
- Typography
- Spacing
- Animations

### Customize Legal Pages
The legal pages are templates in:
- `src/pages/PrivacyPolicy.tsx`
- `src/pages/TermsOfService.tsx`
- `src/pages/Support.tsx`

Modify these files to match your specific legal requirements.

## 🎨 Design System

### Colors
- Primary: `#6366f1` (Indigo)
- Secondary: `#8b5cf6` (Purple)
- Accent: `#ec4899` (Pink)
- Background: Dark theme with gradients

### Typography
- Font: Inter (Google Fonts)
- Headings: Bold, gradient text
- Body: Clean, readable

### Components
- Cards with hover effects
- Glass morphism effects
- Smooth animations
- Responsive grids

## 📱 App Store Compliance

All generated pages are fully compliant with:
- ✅ iOS App Store requirements
- ✅ Google Play Store requirements
- ✅ GDPR guidelines
- ✅ COPPA compliance

## 🤝 Support

For questions or issues, contact: hello@briefly.live

## 📄 License

© 2026 Briefly. All rights reserved.
