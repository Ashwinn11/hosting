import { useParams, Link } from 'react-router-dom';
import { getAppById } from '../data/apps';
import { Container } from '../components/ui/Container';
import { BackLink } from '../components/ui/BackLink';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import './PrivacyPolicy.css';

export default function PrivacyPolicy() {
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

  return (
    <div className="legal-page">
      <Container size="small">
        <div className="legal-header">
          <BackLink to={`/${app.id}`}>Back to {app.name}</BackLink>
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="effective-date">Effective Date: January 5, 2026</p>
        </div>

        <div className="legal-content">
          <Section className="legal-section">
            <h2>Introduction</h2>
            <p>
              Welcome to {app.name}! Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our mobile application.
            </p>
          </Section>

          <Section className="legal-section">
            <h2>Information We Collect</h2>
            
            <h3>Local Gameplay Data</h3>
            <p>
              PlayPulse is designed to respect your privacy. All your high scores, game progress, and unlocked achievements are stored <strong>locally on your device</strong>. We do not transmit your specific gameplay patterns to our servers.
            </p>

            <h3>Information Collected Automatically</h3>
            <p>To keep PlayPulse free and improve performance, we may automatically collect:</p>
            <ul className="legal-list">
              <li><strong>Device Telemetry:</strong> Anonymized data about app crashes and loading times.</li>
              <li><strong>Engagement Metrics:</strong> Which games are played most frequently (aggregated).</li>
              <li><strong>Advertising Identifiers:</strong> Used by Google AdMob to provide relevant advertisements.</li>
            </ul>

            <Card className="mt-md" glass>
              <h3>Pure Arcade Experience</h3>
              <ul className="legal-list">
                <li>No email or phone number required.</li>
                <li>No social media linking required.</li>
                <li>No access to your camera, microphone, or gallery.</li>
              </ul>
            </Card>
          </Section>

          <Section className="legal-section">
            <h2>How We Use Your Information</h2>
            <p>We use collected information to:</p>
            <ul className="legal-list">
              <li>Provide and maintain the app</li>
              <li>Improve user experience</li>
              <li>Display relevant advertisements</li>
              <li>Analyze app performance and fix bugs</li>
            </ul>
          </Section>

          <Section className="legal-section">
            <h2>Third-Party Services</h2>
            <p>{app.name} uses third-party services that may collect information:</p>
            
            <div className="third-party-box mt-md">
              <h3>Google AdMob</h3>
              <p>
                We use Google AdMob to display advertisements. AdMob may collect device information and advertising identifiers to show relevant ads.
              </p>
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-link">
                Google Privacy Policy
              </a>
            </div>
          </Section>

          <Section className="legal-section">
            <h2>Data Retention</h2>
            <p>
              {app.games ? 'Gameplay data is stored locally on your device. We do not have access to your game saves or scores unless you explicitly share them.' : 'App data is stored locally on your device.'}
            </p>
          </Section>

          <Section className="legal-section">
            <h2>Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us:</p>
            <Card className="mt-md">
              <strong>Email:</strong> <a href={`mailto:${app.supportEmail}`}>{app.supportEmail}</a>
            </Card>
          </Section>

          <div className="legal-footer">
            <p>© {new Date().getFullYear()} {app.name}. All rights reserved.</p>
          </div>
        </div>
      </Container>
    </div>
  );
}
