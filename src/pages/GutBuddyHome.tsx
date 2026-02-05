import { Link } from 'react-router-dom';
import { Apple, ChevronLeft, Droplets, HeartPulse, Smartphone } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { useAppDetails } from '../presentation/hooks/useAppDetails';
import './GutBuddyHome.css';

export default function GutBuddyHome() {
  const { app, loading } = useAppDetails('gutbuddy');

  if (loading) return null;
  if (!app) return null;

  return (
    <div className="gutbuddy-home">
      <header className="gb-hero">
        <Container>
          <Link to="/" className="gb-back-link">
            <ChevronLeft size={24} /> Back
          </Link>

          <div className="gb-logo">
            <img src={app.icon} alt={`${app.name} Logo`} />
          </div>
          <h1 className="gb-title">{app.name}</h1>
          <p className="gb-tagline">
            {app.description}
          </p>
          
          <a href={app.iosUrl} target="_blank" rel="noopener noreferrer" className="gb-btn">
            <Smartphone size={24} />
            Download on App Store
          </a>
        </Container>
      </header>

      <section className="gb-section">
        <Container>
          <div className="text-center">
            <h2 style={{ fontFamily: 'Chewy', fontSize: '3rem', color: '#2D2D2D' }}>
              Why You'll Love It
            </h2>
          </div>

          <div className="gb-card-grid">
            <div className="gb-feature-card" style={{ '--bg-color': '#FF7495' } as React.CSSProperties}>
              <div className="gb-icon-box">
                <HeartPulse size={32} />
              </div>
              <h3 className="gb-card-title">Health Tracking</h3>
              <p>Log your daily bowel movements using the Bristol Scale standard. Simple, fast, and medically relevant.</p>
            </div>

            <div className="gb-feature-card" style={{ '--bg-color': '#70CFFF' } as React.CSSProperties}>
              <div className="gb-icon-box">
                <Droplets size={32} />
              </div>
              <h3 className="gb-card-title">Hydration Goals</h3>
              <p>Keep your gut happy with daily water tracking. Set goals and get gentle reminders to stay hydrated.</p>
            </div>

            <div className="gb-feature-card" style={{ '--bg-color': '#FCE762' } as React.CSSProperties}>
              <div className="gb-icon-box">
                <Apple size={32} />
              </div>
              <h3 className="gb-card-title">Food Insights</h3>
              <p>Discover which foods make you feel great and which ones to avoid. Identify triggers effortlessly.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="gb-section bg-gray-50">
        <Container>
          <div className="gb-bristol-scale">
            <h2 style={{ fontFamily: 'Chewy', fontSize: '2.5rem', marginBottom: '1rem' }}>
              Master the Bristol Scale
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-700">
              Understanding your digestion has never been this cute! 
              Gut Buddy makes tracking the "uncomfortable" stuff comfortable and easy.
            </p>
            <div className="scale-items">
              {[1, 2, 3, 4, 5, 6, 7].map(num => (
                 <div key={num} className="scale-dot" style={{ opacity: 0.5 + (num * 0.05) }} title={`Type ${num}`}></div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <footer className="py-12 text-center text-gray-400 bg-white border-t border-gray-100">
        <div className="gb-footer-links">
          <Link to="/gutbuddy/privacy-policy">Privacy</Link>
          <span className="dot">•</span>
          <Link to="/gutbuddy/terms-of-service">Terms</Link>
          <span className="dot">•</span>
          <Link to="/gutbuddy/support">Support</Link>
        </div>
        <p style={{ fontFamily: 'Fredoka', marginTop: '1rem' }}>Made with 💖 by Briefly</p>
      </footer>
    </div>
  );
}
