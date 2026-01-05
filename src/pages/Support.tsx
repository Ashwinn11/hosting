import { useParams, Link } from 'react-router-dom';
import { HelpCircle, Mail, Lightbulb, Star } from 'lucide-react';
import { getAppById } from '../data/apps';
import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { Card } from '../components/ui/Card';
import { BackLink } from '../components/ui/BackLink';
import { Button } from '../components/ui/Button';
import './Support.css';

export default function Support() {
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
    <div className="support-page">
      <Container size="small">
        <div className="support-header">
          <BackLink to={`/${app.id}`}>Back to {app.name}</BackLink>
          <h1 className="support-title">{app.name} Support</h1>
          <p className="support-subtitle">We're here to help you have the best experience!</p>
        </div>

        <div className="support-content">
          <Section className="faq-section">
            <div className="section-header-inline">
              <HelpCircle className="text-primary" size={24} />
              <h2>Frequently Asked Questions</h2>
            </div>

            <div className="faq-categories">
              <div className="faq-category">
                <h3>Technical Arcade Issues</h3>
                
                <div className="faq-grid">
                  <Card hover={false} className="faq-item">
                    <h4>My high score didn't save. Why?</h4>
                    <p>High scores are saved when a game session ends normally. If the app is closed abruptly or your device runs out of battery during play, the score might not commit to local storage.</p>
                  </Card>

                  <Card hover={false} className="faq-item">
                    <h4>The game feels "laggy". How can I fix it?</h4>
                    <p>PlayPulse is optimized for 60FPS. If you experience lag, try closing other heavy apps in the background or checking if your device is in "Low Power Mode," which can throttle game performance.</p>
                  </Card>

                  <Card hover={false} className="faq-item">
                    <h4>Can I play without ads?</h4>
                    <p>Currently, PlayPulse is supported by minimal ads between game sessions. This allows us to keep the entire arcade free for everyone. We are looking into an "Ad-Free" version for the future!</p>
                  </Card>
                </div>
              </div>

              {app.games && (
                <div className="faq-category">
                  <h3>Games</h3>
                  <div className="faq-grid">
                    <Card hover={false} className="faq-item">
                      <h4>How many games are included?</h4>
                      <p>{app.name} currently includes {app.games.length}+ mini games, with more being added regularly!</p>
                    </Card>

                    <Card hover={false} className="faq-item">
                      <h4>Will you add more games?</h4>
                      <p>Yes! We're constantly working on new games. Follow our updates to see what's coming next.</p>
                    </Card>

                    <Card hover={false} className="faq-item">
                      <h4>I found a bug. How do I report it?</h4>
                      <p>Please email us at <a href={`mailto:${app.supportEmail}`}>{app.supportEmail}</a> with your device model and OS version.</p>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          </Section>

          <Section className="contact-section">
            <div className="section-header-inline">
              <Mail className="text-primary" size={24} />
              <h2>Contact Us</h2>
            </div>
            <Card glass className="contact-card">
              <p>Couldn't find your answer? We'd love to hear from you!</p>
              <div className="contact-info">
                <strong>Email:</strong> <a href={`mailto:${app.supportEmail}`}>{app.supportEmail}</a>
              </div>
              <p className="response-time">We typically respond within 24-48 hours.</p>
              <Button as="a" href={`mailto:${app.supportEmail}`} className="mt-md">
                Send Message
              </Button>
            </Card>
          </Section>

          <Section className="feedback-section">
            <div className="section-header-inline">
              <Lightbulb className="text-primary" size={24} />
              <h2>Feedback & Suggestions</h2>
            </div>
            <Card className="feedback-card">
              <p>
                Have an idea for a new {app.games ? 'game or ' : ''}feature? We're all ears! Send your suggestions to our support email.
              </p>
              <div className="rating-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="var(--primary)" color="var(--primary)" />
                ))}
              </div>
              <p className="mt-sm">
                If you're enjoying {app.name}, please consider leaving a review. It really helps!
              </p>
            </Card>
          </Section>
        </div>

        <footer className="support-footer">
          <p>© {new Date().getFullYear()} {app.name}. All rights reserved.</p>
        </footer>
      </Container>
    </div>
  );
}
