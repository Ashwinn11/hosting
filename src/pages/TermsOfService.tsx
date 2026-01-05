import { useParams, Link } from 'react-router-dom';
import { getAppById } from '../data/apps';
import './PrivacyPolicy.css';

export default function TermsOfService() {
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
        <h1>Terms of Service</h1>
        <p className="effective-date">Effective Date: January 5, 2026</p>
      </div>

      <div className="legal-content">
        <section>
          <h2>Acceptance of Terms</h2>
          <p>
            By downloading, installing, or using {app.name}, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the app.
          </p>
        </section>

        <section>
          <h2>Description of Service</h2>
          <p>
            {app.name} is a mobile {app.games ? 'gaming' : ''} application that provides {app.description.toLowerCase()} The app is provided "as is" and "as available."
          </p>
        </section>

        <section>
          <h2>User Conduct</h2>
          <p>By using {app.name}, you agree to:</p>
          <ul>
            <li>Use the app for personal, non-commercial purposes only</li>
            <li>Not attempt to hack, reverse-engineer, or modify the app</li>
            <li>Not use the app for any illegal or unauthorized purpose</li>
            <li>Not interfere with or disrupt the app's functionality</li>
          </ul>
        </section>

        <section>
          <h2>Intellectual Property</h2>
          <p>
            All content in {app.name}, including but not limited to {app.games ? 'games, ' : ''}graphics, sounds, and code, is the property of {app.developerName} or its licensors. You may not copy, modify, or distribute any content without permission.
          </p>
        </section>

        <section>
          <h2>Advertisements</h2>
          <p>
            {app.name} is a free app that displays advertisements. By using the app, you consent to receiving ads. Advertisements are provided by third-party networks and are subject to their own terms and privacy policies.
          </p>
        </section>

        <section>
          <h2>In-App Purchases</h2>
          <p>
            [If applicable] {app.name} may offer in-app purchases. All purchases are final and non-refundable unless required by law. Parents should enable device restrictions to prevent unauthorized purchases.
          </p>
        </section>

        <section>
          <h2>Disclaimer of Warranties</h2>
          <p>
            {app.name} is provided "as is" without warranties of any kind. We do not guarantee that the app will be error-free, uninterrupted, or free of viruses.
          </p>
        </section>

        <section>
          <h2>Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, {app.developerName} and its developers shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the app.
          </p>
        </section>

        <section>
          <h2>Modifications to Service</h2>
          <p>
            We reserve the right to modify, suspend, or discontinue {app.name} at any time without notice. We may also add or remove {app.games ? 'games and ' : ''}features at our discretion.
          </p>
        </section>

        <section>
          <h2>Changes to Terms</h2>
          <p>
            We may update these Terms of Service from time to time. Continued use of the app after changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2>Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions.
          </p>
        </section>

        <section>
          <h2>Contact Information</h2>
          <p>For questions about these Terms of Service, please contact us:</p>
          <p><strong>Email:</strong> <a href={`mailto:${app.supportEmail}`}>{app.supportEmail}</a></p>
        </section>

        <div className="legal-footer">
          <p>© {new Date().getFullYear()} {app.name}. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
