import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, Mail, Database, UserX, AlertTriangle } from 'lucide-react';
import { getAppById } from '../data/apps';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import './LegalPage.css';

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

  const isGutBuddy = app.id === 'gutbuddy';

  return (
    <div className="legal-page">
      <header className="legal-header glass">
        <Container>
          <div className="header-row">
            <Link to={`/${app.id}`} className="back-btn">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="header-title">Privacy Policy</h1>
            <div className="header-placeholder"></div>
          </div>
        </Container>
      </header>

      <main className="legal-content">
        <Container>
          <div className="policy-intro fade-in">
            <div className="policy-icon-wrapper">
              <Shield size={48} className="text-primary" />
            </div>
            <p className="intro-text">
              {isGutBuddy 
                ? `At ${app.name}, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application.`
                : "Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our mobile application."
              }
            </p>
            <div className="last-updated">
              Effective Date: January 5, 2026
            </div>
          </div>

          {isGutBuddy ? (
            // Gut Buddy Privacy Policy
            <>
              <section className="legal-section fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="section-title-row">
                  <Database size={20} className="text-accent" />
                  <h2>Information We Collect</h2>
                </div>
                
                <Card className="info-card">
                  <h3>Personal Information</h3>
                  <p>When you create an account, we collect:</p>
                  <ul>
                    <li>Email address</li>
                    <li>Display name</li>
                    <li>Authentication credentials (securely managed by Supabase)</li>
                  </ul>
                </Card>
                
                <Card className="info-card">
                  <h3>Health Data</h3>
                  <p>To provide personalized insights, we collect:</p>
                  <ul>
                    <li>Bowel movement logs (Bristol scale, symptoms, timestamps)</li>
                    <li>Meal logs (food items, meal times)</li>
                    <li>Water, fiber, probiotic, and exercise tracking</li>
                    <li>Health symptoms and medical tags</li>
                  </ul>
                </Card>
              </section>

              <section className="legal-section fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="section-title-row">
                  <Eye size={20} className="text-secondary" />
                  <h2>How We Use Your Information</h2>
                </div>
                <p>We use the collected information to:</p>
                <div className="list-group">
                  <ul>
                    <li>Provide personalized gut health insights</li>
                    <li>Calculate your Gut Health Score</li>
                    <li>Identify potential food triggers</li>
                    <li>Track your health patterns over time</li>
                    <li>Provide customer support</li>
                    <li>Improve app functionality</li>
                  </ul>
                </div>
              </section>

              <section className="legal-section fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="section-title-row">
                  <AlertTriangle size={20} className="text-primary" />
                  <h2>Medical Disclaimer</h2>
                </div>
                
                <Card className="info-card highlight-card">
                  <h3><AlertTriangle size={18} className="inline-icon" /> Important: Not Medical Advice</h3>
                  <p>
                    {app.name} is a tracking tool and does not provide medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                  </p>
                </Card>
              </section>

              <section className="legal-section fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="section-title-row">
                  <Lock size={20} className="text-accent" />
                  <h2>Data Storage and Security</h2>
                </div>
                <p>We implement industry-standard security measures:</p>
                <div className="list-group">
                  <ul>
                    <li>Data is encrypted in transit using SSL/TLS</li>
                    <li>Authentication is securely handled by Supabase</li>
                    <li>Health data is never sold to third parties</li>
                    <li>We do not share your data with advertisers</li>
                  </ul>
                </div>
              </section>

              <section className="legal-section fade-in" style={{ animationDelay: '0.5s' }}>
                <div className="section-title-row">
                  <Shield size={20} className="text-primary" />
                  <h2>Your Privacy Rights</h2>
                </div>
                <p>You have the right to:</p>
                <div className="list-group">
                  <ul>
                    <li>Access your personal data</li>
                    <li>Correct inaccurate information</li>
                    <li>Delete your account and data</li>
                    <li>Export your data</li>
                  </ul>
                </div>
                <p style={{ marginTop: '1rem' }}>
                  To exercise these rights, visit your Profile settings in the app or contact us at {app.supportEmail}.
                </p>
              </section>
            </>
          ) : (
            // PlayPulse Privacy Policy
            <>
              <section className="legal-section fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="section-title-row">
                  <Database size={20} className="text-accent" />
                  <h2>Information We Collect</h2>
                </div>
                
                <Card className="info-card">
                  <h3>Information Collected Automatically</h3>
                  <p>When you use {app.name}, we may automatically collect:</p>
                  <ul>
                    <li><strong>Device Information:</strong> Device model, operating system version, unique device identifiers</li>
                    <li><strong>Usage Data:</strong> Game scores, play sessions, features used</li>
                    <li><strong>Advertising ID:</strong> Used to deliver personalized advertisements</li>
                  </ul>
                </Card>
                
                <Card className="info-card">
                  <h3>Information We DON'T Collect</h3>
                  <ul>
                    <li>We do NOT require account creation</li>
                    <li>We do NOT collect your name, email, or personal contact information</li>
                    <li>We do NOT access your photos, contacts, or location</li>
                  </ul>
                </Card>
              </section>

              <section className="legal-section fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="section-title-row">
                  <Eye size={20} className="text-secondary" />
                  <h2>How We Use Your Information</h2>
                </div>
                <p>We use collected information to:</p>
                <div className="list-group">
                  <ul>
                    <li>Provide and maintain the app</li>
                    <li>Improve user experience</li>
                    <li>Display relevant advertisements</li>
                    <li>Analyze app performance and fix bugs</li>
                  </ul>
                </div>
              </section>

              <section className="legal-section fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="section-title-row">
                  <Lock size={20} className="text-primary" />
                  <h2>Third-Party Services</h2>
                </div>
                <p>{app.name} uses third-party services that may collect information:</p>
                
                <Card className="info-card">
                  <h3>Google AdMob</h3>
                  <p>
                    We use Google AdMob to display advertisements. AdMob may collect device information and advertising identifiers to show relevant ads.
                  </p>
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="contact-link glass" style={{ marginTop: '12px' }}>
                    <span>Google Privacy Policy</span>
                  </a>
                </Card>

                <Card className="info-card">
                  <h3>Analytics</h3>
                  <p>
                    We may use analytics tools to understand how users interact with our app. This data is anonymized and aggregated.
                  </p>
                </Card>
              </section>

              <section className="legal-section fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="section-title-row">
                  <UserX size={20} className="text-accent" />
                  <h2>Children's Privacy</h2>
                </div>
                <p>
                  {app.name} is suitable for all ages. We do not knowingly collect personal information from children under 13. The app does not require any personal information to function.
                </p>
              </section>

              <section className="legal-section fade-in" style={{ animationDelay: '0.5s' }}>
                <div className="section-title-row">
                  <Shield size={20} className="text-secondary" />
                  <h2>Data Security</h2>
                </div>
                <p>
                  We implement appropriate security measures to protect your information. However, no method of electronic transmission or storage is 100% secure.
                </p>
              </section>

              <section className="legal-section fade-in" style={{ animationDelay: '0.6s' }}>
                <div className="section-title-row">
                  <Database size={20} className="text-primary" />
                  <h2>Data Retention</h2>
                </div>
                <p>
                  Gameplay data is stored locally on your device. We do not have access to your game saves or scores unless you explicitly share them.
                </p>
              </section>

              <section className="legal-section fade-in" style={{ animationDelay: '0.7s' }}>
                <div className="section-title-row">
                  <Lock size={20} className="text-accent" />
                  <h2>Your Rights</h2>
                </div>
                <p>You have the right to:</p>
                <div className="list-group">
                  <ul>
                    <li>Request deletion of your data by contacting us</li>
                    <li>Opt-out of personalized advertising through your device settings</li>
                    <li>Uninstall the app at any time, which removes all local data</li>
                  </ul>
                </div>
              </section>
            </>
          )}

          <section className="legal-section fade-in" style={{ animationDelay: '1s' }}>
            <div className="section-title-row">
              <Mail size={20} className="text-primary" />
              <h2>Contact Us</h2>
            </div>
            <p>If you have questions about this Privacy Policy, please contact us:</p>
            <a href={`mailto:${app.supportEmail}`} className="contact-link glass">
              <Mail size={20} />
              <span>{app.supportEmail}</span>
            </a>
          </section>
          
          <div className="legal-footer">
            <p>© {new Date().getFullYear()} {app.name}. All rights reserved.</p>
          </div>
        </Container>
      </main>
    </div>
  );
}
