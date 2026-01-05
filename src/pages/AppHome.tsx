import { useParams, Link } from 'react-router-dom';
import { getAppById } from '../data/apps';
import './AppHome.css';

export default function AppHome() {
  const { appId } = useParams<{ appId: string }>();
  const app = appId ? getAppById(appId) : undefined;

  if (!app) {
    return (
      <div className="container">
        <div className="error-state">
          <h1>App Not Found</h1>
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="app-home">
      <section className="app-hero" style={{ background: app.gradient }}>
        <div className="container">
          <div className="app-hero-content">
            <div className="app-hero-icon">
              {app.icon.startsWith('/') ? (
                <img src={app.icon} alt={`${app.name} logo`} />
              ) : (
                <span>{app.icon}</span>
              )}
            </div>
            <h1 className="app-hero-title">{app.name}</h1>
            <p className="app-hero-tagline">{app.tagline}</p>
            <p className="app-hero-description">{app.description}</p>
            
            <div className="app-hero-badges">
              {app.platforms.map(platform => (
                <span key={platform} className="platform-badge-large">
                  {platform === 'ios' ? '🍎 Available on iOS' : '🤖 Available on Android'}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="app-features container">
        <h2>Features</h2>
        <div className="features-grid">
          {app.features.map((feature, index) => (
            <div key={index} className="feature-card card">
              <div className="feature-icon">✨</div>
              <h3>{feature}</h3>
            </div>
          ))}
        </div>
      </section>

      {app.games && (
        <section className="app-games container">
          <h2>Included Games</h2>
          <div className="games-grid">
            {app.games.map((game, index) => (
              <div key={index} className="game-card card">
                <h3>{game}</h3>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="app-legal container">
        <h2>Legal & Support</h2>
        <div className="legal-links-grid">
          <Link to={`/${app.id}/privacy-policy`} className="legal-link-card card">
            <div className="legal-icon">🔒</div>
            <h3>Privacy Policy</h3>
            <p>Learn how we protect your data</p>
          </Link>
          
          <Link to={`/${app.id}/terms-of-service`} className="legal-link-card card">
            <div className="legal-icon">📄</div>
            <h3>Terms of Service</h3>
            <p>Read our terms and conditions</p>
          </Link>
          
          <Link to={`/${app.id}/support`} className="legal-link-card card">
            <div className="legal-icon">💬</div>
            <h3>Support</h3>
            <p>Get help and find answers</p>
          </Link>
        </div>
      </section>

      <section className="app-contact container">
        <div className="contact-box glass">
          <h2>Get in Touch</h2>
          <p>Have questions or feedback? We'd love to hear from you!</p>
          <a href={`mailto:${app.supportEmail}`} className="btn btn-primary">
            Contact Support
          </a>
        </div>
      </section>
    </div>
  );
}
