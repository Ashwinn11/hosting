import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, Mail, Database, UserX, Brain, Heart, AlertTriangle } from 'lucide-react';
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

  const isGutScan = app.id === 'gutscan';

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
              {isGutScan 
                ? "At GutScan, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application."
                : "Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our mobile application."
              }
            </p>
            <div className="last-updated">
              Effective Date: January 5, 2026
            </div>
          </div>

          {isGutScan ? (
            // GutScan Privacy Policy
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
                    <li>Name (optional)</li>
                    <li>Profile picture (optional)</li>
                    <li>Authentication credentials</li>
                  </ul>
                </Card>
                
                <Card className="info-card">
                  <h3>Health and Dietary Information</h3>
                  <p>To provide personalized insights, we collect:</p>
                  <ul>
                    <li>Food photos you upload</li>
                    <li>Dietary preferences and restrictions</li>
                    <li>Food sensitivities and triggers</li>
                    <li>Gut health goals</li>
                    <li>Scan history and results</li>
                  </ul>
                </Card>

                <Card className="info-card">
                  <h3>Usage Data</h3>
                  <p>We automatically collect:</p>
                  <ul>
                    <li>Device information (model, OS version)</li>
                    <li>App usage statistics</li>
                    <li>Crash reports and diagnostics</li>
                    <li>IP address and location data (if permitted)</li>
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
                    <li>Provide and maintain our AI-powered food analysis service</li>
                    <li>Generate personalized gut health insights</li>
                    <li>Track your progress and maintain scan history</li>
                    <li>Send you notifications and reminders (if enabled)</li>
                    <li>Improve our AI models and app functionality</li>
                    <li>Provide customer support</li>
                    <li>Detect and prevent fraud or abuse</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>
              </section>

              <section className="legal-section fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="section-title-row">
                  <Brain size={20} className="text-primary" />
                  <h2>AI and Machine Learning</h2>
                </div>
                
                <Card className="info-card highlight-card">
                  <h3><AlertTriangle size={18} className="inline-icon" /> Important: Third-Party AI Processing</h3>
                  <p>
                    GutScan uses <strong>Google's Gemini AI</strong>, a third-party artificial intelligence service, to analyze your food images. By using our scanning feature, you explicitly consent to sharing your food photos with Google for AI processing.
                  </p>
                  
                  <h4>When you scan food with GutScan:</h4>
                  <ul>
                    <li>Your photos are transmitted to Google's Gemini AI services for real-time analysis</li>
                    <li>Google's AI analyzes images to identify ingredients, nutritional content, and potential gut health impacts</li>
                    <li>We receive analysis results but do not permanently store your original photos on our servers</li>
                    <li>Google may process your images according to their own privacy policy</li>
                    <li>You can withdraw consent by discontinuing use of the scanning feature</li>
                  </ul>

                  <p><strong>Data Minimization:</strong> We only send food images to Google AI. We do not share your personal information, health history, or account details with the AI service.</p>
                  
                  <p><strong>Anonymized Learning:</strong> We may use anonymized, aggregated scan data (without any identifying information) to improve our AI models and app functionality.</p>

                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="contact-link glass" style={{ marginTop: '12px' }}>
                    <span>Google's Privacy Policy</span>
                  </a>
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
                    <li>Passwords are hashed and never stored in plain text</li>
                    <li>Data is stored on secure Supabase servers</li>
                    <li>Regular security audits and updates</li>
                    <li>Access controls and authentication protocols</li>
                  </ul>
                </div>
                <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>
                  However, no method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
                </p>
              </section>

              <section className="legal-section fade-in" style={{ animationDelay: '0.5s' }}>
                <div className="section-title-row">
                  <Database size={20} className="text-secondary" />
                  <h2>Data Sharing and Disclosure</h2>
                </div>
                <p><strong>We do not sell your personal information.</strong> We may share data with:</p>
                
                <Card className="info-card">
                  <h3>Service Providers</h3>
                  <ul>
                    <li>Google (Gemini AI for food analysis)</li>
                    <li>Supabase (database and authentication)</li>
                    <li>Analytics providers (anonymized data only)</li>
                    <li>Payment processors (for subscriptions)</li>
                  </ul>
                </Card>

                <Card className="info-card">
                  <h3>Legal Requirements</h3>
                  <p>We may disclose your information if required by law or to:</p>
                  <ul>
                    <li>Comply with legal processes</li>
                    <li>Protect our rights and property</li>
                    <li>Prevent fraud or security issues</li>
                    <li>Protect user safety</li>
                  </ul>
                </Card>

                <Card className="info-card highlight-card">
                  <h3><Heart size={18} className="inline-icon" /> Health Data Restrictions</h3>
                  <p>In compliance with Apple App Store guidelines, we strictly adhere to the following restrictions:</p>
                  <ul>
                    <li>Health and dietary data is <strong>NEVER</strong> used for advertising or marketing purposes</li>
                    <li>Health data is <strong>NEVER</strong> disclosed to third parties for advertising or data mining</li>
                    <li>Health data is <strong>NOT</strong> stored in iCloud - only on secure Supabase servers</li>
                    <li>You maintain full control over your health data and can delete it at any time</li>
                    <li>No Protected Health Information (PHI) is included in push notifications</li>
                  </ul>
                </Card>
              </section>

              <section className="legal-section fade-in" style={{ animationDelay: '0.6s' }}>
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
                    <li>Opt-out of marketing communications</li>
                    <li>Withdraw consent for data processing</li>
                  </ul>
                </div>
                <p style={{ marginTop: '1rem' }}>
                  To exercise these rights, visit your Profile settings or contact us at {app.supportEmail}.
                </p>
              </section>

              <section className="legal-section fade-in" style={{ animationDelay: '0.7s' }}>
                <div className="section-title-row">
                  <Database size={20} className="text-accent" />
                  <h2>Data Retention</h2>
                </div>
                <p>
                  We retain your data for as long as your account is active or as needed to provide services. When you delete your account:
                </p>
                <div className="list-group">
                  <ul>
                    <li>Personal data is permanently deleted within 30 days</li>
                    <li>Anonymized usage data may be retained for analytics</li>
                    <li>Legal or regulatory data may be retained as required</li>
                  </ul>
                </div>
              </section>

              <section className="legal-section fade-in" style={{ animationDelay: '0.8s' }}>
                <div className="section-title-row">
                  <UserX size={20} className="text-secondary" />
                  <h2>Children's Privacy</h2>
                </div>
                <p>
                  GutScan is not intended for children under 13 years of age. We do not knowingly collect personal information from children. If you believe we have collected data from a child, please contact us immediately.
                </p>
              </section>

              <section className="legal-section fade-in" style={{ animationDelay: '0.9s' }}>
                <div className="section-title-row">
                  <Lock size={20} className="text-primary" />
                  <h2>International Data Transfers</h2>
                </div>
                <p>
                  Your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.
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
