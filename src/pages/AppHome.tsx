import { useParams, Link } from 'react-router-dom';
import { 
  ShieldCheck, FileText, MessageCircle, Smartphone, Smartphone as Android, 
  Zap, Globe, Trophy, Play, Target, Layout, Activity, Palette, Box, Hash, 
  Brain, ArrowUpCircle, Wind, Sword, Cpu, Heart, Rocket
} from 'lucide-react';
import { getAppById } from '../data/apps';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
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

  const featureIcons = [Rocket, ShieldCheck, Cpu, Activity, Zap, Heart];

  return (
    <div className="app-home">
      <div className="page-ornaments">
        <div className="ornament-1"></div>
        <div className="ornament-2"></div>
      </div>

      <section className="app-hero" style={{ background: app.gradient }}>
        <div className="hero-glow"></div>
        <Container>
          <div className="app-hero-content fade-in">
            <div className="app-hero-icon-wrapper">
              <div className="app-hero-icon">
                {app.icon.startsWith('/') ? (
                  <img src={app.icon} alt={`${app.name} logo`} />
                ) : (
                  <span>{app.icon}</span>
                )}
              </div>
              <Badge variant="accent" className="version-badge">v1.0.4</Badge>
            </div>
            
            <h1 className="app-hero-title">{app.name}</h1>
            <p className="app-hero-tagline">{app.tagline}</p>
            <p className="app-hero-description">{app.description}</p>
            
            <div className="app-hero-cta">
              <Button size="lg" icon={Smartphone} className="pulse-btn">App Store</Button>
              <Button size="lg" variant="secondary" icon={Android}>Google Play</Button>
            </div>

            <div className="app-hero-badges">
              <div className="trust-badge"><Globe size={16} /><span>Global Play</span></div>
              <div className="trust-badge"><Zap size={16} /><span>High Performance</span></div>
              <div className="trust-badge"><Trophy size={16} /><span>Award Winning</span></div>
            </div>
          </div>
        </Container>
      </section>

      {isPlayPulse && (
        <Section title="The Arcade Gallery" subtitle="Hand-picked classics reimagined for the modern era. No downloads, just pure skill.">
          <div className="games-showcase">
            {app.games?.map((game, index) => {
              const Icon = gameIconMap[game] || Play;
              return (
                <Card key={index} className="game-showcase-card" glass hover>
                  <div className="game-card-content">
                    <div className="game-preview-icon" style={{ '--icon-color': `hsl(${index * 40}, 70%, 60%)` } as any}>
                      <Icon size={32} />
                    </div>
                    <h3>{game}</h3>
                    <div className="game-meta">
                      <Badge variant="outline" size="sm">Arcade</Badge>
                      <span className="player-count">{(10 + index * 2)}k+ playing</span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </Section>
      )}

      <Section title="Premium Features" className="features-section">
        <div className="features-grid">
          {app.features.map((feature, index) => {
            const Icon = featureIcons[index % featureIcons.length];
            return (
              <Card key={index} className="feature-card" hover>
                <div className="feature-icon-box">
                  <Icon size={24} className="text-primary" />
                </div>
                <div className="feature-text">
                  <h3>{feature}</h3>
                  <p>Our custom-built {feature.toLowerCase()} engine ensures the smoothest experience available on mobile today.</p>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section title="Developer Support" subtitle="Everything you need to know about our commitment to quality and service.">
        <div className="legal-links-grid">
          <Link to={`/${app.id}/privacy-policy`} className="legal-link-wrapper">
            <Card className="legal-link-card" hover glass>
              <ShieldCheck size={40} className="legal-icon-main" />
              <h3>Security</h3>
              <p>Advanced data protection and privacy-first architecture.</p>
            </Card>
          </Link>
          <Link to={`/${app.id}/terms-of-service`} className="legal-link-wrapper">
            <Card className="legal-link-card" hover glass>
              <FileText size={40} className="legal-icon-main" />
              <h3>Terms</h3>
              <p>Simple, transparent, and fair usage guidelines.</p>
            </Card>
          </Link>
          <Link to={`/${app.id}/support`} className="legal-link-wrapper">
            <Card className="legal-link-card" hover glass>
              <MessageCircle size={40} className="legal-icon-main" />
              <h3>Help</h3>
              <p>Direct access to our dedicated engineering support team.</p>
            </Card>
          </Link>
        </div>
      </Section>

      <Section>
        <Card className="newsletter-box glass-card" hover={false}>
          <div className="newsletter-grid">
            <div className="newsletter-info">
              <h2>Join the pulse.</h2>
              <p>Be the first to know when we drop new games and features.</p>
            </div>
            <div className="newsletter-action">
              <Button size="lg" icon={Rocket}>Get Started Free</Button>
            </div>
          </div>
        </Card>
      </Section>
    </div>
  );
}
