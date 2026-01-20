import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, CheckCircle, AlertTriangle, Scale, Copyright, Edit, CreditCard, UserCheck, Heart, Mail } from 'lucide-react';
import { getAppById } from '../data/apps';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import './LegalPage.css';

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

  const isGutBuddy = app.id === 'gutbuddy';

  return (
    <div className="legal-page">
      <header className="legal-header glass">
        <Container>
          <div className="header-row">
            <Link to={`/${app.id}`} className="back-btn">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="header-title">Terms of Service</h1>
            <div className="header-placeholder"></div>
          </div>
        </Container>
      </header>

      <main className="legal-content">
        <Container>
          <div className="policy-intro fade-in">
            <div className="policy-icon-wrapper">
              <Scale size={48} className="text-secondary" />
            </div>
            <p className="intro-text">
              By downloading, installing, or using {app.name}, you agree to be bound by these Terms of Service.
            </p>
            <div className="last-updated">
              Effective Date: January 20, 2026
            </div>
          </div>

          <section className="legal-section fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="section-title-row">
              <CheckCircle size={20} className="text-primary" />
              <h2>Acceptance of Terms</h2>
            </div>
            <p>
              By accessing and using {app.name} ("the App"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use the App.
            </p>
          </section>

          <section className="legal-section fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="section-title-row">
              <FileText size={20} className="text-accent" />
              <h2>Description of Service</h2>
            </div>
            <p>
              {isGutBuddy ? (
                <>{app.name} is a health tracking application designed to help you monitor and improve your digestive wellness. The App provides:</>
              ) : (
                <>{app.name} is a mobile gaming application that provides a collection of mini games for entertainment purposes. The app is provided "as is" and "as available."</>
              )}
            </p>
            {isGutBuddy && (
              <div className="list-group">
                <ul>
                  <li>Bowel movement and symptom tracking</li>
                  <li>Gut Health Scoring and analysis</li>
                  <li>Daily wellness missions and habit building</li>
                  <li>Food and trigger detection insights</li>
                  <li>Comprehensive health reports for personal use</li>
                </ul>
              </div>
            )}
          </section>

          {isGutBuddy && (
            <section className="legal-section fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="section-title-row">
                <UserCheck size={20} className="text-secondary" />
                <h2>User Accounts</h2>
              </div>
              <p>To use certain features of the App, you must create an account. You agree to:</p>
              <div className="list-group">
                <ul>
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Notify us immediately of any unauthorized access</li>
                  <li>Be responsible for all activities under your account</li>
                </ul>
              </div>
            </section>
          )}

          {isGutBuddy && (
            <section className="legal-section fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="section-title-row">
                <Heart size={20} className="text-accent" />
                <h2>Medical Disclaimer</h2>
              </div>
              <Card className="info-card highlight-card">
                <h3><AlertTriangle size={18} className="inline-icon" /> IMPORTANT</h3>
                <p>
                  <strong>{app.name} is not a medical device and does not provide medical advice.</strong> The information provided by the App is for educational and informational purposes only.
                </p>
                <p>You should:</p>
                <ul>
                  <li>Consult with qualified healthcare professionals for medical advice</li>
                  <li>Not use the App as a substitute for professional medical care</li>
                  <li>Seek immediate medical attention for serious health concerns</li>
                  <li>Verify all health insights with your healthcare provider</li>
                </ul>
              </Card>
            </section>
          )}

          {isGutBuddy && (
            <section className="legal-section fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="section-title-row">
                <CreditCard size={20} className="text-primary" />
                <h2>Subscription and Payments</h2>
              </div>
              <p>{app.name} offers both free and premium subscription tiers:</p>
              <div className="list-group">
                <ul>
                  <li>Basic features are available for free</li>
                  <li>Premium subscriptions provide advanced insights and historical data</li>
                  <li>Subscriptions auto-renew unless cancelled 24 hours before renewal via App Store settings</li>
                  <li>Refunds are subject to Apple App Store policies</li>
                  <li>We reserve the right to modify pricing with notice</li>
                </ul>
              </div>
            </section>
          )}

          <section className="legal-section fade-in" style={{ animationDelay: isGutBuddy ? '0.6s' : '0.3s' }}>
            <div className="section-title-row">
              <AlertTriangle size={20} className="text-orange-400" />
              <h2>{isGutBuddy ? 'Acceptable Use' : 'User Conduct'}</h2>
            </div>
            <Card className="info-card">
              <p>You agree not to:</p>
              <ul>
                <li>Use the App for any illegal purposes</li>
                <li>Attempt to reverse engineer or hack the App</li>
                <li>Upload malicious content or spam</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Interfere with other users' access to the App</li>
              </ul>
            </Card>
          </section>

          <section className="legal-section fade-in" style={{ animationDelay: isGutBuddy ? '0.7s' : '0.4s' }}>
            <div className="section-title-row">
              <Copyright size={20} className="text-secondary" />
              <h2>Intellectual Property</h2>
            </div>
            <p>
              All content, features, and functionality of {app.name}, including but not limited to text, graphics, logos, icons, images, and software, are the exclusive property of Briefly and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          {!isGutBuddy && (
            <section className="legal-section fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="section-title-row">
                <FileText size={20} className="text-primary" />
                <h2>Advertisements</h2>
              </div>
              <p>
                {app.name} is a free app that displays advertisements. By using the app, you consent to receiving ads. Advertisements are provided by third-party networks and are subject to their own terms and privacy policies.
              </p>
            </section>
          )}

          <section className="legal-section fade-in" style={{ animationDelay: isGutBuddy ? '0.8s' : '0.6s' }}>
            <div className="section-title-row">
              <Scale size={20} className="text-accent" />
              <h2>Limitation of Liability</h2>
            </div>
            <p>
              To the maximum extent permitted by law, {app.name} shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the App{isGutBuddy ? ', including but not limited to health outcomes or data loss' : ''}.
            </p>
          </section>

          <section className="legal-section fade-in" style={{ animationDelay: isGutBuddy ? '0.9s' : '0.7s' }}>
            <div className="section-title-row">
              <Edit size={20} className="text-primary" />
              <h2>Changes to Terms</h2>
            </div>
            <p>
              We reserve the right to modify these Terms of Service at any time. We will notify users of any material changes via email or in-app notification. Continued use of the App after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          {isGutBuddy && (
            <section className="legal-section fade-in" style={{ animationDelay: '1.0s' }}>
              <div className="section-title-row">
                <AlertTriangle size={20} className="text-secondary" />
                <h2>Termination</h2>
              </div>
              <p>
                We may terminate or suspend your account and access to the App immediately, without prior notice or liability, for any reason, including breach of these Terms. Upon termination, your right to use the App will immediately cease.
              </p>
            </section>
          )}

          <section className="legal-section fade-in" style={{ animationDelay: isGutBuddy ? '1.1s' : '0.8s' }}>
            <div className="section-title-row">
              <Mail size={20} className="text-accent" />
              <h2>Contact Information</h2>
            </div>
            <p>If you have any questions about these Terms of Service, please contact us at:</p>
            <a href={`mailto:${app.supportEmail}`} className="contact-link glass">
              <Mail size={20} />
              <span>{app.supportEmail}</span>
            </a>
          </section>
          
          <div className="legal-footer">
            <p>© {new Date().getFullYear()} Briefly. All rights reserved.</p>
            <p style={{ marginTop: '8px' }}>
              By using {app.name}, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
          </div>
        </Container>
      </main>
    </div>
  );
}
