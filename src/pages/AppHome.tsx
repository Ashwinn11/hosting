import { useParams, Link } from 'react-router-dom';
import { 
  ShieldCheck, FileText, MessageCircle, Smartphone, Smartphone as Android, 
  Zap, Globe, Trophy, Play, Target, Layout, Activity, Palette, Box, Hash, 
  Brain, ArrowUpCircle, Wind, Sword, Star, ChevronRight
} from 'lucide-react';
import { getAppById } from '../data/apps';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import './AppHome.css';

const gameIconMap: Record<string, any> = {
  'Bubble Shooter Classic': Target,
  'Brick Breaker Blitz': Layout,
  'Snake Retro': Activity,
  'Color Switch Challenge': Palette,
  'Block Blast Puzzle': Box,
  '2048 Number Puzzle': Hash,
  'Memory Match': Brain,
  'Doodle Jump': ArrowUpCircle,
  'Flappy Bird Challenge': Wind,
  'Fruit Ninja Slice': Sword,
};

export default function AppHome() {
  const { appId } = useParams<{ appId: string }>();
  const app = appId ? getAppById(appId) : undefined;

  if (!app) {
    return (
      <Container>
        <div className="error-state">
          <h1>App Not Found</h1>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </Container>
    );
  }

  const isPlayPulse = app.id === 'playpulse';

  return (
    <div className="app-home">
      {/* Background Ambience */}
      <div className="ambient-background">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
      </div>

      {/* Mobile-First Hero */}
      <section className="mobile-hero">
        <Container>
          <div className="hero-content">
            <div className="app-branding">
              <div className="app-icon-large glass">
                {app.icon.startsWith('/') ? (
                  <img src={app.icon} alt={app.name} />
                ) : (
                  <span>{app.icon}</span>
                )}
              </div>
              <div className="app-title-block">
                <h1>{app.name}</h1>
                <p className="app-tagline">{app.tagline}</p>
                <div className="rating-pill glass">
                  <Star size={14} fill="currentColor" className="text-yellow-400" />
                  <span>4.9</span>
                  <span className="dot">•</span>
                  <span>10k+ Reviews</span>
                </div>
              </div>
            </div>

            <div className="hero-actions">
              <Button size="lg" icon={Smartphone} className="w-full pulse-btn">
                Download for iOS
              </Button>
              <Button size="lg" variant="secondary" icon={Android} className="w-full">
                Download for Android
              </Button>
            </div>

            <div className="stat-row">
              <div className="stat-item">
                <Trophy size={20} className="text-secondary" />
                <span className="stat-label">#1 Arcade</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <Globe size={20} className="text-primary" />
                <span className="stat-label">Global</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <Zap size={20} className="text-accent" />
                <span className="stat-label">Fast</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Horizontal Games Scroll (App Store Style) */}
      {isPlayPulse && (
        <section className="games-section">
          <Container>
            <div className="section-header-row">
              <h2>Arcade Gallery</h2>
              <Link to="#" className="see-all">See All <ChevronRight size={16} /></Link>
            </div>
            
            <div className="horizontal-scroll hide-scrollbar">
              {app.games?.map((game, index) => {
                const Icon = gameIconMap[game] || Play;
                const hue = (index * 45) % 360;
                return (
                  <div key={index} className="game-snap-card">
                    <div className="game-icon-box" style={{ background: `hsl(${hue}, 70%, 15%)`, color: `hsl(${hue}, 80%, 70%)` }}>
                      <Icon size={32} />
                    </div>
                    <div className="game-info">
                      <h3>{game}</h3>
                      <span>Arcade • Casual</span>
                    </div>
                    <Button size="sm" variant="secondary" className="play-btn">Play</Button>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* Feature List (Vertical Stack) */}
      <Section className="features-section">
        <Container>
          <h2 className="mb-lg">Premium Features</h2>
          <div className="feature-stack">
            {app.features.map((feature, index) => (
              <div key={index} className="feature-row glass">
                <div className="feature-marker">
                  <div className="dot"></div>
                  <div className="line"></div>
                </div>
                <div className="feature-content">
                  <h3>{feature}</h3>
                  <p>Optimized for the best mobile experience.</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Legal & Support Actions (Settings Style) */}
      <section className="settings-section">
        <Container>
          <h2 className="mb-md">Information</h2>
          <div className="settings-group glass">
            <Link to={`/${app.id}/privacy-policy`} className="settings-item">
              <div className="settings-icon"><ShieldCheck size={20} /></div>
              <span className="settings-label">Privacy Policy</span>
              <ChevronRight size={16} className="settings-arrow" />
            </Link>
            
            <Link to={`/${app.id}/terms-of-service`} className="settings-item">
              <div className="settings-icon"><FileText size={20} /></div>
              <span className="settings-label">Terms of Service</span>
              <ChevronRight size={16} className="settings-arrow" />
            </Link>
            
            <Link to={`/${app.id}/support`} className="settings-item">
              <div className="settings-icon"><MessageCircle size={20} /></div>
              <span className="settings-label">Help & Support</span>
              <ChevronRight size={16} className="settings-arrow" />
            </Link>
          </div>
          
          <div className="version-info">
            <p>Version 2.0.4 • Build 1024</p>
            <p>© 2026 {app.name}</p>
          </div>
        </Container>
      </section>
    </div>
  );
}
