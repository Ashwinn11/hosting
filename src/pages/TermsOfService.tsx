import { useParams, Link } from 'react-router-dom';
import { getAppById } from '../data/apps';
import { Container } from '../components/ui/Container';
import { BackLink } from '../components/ui/BackLink';
import { Section } from '../components/ui/Section';
import './PrivacyPolicy.css';

export default function TermsOfService() {
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
          <h1 className="legal-title">Terms of Service</h1>
          <p className="effective-date">Effective Date: January 5, 2026</p>
        </div>

        <div className="legal-content">
          <Section className="legal-section">
            <h2>Acceptance of Terms</h2>
            <p>
              By downloading, installing, or using {app.name}, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the app.
            </p>
          </Section>

          <Section className="legal-section">
            <h2>Description of Service</h2>
            <p>
              {app.name} is a mobile {app.games ? 'gaming' : ''} application that provides {app.description.toLowerCase()} The app is provided "as is" and "as available."
            </p>
          </Section>

          <Section className="legal-section">
            <h2>Arcade Usage Rules</h2>
            <p>By using PlayPulse, you agree to:</p>
            <ul className="legal-list">
              <li>Use the arcade for personal, non-competitive entertainment purposes.</li>
              <li>Not use automated scripts or "bots" to manipulate high scores on global leaderboards.</li>
              <li>Not attempt to decompile or reverse-engineer any of the individual mini-games.</li>
              <li>Accept that local data (high scores) may be lost if the app is uninstalled without a device backup.</li>
            </ul>
          </Section>

          <Section className="legal-section">
            <h2>Intellectual Property</h2>
            <p>
              The PlayPulse name, the "Pulse" logo, and the specific implementations of the games (including code, graphics, and custom sound effects) are the intellectual property of Briefly. Many of our games are modern interpretations of classic arcade mechanics, but the specific assets provided in this app are protected by copyright.
            </p>
          </Section>

          <Section className="legal-section">
            <h2>Advertisements</h2>
            <p>
              {app.name} is a free app that displays advertisements. By using the app, you consent to receiving ads. Advertisements are provided by third-party networks and are subject to their own terms and privacy policies.
            </p>
          </Section>

          <Section className="legal-section">
            <h2>Disclaimer of Warranties</h2>
            <p>
              {app.name} is provided "as is" without warranties of any kind. We do not guarantee that the app will be error-free, uninterrupted, or free of viruses.
            </p>
          </Section>

          <Section className="legal-section">
            <h2>Contact Information</h2>
            <p>For questions about these Terms of Service, please contact us:</p>
            <p><strong>Email:</strong> <a href={`mailto:${app.supportEmail}`}>{app.supportEmail}</a></p>
          </Section>

          <div className="legal-footer">
            <p>© {new Date().getFullYear()} {app.name}. All rights reserved.</p>
          </div>
        </div>
      </Container>
    </div>
  );
}
