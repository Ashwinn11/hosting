import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, CheckCircle, AlertTriangle, Scale, Copyright, Edit } from 'lucide-react';
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
              Effective Date: January 5, 2026
            </div>
          </div>

          <section className="legal-section fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="section-title-row">
              <CheckCircle size={20} className="text-primary" />
              <h2>Acceptance of Terms</h2>
            </div>
            <p>
              By downloading, installing, or using <strong>{app.name}</strong>, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the app.
            </p>
          </section>

          <section className="legal-section fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="section-title-row">
              <FileText size={20} className="text-accent" />
              <h2>Description of Service</h2>
            </div>
            <p>
              {app.name} is a mobile gaming application that provides a collection of mini games for entertainment purposes. The app is provided "as is" and "as available."
            </p>
          </section>

          <section className="legal-section fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="section-title-row">
              <AlertTriangle size={20} className="text-orange-400" />
              <h2>User Conduct</h2>
            </div>
            <Card className="info-card">
              <p>By using {app.name}, you agree to:</p>
              <ul>
                <li>Use the app for personal, non-commercial purposes only</li>
                <li>Not attempt to hack, reverse-engineer, or modify the app</li>
                <li>Not use the app for any illegal or unauthorized purpose</li>
                <li>Not interfere with or disrupt the app's functionality</li>
              </ul>
            </Card>
          </section>

          <section className="legal-section fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="section-title-row">
              <Copyright size={20} className="text-secondary" />
              <h2>Intellectual Property</h2>
            </div>
            <p>
              All content in {app.name}, including but not limited to games, graphics, sounds, and code, is the property of {app.name} or its licensors. You may not copy, modify, or distribute any content without permission.
            </p>
          </section>

          <section className="legal-section fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="section-title-row">
              <FileText size={20} className="text-primary" />
              <h2>Advertisements</h2>
            </div>
            <p>
              {app.name} is a free app that displays advertisements. By using the app, you consent to receiving ads. Advertisements are provided by third-party networks and are subject to their own terms and privacy policies.
            </p>
          </section>

          <section className="legal-section fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="section-title-row">
              <AlertTriangle size={20} className="text-accent" />
              <h2>Disclaimer of Warranties</h2>
            </div>
            <p>
              {app.name} is provided "as is" without warranties of any kind. We do not guarantee that the app will be error-free, uninterrupted, or free of viruses.
            </p>
          </section>

          <section className="legal-section fade-in" style={{ animationDelay: '0.7s' }}>
            <div className="section-title-row">
              <Scale size={20} className="text-secondary" />
              <h2>Limitation of Liability</h2>
            </div>
            <p>
              To the maximum extent permitted by law, {app.name} and its developers shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the app.
            </p>
          </section>

          <section className="legal-section fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="section-title-row">
              <Edit size={20} className="text-primary" />
              <h2>Modifications to Service</h2>
            </div>
            <p>
              We reserve the right to modify, suspend, or discontinue {app.name} at any time without notice. We may also add or remove games and features at our discretion.
            </p>
          </section>

          <section className="legal-section fade-in" style={{ animationDelay: '0.9s' }}>
            <div className="section-title-row">
              <FileText size={20} className="text-accent" />
              <h2>Changes to Terms</h2>
            </div>
            <p>
              We may update these Terms of Service from time to time. Continued use of the app after changes constitutes acceptance of the new terms.
            </p>
          </section>
          
          <div className="legal-footer">
            <p>© {new Date().getFullYear()} {app.name}. All rights reserved.</p>
          </div>
        </Container>
      </main>
    </div>
  );
}
