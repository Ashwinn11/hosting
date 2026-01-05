import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle, ChevronDown, Mail, HelpCircle, Smartphone, Bug, Zap, Shield } from 'lucide-react';
import { getAppById } from '../data/apps';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import './LegalPage.css';

export default function Support() {
  const { appId } = useParams<{ appId: string }>();
  const app = appId ? getAppById(appId) : undefined;
  
  if (!app) {
    return <div>App not found</div>;
  }

  return (
    <div className="legal-page">
      <header className="legal-header glass">
        <Container>
          <div className="header-row">
            <Link to={`/${app.id}`} className="back-btn">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="header-title">Support Center</h1>
            <div className="header-placeholder"></div>
          </div>
        </Container>
      </header>

      <main className="legal-content">
        <Container>
          <div className="policy-intro fade-in">
            <div className="policy-icon-wrapper">
              <HelpCircle size={48} className="text-accent" />
            </div>
            <p className="intro-text">
              Welcome to {app.name} Support! We're here to help you have the best gaming experience.
            </p>
          </div>

          {/* General Questions */}
          <section className="legal-section fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="section-title-row">
              <HelpCircle size={20} className="text-primary" />
              <h2>General Questions</h2>
            </div>
            
            <div className="list-group">
              <AccordionItem 
                question="Is PlayPulse free to download?" 
                answer="Yes! PlayPulse is completely free to download and play. The app is supported by advertisements." 
              />
              <AccordionItem 
                question="Do I need an internet connection to play?" 
                answer="No! All games in PlayPulse work offline. You only need internet for ads to load." 
              />
              <AccordionItem 
                question="What devices are supported?" 
                answer="PlayPulse supports iOS 13.0 and later (iPhone and iPod touch) and Android 6.0 and later." 
              />
              <AccordionItem 
                question="How do I save my progress?" 
                answer="Your game progress and high scores are automatically saved on your device." 
              />
            </div>
          </section>

          {/* Games */}
          {app.games && (
            <section className="legal-section fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="section-title-row">
                <Smartphone size={20} className="text-secondary" />
                <h2>Games</h2>
              </div>
              
              <div className="list-group">
                <AccordionItem 
                  question="How many games are included?" 
                  answer="PlayPulse currently includes 10+ mini games, with more being added regularly!" 
                />
                <AccordionItem 
                  question="Will you add more games?" 
                  answer="Yes! We're constantly working on new games. Follow our updates to see what's coming next." 
                />
                <AccordionItem 
                  question="I found a bug in a game. How do I report it?" 
                  answer={`Please email us at ${app.supportEmail} with your device model, operating system version, which game has the bug, and a description of the issue.`}
                />
              </div>
            </section>
          )}

          {/* Technical Issues */}
          <section className="legal-section fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="section-title-row">
              <Bug size={20} className="text-accent" />
              <h2>Technical Issues</h2>
            </div>
            
            <div className="list-group">
              <AccordionItem 
                question="The app crashes when I open it. What should I do?" 
                answer="Try these steps: 1) Close the app completely and reopen it, 2) Restart your device, 3) Update to the latest version of PlayPulse, 4) Reinstall the app (note: this may reset your scores)." 
              />
              <AccordionItem 
                question="Games are running slowly. How can I fix this?" 
                answer="Try: 1) Close other apps running in the background, 2) Restart your device, 3) Ensure you have the latest app version." 
              />
              <AccordionItem 
                question="Why do I see ads?" 
                answer="Ads help us keep PlayPulse free for everyone. We try to show ads at natural break points to minimize interruption." 
              />
            </div>
          </section>

          {/* Privacy & Data */}
          <section className="legal-section fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="section-title-row">
              <Shield size={20} className="text-primary" />
              <h2>Privacy & Data</h2>
            </div>
            
            <div className="list-group">
              <AccordionItem 
                question="What data do you collect?" 
                answer={`We collect minimal data for analytics and advertising purposes. See our Privacy Policy for details.`}
              />
              <AccordionItem 
                question="How do I delete my data?" 
                answer="Since we don't collect personal data, there's nothing to delete on our servers. To remove local data, simply uninstall the app." 
              />
            </div>
          </section>

          {/* Contact Section */}
          <section className="legal-section fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="section-title-row">
              <MessageCircle size={20} className="text-secondary" />
              <h2>Contact Us</h2>
            </div>
            <p style={{ marginBottom: '16px' }}>
              Couldn't find your answer? We'd love to hear from you!
            </p>
            <div className="contact-card glass" style={{ padding: '24px', borderRadius: '24px' }}>
              <p style={{ marginBottom: '12px', color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
                Please include your device and OS version, description of your issue or feedback, and screenshots if applicable.
              </p>
              <p style={{ marginBottom: '16px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                We typically respond within 24-48 hours.
              </p>
              <Button as="a" href={`mailto:${app.supportEmail}`} icon={Mail} className="w-full">
                Email Support
              </Button>
            </div>
          </section>

          {/* Feedback */}
          <section className="legal-section fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="section-title-row">
              <Zap size={20} className="text-accent" />
              <h2>Feedback & Suggestions</h2>
            </div>
            <p>
              Have an idea for a new game or feature? We're all ears! Send your suggestions to {app.supportEmail}.
            </p>
            <p style={{ marginTop: '12px', fontSize: '0.9375rem' }}>
              If you're enjoying {app.name}, please consider leaving a review on the App Store or Google Play. It really helps! ⭐⭐⭐⭐⭐
            </p>
          </section>
          
          <div className="legal-footer">
            <p>Thank you for playing {app.name}!</p>
            <p>© {new Date().getFullYear()} {app.name}. All rights reserved.</p>
          </div>
        </Container>
      </main>
    </div>
  );
}

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <button className="faq-trigger" onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        <ChevronDown size={20} className="chevron" style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }} />
      </button>
      {isOpen && <div className="faq-answer">{answer}</div>}
    </div>
  );
}
