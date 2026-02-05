import { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Shield, AlertTriangle } from 'lucide-react';
import { getAppById } from '../data/apps';
import { Container } from '../components/ui/Container';
import { Card } from '../components/ui/Card';
import './LegalPage.css';

export default function PrivacyPolicy() {
  const { appId } = useParams<{ appId: string }>();
  const app = appId ? getAppById(appId) : undefined;
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
            <h1 className="header-title">Privacy Policy</h1>
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
                  <Shield size={48} color="#FF7495" />
                </div>
              </div>

              <section className="legal-section fade-in">
                <Card className="info-card">
                  <h3>Your Privacy Matters</h3>
                  <p>
                    Gut Buddy is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal health information.
                  </p>
                </Card>
              </section>

              <section className="legal-section fade-in">
                <Card className="info-card highlight-card">
                  <div style={{ flexDirection: 'row', alignItems: 'center', marginBottom: '8px' }}>
                    <AlertTriangle size={20} color="#000" style={{ marginRight: '8px', display: 'inline' }} />
                    <span style={{ fontWeight: 'bold' }}>MEDICAL DISCLAIMER</span>
                  </div>
                  <p>
                    Gut Buddy is a tracking tool and does not provide medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                  </p>
                </Card>
              </section>

              <section className="legal-section fade-in">
                <Card className="info-card">
                  <h3>What We Collect</h3>
                  
                  <h4>Health Data:</h4>
                  <ul>
                    <li>Bowel movement logs (Bristol scale, symptoms, timestamps)</li>
                    <li>Meal logs (food items, meal times)</li>
                    <li>Water, fiber, probiotic, and exercise tracking</li>
                    <li>Health symptoms and medical tags</li>
                  </ul>

                  <h4>Account Data:</h4>
                  <ul>
                    <li>Email address</li>
                    <li>Display name</li>
                    <li>Authentication credentials (securely managed by Supabase)</li>
                  </ul>
                </Card>
              </section>

              <section className="legal-section fade-in">
                <Card className="info-card">
                  <h3>How We Use Your Data</h3>
                  <ul>
                    <li>Provide personalized gut health insights</li>
                    <li>Calculate your Gut Health Score</li>
                    <li>Identify potential food triggers</li>
                    <li>Track your health patterns over time</li>
                    <li>Generate health reports for your doctor</li>
                  </ul>
                </Card>
              </section>

              <section className="legal-section fade-in">
                <Card className="info-card">
                  <h3>Storage & Security</h3>
                  <ul>
                    <li>All data is stored locally on your device with encryption</li>
                    <li>Cloud backup via Supabase (optional)</li>
                    <li>Your health data is never sold to third parties</li>
                    <li>We do not share your data with advertisers</li>
                  </ul>
                </Card>
              </section>

              <section className="legal-section fade-in">
                <Card className="info-card">
                  <h3>Your Rights</h3>
                  <p>
                    You have the right to access, export, and delete all your health data at any time from the Profile screen.
                  </p>
                </Card>
              </section>

              <section className="legal-section fade-in">
                <Card className="info-card">
                  <h3>Third-Party Services</h3>
                  <p>We use Supabase for authentication and optional cloud backup:</p>
                  <ul>
                    <li>Privacy Policy: supabase.com/privacy</li>
                    <li>Data: Email address, encrypted health logs (if backup enabled)</li>
                    <li>Location: US-based servers</li>
                    <li>Purpose: Secure authentication and data sync across devices</li>
                  </ul>
                </Card>
              </section>

              <section className="legal-section fade-in">
                <Card className="info-card">
                  <h3>Data Retention</h3>
                  <ul>
                    <li>Health logs: Retained until you delete them</li>
                    <li>Account data: Retained while your account is active</li>
                    <li>Deleted data: Permanently removed within 30 days</li>
                    <li>Backup data: Removed from cloud servers within 30 days of deletion</li>
                  </ul>
                </Card>
              </section>

              <section className="legal-section fade-in">
                <Card className="info-card">
                  <h3>Age Restrictions</h3>
                  <p>
                    You must be at least 13 years old to use Gut Buddy. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                  </p>
                </Card>
              </section>

              <section className="legal-section fade-in">
                <Card className="info-card">
                  <h3>International Privacy Laws</h3>
                  <p>We comply with GDPR (EU), CCPA (California), and other applicable privacy laws. You have the right to:</p>
                  <ul>
                    <li>Access your data</li>
                    <li>Correct inaccurate data</li>
                    <li>Request data deletion</li>
                    <li>Export your data</li>
                    <li>Withdraw consent</li>
                    <li>Lodge a complaint with supervisory authorities</li>
                  </ul>
                </Card>
              </section>

              <section className="legal-section fade-in">
                <Card className="info-card">
                  <h3>Data Breach Notification</h3>
                  <p>
                    In the unlikely event of a data breach affecting your personal information, we will notify you via email within 72 hours and provide details about the breach, affected data, and steps we're taking to address it.
                  </p>
                </Card>
              </section>

              <section className="legal-section fade-in">
                <Card className="info-card">
                  <h3>Contact Us</h3>
                  <p>
                    If you have questions about this Privacy Policy or your data, please contact us at:
                  </p>
                  <p style={{ fontWeight: 'bold', marginTop: '8px' }}>privacy@gutbuddy.app</p>
                </Card>
              </section>
            </>
          )}

          {isPlayPulse && (
            <>
              <div className="policy-intro fade-in">
                 <p style={{ fontStyle: 'italic', color: '#8e8e93', marginBottom: '20px' }}>Last Updated: January 3, 2026</p>
              </div>

              <section className="legal-section fade-in">
                <h2>1. Introduction</h2>
                <p>
                  Welcome to PlayPulse ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information when you use our mobile application.
                </p>
              </section>

              <section className="legal-section fade-in">
                <h2>2. Information We Collect</h2>
                
                <h3>2.1 Information You Provide</h3>
                <p>
                  Our app does not require user accounts or sign-in. We do not collect personal information such as your name, email address, or contact information.
                </p>

                <h3>2.2 Automatically Collected Information</h3>
                <ul>
                  <li><strong>Game Statistics:</strong> We store your game scores, progress, and achievements locally on your device using AsyncStorage. This data never leaves your device.</li>
                  <li><strong>Advertising ID:</strong> We collect your device's advertising identifier (IDFA or AAID) to serve personalized advertisements through Google AdMob.</li>
                  <li><strong>Device Information:</strong> Basic device information may be collected by our advertising partners to optimize ad delivery.</li>
                </ul>
              </section>

              <section className="legal-section fade-in">
                <h2>3. How We Use Your Information</h2>
                <ul>
                  <li>To provide and maintain the game functionality</li>
                  <li>To track your game progress and statistics locally</li>
                  <li>To display relevant advertisements through Google AdMob</li>
                  <li>To improve our app and user experience</li>
                </ul>
              </section>

              <section className="legal-section fade-in">
                <h2>4. Advertising</h2>
                <p>
                  We use Google AdMob to display advertisements in our app. AdMob may collect and use data to provide personalized ads. You can control ad personalization through your device settings:
                </p>
                <ul>
                  <li><strong>iOS:</strong> Settings → Privacy & Security → Tracking → Allow Apps to Request to Track</li>
                  <li><strong>Android:</strong> Settings → Google → Ads → Opt out of Ads Personalization</li>
                </ul>
                <p style={{ marginTop: '10px' }}>
                  For more information about how Google uses data, visit: <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" style={{ color: '#4ECDC4' }}>https://policies.google.com/technologies/partner-sites</a>
                </p>
              </section>

              <section className="legal-section fade-in">
                <h2>5. Data Storage and Security</h2>
                <p>
                  All game data is stored locally on your device and is not transmitted to our servers. We do not have access to your game statistics or progress. If you uninstall the app, all local data will be deleted.
                </p>
              </section>

              <section className="legal-section fade-in">
                <h2>6. Children's Privacy</h2>
                <p>
                  Our app is suitable for all ages. We do not knowingly collect personal information from children. The app does not require any personal information to play.
                </p>
              </section>

              <section className="legal-section fade-in">
                <h2>7. Your Rights</h2>
                <ul>
                  <li>You can reset your game statistics at any time through the Stats screen</li>
                  <li>You can opt out of personalized advertising through your device settings</li>
                  <li>You can uninstall the app to remove all locally stored data</li>
                </ul>
              </section>

              <section className="legal-section fade-in">
                <h2>8. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy in the app. Changes are effective immediately upon posting.
                </p>
              </section>

              <section className="legal-section fade-in">
                <h2>9. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <p style={{ marginTop: '10px' }}>Email: support@playpulsegames.com</p>
              </section>
            </>
          )}

          {!isGutBuddy && !isPlayPulse && (
            <div className="error-state">
              <p>Privacy Policy not available for this app.</p>
            </div>
          )}
        </Container>
      </main>
    </div>
  );
}