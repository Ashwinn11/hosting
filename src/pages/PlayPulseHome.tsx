import { Link } from 'react-router-dom';
import { Smartphone, Trophy, Zap, Gamepad2, Layers, Target, Grid, Ghost, Star, ChevronLeft } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { getAppById } from '../data/apps';
import './PlayPulseHome.css';

const games = [
  { name: 'Bubble Shooter', icon: Target },
  { name: 'Brick Breaker', icon: Layers },
  { name: 'Snake Retro', icon: Ghost },
  { name: 'Color Switch', icon: Zap },
  { name: 'Block Blast', icon: Grid },
  { name: '2048 Puzzle', icon: Grid },
  { name: 'Memory Match', icon: Star },
  { name: 'Doodle Jump', icon: Trophy },
];

export default function PlayPulseHome() {
  const app = getAppById('playpulse');

  if (!app) return null;

  return (
    <div className="playpulse-home">
      <header className="playpulse-hero">
        <Container>
           <Link to="/" className="pp-back-link">
            <ChevronLeft size={20} /> Back to Hub
          </Link>
          
          <div className="playpulse-logo-large">
            <img src={app.icon} alt={`${app.name} Logo`} />
          </div>
          <h1 className="playpulse-title">{app.name}</h1>
          <p className="playpulse-tagline">{app.tagline}</p>
          
          <div className="playpulse-actions">
            <a href={app.iosUrl || '#'} className="pp-btn">
              <Smartphone size={20} />
              Download for iOS
            </a>
            <a href="#games" className="pp-btn secondary">
              <Gamepad2 size={20} />
              View Games
            </a>
          </div>
        </Container>
      </header>

      <section id="games" className="pp-section">
        <Container>
          <div className="text-center mb-12">
            <h2>10+ Addictive Games</h2>
            <p className="text-gray-400">No downloads required. Just open and play.</p>
          </div>
          
          <div className="pp-grid">
            {games.map((game, i) => (
              <div key={i} className="pp-game-card">
                <div className="pp-game-icon">
                  <game.icon size={28} />
                </div>
                <div className="pp-game-title">{game.name}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="pp-section" style={{ background: '#16213e' }}>
        <Container>
          <h2>Why Players Love It</h2>
          <div className="pp-features">
            <div className="pp-feature">
              <div className="pp-feature-icon"><Zap size={32} /></div>
              <div>
                <h3 className="text-xl font-bold mb-2">Instant Play</h3>
                <p className="text-gray-400">No loading times. No extra downloads. Jump straight into the action.</p>
              </div>
            </div>
            <div className="pp-feature">
              <div className="pp-feature-icon"><Trophy size={32} /></div>
              <div>
                <h3 className="text-xl font-bold mb-2">Global Leaderboards</h3>
                <p className="text-gray-400">Compete with players around the world and prove you're the best.</p>
              </div>
            </div>
            <div className="pp-feature">
              <div className="pp-feature-icon"><Smartphone size={32} /></div>
              <div>
                <h3 className="text-xl font-bold mb-2">Offline Mode</h3>
                <p className="text-gray-400">Play anywhere, anytime. No internet connection required.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <footer className="text-center py-12 text-gray-500 border-t border-white/5">
        <div className="pp-footer-links">
          <Link to="/playpulse/privacy-policy">Privacy Policy</Link>
          <span className="separator">•</span>
          <Link to="/playpulse/terms-of-service">Terms of Service</Link>
          <span className="separator">•</span>
          <Link to="/playpulse/support">Support</Link>
        </div>
        <p className="mt-4">© 2026 Briefly. All rights reserved.</p>
      </footer>
    </div>
  );
}
