import { useParams, Link } from 'react-router-dom';
import { getAppById } from '../data/apps';
import './PrivacyPolicy.css';

export default function PrivacyPolicy() {
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
    <div className="legal-page container">
      <div className="legal-header">
        <Link to={`/${app.id}`} className="back-link">← Back to {app.name}</Link>
        <h1>Privacy Policy</h1>
        <p className="effective-date">Effective Date: January 5, 2026</p>
      </div>

      <div className="legal-content">
        <section>
          <h2>Introduction</h2>
          <p>
            Welcome to {app.name}! Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our mobile application.
          </p>
        </section>

        <section>
          <h2>Information We Collect</h2>
          
          <h3>Information Collected Automatically</h3>
          <p>When you use {app.name}, we may automatically collect:</p>
          <ul>
            <li><strong>Device Information:</strong> Device model, operating system version, unique device identifiers</li>
            <li><strong>Usage Data:</strong> {app.games ? 'Game scores, play sessions, features used' : 'App usage patterns, features used'}</li>
            <li><strong>Advertising ID:</strong> Used to deliver personalized advertisements</li>
          </ul>

          <h3>Information We DON'T Collect</h3>
          <ul>
            <li>We do NOT require account creation</li>
            <li>We do NOT collect your name, email, or personal contact information</li>
            <li>We do NOT access your photos, contacts, or location</li>
          </ul>
        </section>

        <section>
          <h2>How We Use Your Information</h2>
          <p>We use collected information to:</p>
          <ul>
            <li>Provide and maintain the app</li>
            <li>Improve user experience</li>
            <li>Display relevant advertisements</li>
            <li>Analyze app performance and fix bugs</li>
          </ul>
        </section>

        <section>
          <h2>Third-Party Services</h2>
          <p>{app.name} uses third-party services that may collect information:</p>
          
          <h3>Google AdMob</h3>
          <p>
            We use Google AdMob to display advertisements. AdMob may collect device information and advertising identifiers to show relevant ads.
          </p>
          <ul>
            <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
          </ul>

          <h3>Analytics</h3>
          <p>
            We may use analytics tools to understand how users interact with our app. This data is anonymized and aggregated.
          </p>
        </section>

        <section>
          <h2>Children's Privacy</h2>
          <p>
            {app.name} is suitable for all ages. We do not knowingly collect personal information from children under 13. The app does not require any personal information to function.
          </p>
        </section>

        <section>
          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your information. However, no method of electronic transmission or storage is 100% secure.
          </p>
        </section>

        <section>
          <h2>Data Retention</h2>
          <p>
            {app.games ? 'Gameplay data is stored locally on your device. We do not have access to your game saves or scores unless you explicitly share them.' : 'App data is stored locally on your device.'}
          </p>
        </section>

        <section>
          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Request deletion of your data by contacting us</li>
            <li>Opt-out of personalized advertising through your device settings</li>
            <li>Uninstall the app at any time, which removes all local data</li>
          </ul>
        </section>

        <section>
          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by updating the "Effective Date" at the top.
          </p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us:</p>
          <p><strong>Email:</strong> <a href={`mailto:${app.supportEmail}`}>{app.supportEmail}</a></p>
        </section>

        <div className="legal-footer">
          <p>© {new Date().getFullYear()} {app.name}. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
