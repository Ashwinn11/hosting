import { useParams, Link } from 'react-router-dom';
import { getAppById } from '../data/apps';
import './Support.css';

export default function Support() {
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
    <div className="support-page container">
      <div className="support-header">
        <Link to={`/${app.id}`} className="back-link">← Back to {app.name}</Link>
        <h1>{app.name} Support Center</h1>
        <p className="support-subtitle">We're here to help you have the best experience!</p>
      </div>

      <div className="support-content">
        <section className="faq-section">
          <h2>📱 Frequently Asked Questions</h2>

          <div className="faq-category">
            <h3>General Questions</h3>
            
            <div className="faq-item">
              <h4>Q: Is {app.name} free to download?</h4>
              <p>A: Yes! {app.name} is completely free to download and use. The app is supported by advertisements.</p>
            </div>

            <div className="faq-item">
              <h4>Q: Do I need an internet connection?</h4>
              <p>A: {app.features.includes('Play Offline') ? 'No! All features work offline. You only need internet for ads to load.' : 'An internet connection is recommended for the best experience.'}</p>
            </div>

            <div className="faq-item">
              <h4>Q: What devices are supported?</h4>
              <p>A: {app.name} supports:</p>
              <ul>
                {app.platforms.includes('ios') && <li>iOS 13.0 and later (iPhone and iPod touch)</li>}
                {app.platforms.includes('android') && <li>Android 6.0 and later</li>}
              </ul>
            </div>

            <div className="faq-item">
              <h4>Q: How do I save my progress?</h4>
              <p>A: Your {app.games ? 'game progress and high scores are' : 'data is'} automatically saved on your device.</p>
            </div>
          </div>

          {app.games && (
            <div className="faq-category">
              <h3>Games</h3>
              
              <div className="faq-item">
                <h4>Q: How many games are included?</h4>
                <p>A: {app.name} currently includes {app.games.length}+ mini games, with more being added regularly!</p>
              </div>

              <div className="faq-item">
                <h4>Q: Will you add more games?</h4>
                <p>A: Yes! We're constantly working on new games. Follow our updates to see what's coming next.</p>
              </div>

              <div className="faq-item">
                <h4>Q: I found a bug in a game. How do I report it?</h4>
                <p>A: Please email us at <a href={`mailto:${app.supportEmail}`}>{app.supportEmail}</a> with:</p>
                <ul>
                  <li>Your device model</li>
                  <li>Operating system version</li>
                  <li>Which game has the bug</li>
                  <li>Description of the issue</li>
                </ul>
              </div>
            </div>
          )}

          <div className="faq-category">
            <h3>Technical Issues</h3>
            
            <div className="faq-item">
              <h4>Q: The app crashes when I open it. What should I do?</h4>
              <p>A: Try these steps:</p>
              <ol>
                <li>Close the app completely and reopen it</li>
                <li>Restart your device</li>
                <li>Update to the latest version of {app.name}</li>
                <li>Reinstall the app (note: this may reset your {app.games ? 'scores' : 'data'})</li>
              </ol>
            </div>

            <div className="faq-item">
              <h4>Q: {app.games ? 'Games are' : 'The app is'} running slowly. How can I fix this?</h4>
              <p>A: Try:</p>
              <ol>
                <li>Close other apps running in the background</li>
                <li>Restart your device</li>
                <li>Ensure you have the latest app version</li>
              </ol>
            </div>

            <div className="faq-item">
              <h4>Q: Why do I see ads?</h4>
              <p>A: Ads help us keep {app.name} free for everyone. We try to show ads at natural break points to minimize interruption.</p>
            </div>
          </div>

          <div className="faq-category">
            <h3>Privacy & Data</h3>
            
            <div className="faq-item">
              <h4>Q: What data do you collect?</h4>
              <p>A: We collect minimal data for analytics and advertising purposes. See our <Link to={`/${app.id}/privacy-policy`}>Privacy Policy</Link> for details.</p>
            </div>

            <div className="faq-item">
              <h4>Q: How do I delete my data?</h4>
              <p>A: Since we don't collect personal data, there's nothing to delete on our servers. To remove local data, simply uninstall the app.</p>
            </div>
          </div>
        </section>

        <section className="contact-section">
          <h2>📧 Contact Us</h2>
          <p>Couldn't find your answer? We'd love to hear from you!</p>
          
          <div className="contact-card">
            <p><strong>Email:</strong> <a href={`mailto:${app.supportEmail}`}>{app.supportEmail}</a></p>
            <p>Please include:</p>
            <ul>
              <li>Your device and OS version</li>
              <li>Description of your issue or feedback</li>
              <li>Screenshots (if applicable)</li>
            </ul>
            <p className="response-time">We typically respond within 24-48 hours.</p>
          </div>
        </section>

        <section className="feedback-section">
          <h2>💡 Feedback & Suggestions</h2>
          <p>
            Have an idea for a new {app.games ? 'game or ' : ''}feature? We're all ears! Send your suggestions to <a href={`mailto:${app.supportEmail}`}>{app.supportEmail}</a>
          </p>
          <p>
            If you're enjoying {app.name}, please consider leaving a review on the App Store or Google Play. It really helps! ⭐⭐⭐⭐⭐
          </p>
        </section>

        <div className="support-footer">
          <p><strong>Thank you for using {app.name}!</strong></p>
          <p>© {new Date().getFullYear()} {app.name}. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
