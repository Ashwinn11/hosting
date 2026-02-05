import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, CheckCircle, AlertTriangle, Scale, Copyright, Edit, CreditCard, UserCheck, Heart, Mail } from 'lucide-react';
import { useAppDetails } from '../presentation/hooks/useAppDetails';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import './LegalPage.css';

export default function TermsOfService() {
  const { appId } = useParams<{ appId: string }>();
  const { app } = useAppDetails(appId || '');
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!app || !pageRef.current) return;

    const root = pageRef.current;
    
    if (app.id === 'gutbuddy') {
      root.style.setProperty('--primary', '#FF7495');
      root.style.setProperty('--primary-light', '#FF9EB5');
      root.style.setProperty('--accent', '#FCE762');
      root.style.setProperty('--bg-primary', '#FFFFFF');
      root.style.setProperty('--text-primary', '#2D2D2D');
      root.style.setProperty('--text-secondary', '#666666');
      root.style.setProperty('--text-muted', '#999999');
      root.style.setProperty('--card-bg', '#F8F9FA');
      root.style.setProperty('--border', '#E8D9C0');
      root.style.setProperty('--bg-tertiary', '#F0F0F0');
    } else if (app.id === 'playpulse') {
      root.style.setProperty('--primary', '#4ECDC4');
      root.style.setProperty('--primary-light', '#7EDBD5');
      root.style.setProperty('--accent', '#FF6B6B');
      root.style.setProperty('--bg-primary', '#1a1a2e');
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', '#8b9bb4');
      root.style.setProperty('--text-muted', '#5c6b7f');
      root.style.setProperty('--card-bg', '#16213e');
      root.style.setProperty('--border', 'rgba(255, 255, 255, 0.1)');
      root.style.setProperty('--bg-tertiary', 'rgba(255, 255, 255, 0.05)');
    }
  }, [app]);

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
  const isPlayPulse = app.id === 'playpulse';

  return (
    <div className={`legal-page ${isGutBuddy ? 'gutbuddy-legal' : ''} ${isPlayPulse ? 'playpulse-legal' : ''}`} ref={pageRef}>
      <header className="legal-header">
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
          {isGutBuddy && (
            <>
              <div className="policy-intro fade-in">
                <div className="policy-icon-wrapper">
                  <Scale size={48} color="#70CFFF" />
                </div>
                <p className="intro-text">
                  By downloading, installing, or using Gut Buddy, you agree to be bound by these Terms of Service.
                </p>
                <div className="last-updated">
                  Effective Date: January 20, 2026
                </div>
              </div>

              <section className="legal-section fade-in">
                <div className="section-title-row">
                  <CheckCircle size={20} className="text-primary" />
                  <h2>Acceptance of Terms</h2>
                </div>
                <p>
                  By accessing and using Gut Buddy ("the App"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use the App.
                </p>
              </section>

              <section className="legal-section fade-in">
                <div className="section-title-row">
                  <FileText size={20} className="text-accent" />
                  <h2>Description of Service</h2>
                </div>
                <p>
                  Gut Buddy is a health tracking application designed to help you monitor and improve your digestive wellness. The App provides:
                </p>
                <div className="list-group">
                  <ul>
                    <li>Bowel movement and symptom tracking</li>
                    <li>Gut Health Scoring and analysis</li>
                    <li>Daily wellness missions and habit building</li>
                    <li>Food and trigger detection insights</li>
                    <li>Comprehensive health reports for personal use</li>
                  </ul>
                </div>
              </section>

              <section className="legal-section fade-in">
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

              <section className="legal-section fade-in">
                <div className="section-title-row">
                  <Heart size={20} className="text-accent" />
                  <h2>Medical Disclaimer</h2>
                </div>
                <Card className="info-card highlight-card">
                  <h3><AlertTriangle size={18} className="inline-icon" /> IMPORTANT</h3>
                  <p>
                    <strong>Gut Buddy is not a medical device and does not provide medical advice.</strong> The information provided by the App is for educational and informational purposes only.
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

              <section className="legal-section fade-in">
                <div className="section-title-row">
                  <CreditCard size={20} className="text-primary" />
                  <h2>Subscription and Payments</h2>
                </div>
                <p>Gut Buddy offers both free and premium subscription tiers:</p>
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

              <section className="legal-section fade-in">
                <div className="section-title-row">
                  <AlertTriangle size={20} className="text-orange-400" />
                  <h2>Acceptable Use</h2>
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

              <section className="legal-section fade-in">
                <div className="section-title-row">
                  <Copyright size={20} className="text-secondary" />
                  <h2>Intellectual Property</h2>
                </div>
                <p>
                  All content, features, and functionality of Gut Buddy, including but not limited to text, graphics, logos, icons, images, and software, are the exclusive property of Briefly and are protected by international copyright, trademark, and other intellectual property laws.
                </p>
              </section>

              <section className="legal-section fade-in">
                <div className="section-title-row">
                  <Scale size={20} className="text-accent" />
                  <h2>Limitation of Liability</h2>
                </div>
                <p>
                  To the maximum extent permitted by law, Gut Buddy shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the App, including but not limited to health outcomes or data loss.
                </p>
              </section>

              <section className="legal-section fade-in">
                <div className="section-title-row">
                  <Edit size={20} className="text-primary" />
                  <h2>Changes to Terms</h2>
                </div>
                <p>
                  We reserve the right to modify these Terms of Service at any time. We will notify users of any material changes via email or in-app notification. Continued use of the App after changes constitutes acceptance of the modified terms.
                </p>
              </section>

              <section className="legal-section fade-in">
                <div className="section-title-row">
                  <AlertTriangle size={20} className="text-secondary" />
                  <h2>Termination</h2>
                </div>
                <p>
                  We may terminate or suspend your account and access to the App immediately, without prior notice or liability, for any reason, including breach of these Terms. Upon termination, your right to use the App will immediately cease.
                </p>
              </section>

              <section className="legal-section fade-in">
                <div className="section-title-row">
                  <Mail size={20} className="text-accent" />
                  <h2>Contact Information</h2>
                </div>
                <p>If you have any questions about these Terms of Service, please contact us at:</p>
                <a href="mailto:support@gutbuddy.app" className="contact-link glass">
                  <Mail size={20} />
                  <span>support@gutbuddy.app</span>
                </a>
              </section>
            </>
          )}

          {isPlayPulse && (
            <>
              <div className="policy-intro fade-in">
                 <p style={{ fontStyle: 'italic', color: '#8e8e93', marginBottom: '20px' }}>Last Updated: January 4, 2026</p>
              </div>

              <section className="legal-section fade-in">
                <h2>1. Acceptance of Terms</h2>
                <p>
                  By downloading, installing, or using PlayPulse ("the App"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the App.
                </p>
              </section>

              <section className="legal-section fade-in">
                <h2>2. Description of Service</h2>
                <p>
                  PlayPulse is a mobile gaming application that provides access to multiple mini-games including:
                </p>
                <ul>
                  <li>Bubble Shooter</li>
                  <li>Brick Breaker</li>
                  <li>Color Switch</li>
                  <li>Snake Retro</li>
                  <li>Block Blast</li>
                  <li>2048</li>
                  <li>Memory Match</li>
                  <li>Flappy Bird</li>
                  <li>Fruit Ninja</li>
                </ul>
                <p>The App is provided free of charge and is supported by advertisements.</p>
              </section>

              <section className="legal-section fade-in">
                <h2>3. User Accounts</h2>
                <p>
                  The App does not require user registration or accounts. All game progress and statistics are stored locally on your device.
                </p>
              </section>

              <section className="legal-section fade-in">
                <h2>4. Acceptable Use</h2>
                <p>
                  You agree to use the App only for lawful purposes and in accordance with these Terms. You agree not to:
                </p>
                <ul>
                  <li>Modify, reverse engineer, or decompile the App</li>
                  <li>Use the App in any way that violates applicable laws or regulations</li>
                  <li>Attempt to gain unauthorized access to any portion of the App</li>
                  <li>Use any automated system to access the App</li>
                  <li>Remove or modify any copyright or proprietary notices</li>
                </ul>
              </section>

              <section className="legal-section fade-in">
                <h2>5. Intellectual Property</h2>
                <p>
                  The App and its original content, features, and functionality are owned by PlayPulse and are protected by international copyright, trademark, and other intellectual property laws.
                </p>
              </section>

              <section className="legal-section fade-in">
                <h2>6. Advertising</h2>
                <p>
                  The App displays advertisements provided by Google AdMob. By using the App, you acknowledge and agree that:
                </p>
                <ul>
                  <li>Advertisements are an integral part of the App</li>
                  <li>We may display interstitial ads between games</li>
                  <li>Rewarded ads may be offered for in-game benefits</li>
                  <li>Ad content is controlled by third-party advertisers</li>
                </ul>
              </section>

              <section className="legal-section fade-in">
                <h2>7. Disclaimer of Warranties</h2>
                <p>
                  THE APP IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
                </p>
                <p>We do not warrant that:</p>
                <ul>
                  <li>The App will be uninterrupted or error-free</li>
                  <li>Defects will be corrected</li>
                  <li>The App is free of viruses or harmful components</li>
                  <li>Game progress will be preserved during updates</li>
                </ul>
              </section>

              <section className="legal-section fade-in">
                <h2>8. Limitation of Liability</h2>
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, OR GOODWILL.
                </p>
              </section>

              <section className="legal-section fade-in">
                <h2>9. Changes to the App</h2>
                <p>
                  We reserve the right to modify, suspend, or discontinue the App or any part thereof at any time without notice. We may also update these Terms from time to time. Continued use of the App after changes constitutes acceptance of the new Terms.
                </p>
              </section>

              <section className="legal-section fade-in">
                <h2>10. Termination</h2>
                <p>
                  You may stop using the App at any time by uninstalling it from your device. We reserve the right to terminate or suspend access to the App immediately, without prior notice, for any reason.
                </p>
              </section>

              <section className="legal-section fade-in">
                <h2>11. Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the App developer is located, without regard to its conflict of law provisions.
                </p>
              </section>

              <section className="legal-section fade-in">
                <h2>12. Contact Information</h2>
                <p>
                  If you have any questions about these Terms, please contact us at:
                </p>
                <p style={{ marginTop: '10px' }}>Email: support@playpulsegames.com</p>
              </section>

              <div className="legal-footer">
                <p>
                  By using PlayPulse, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                </p>
              </div>
            </>
          )}
        </Container>
      </main>
    </div>
  );
}
