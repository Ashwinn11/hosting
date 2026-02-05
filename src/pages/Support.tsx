import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle, ChevronDown, Mail, HelpCircle } from 'lucide-react';
import { useAppDetails } from '../presentation/hooks/useAppDetails';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import './LegalPage.css';

export default function Support() {
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
            <h1 className="header-title">{isPlayPulse ? 'Support Center' : 'Help & Support'}</h1>
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
                  <MessageCircle size={48} color="#70CFFF" />
                </div>
                <h3>Frequently Asked Questions</h3>
              </div>

              <section className="legal-section fade-in">
                 <AccordionItem 
                    question="How is my Gut Health Score calculated?" 
                    answer="Your score is based on the Bristol Stool Scale, symptom frequency, regularity of logs, and the absence of medical red flags (like blood or mucus)." 
                  />
                  <AccordionItem 
                    question="How does trigger detection work?" 
                    answer="Our algorithm analyzes what you eat 2-24 hours before you log symptoms or unhealthy stool types. It weights recent meals higher to identify peak suspects." 
                  />
                  <AccordionItem 
                    question="Is my data shared with anyone?" 
                    answer="No. All your health data is stored securely and is never sold to third parties or shared with advertisers. You have full control over your data." 
                  />
              </section>

              <section className="legal-section fade-in">
                <Card className="info-card highlight-card" style={{ backgroundColor: '#FF7495', color: 'white' }}>
                  <h3 style={{ color: 'white', marginBottom: '8px' }}>Still have questions?</h3>
                  <p style={{ color: 'white', marginBottom: '16px' }}>
                    Our team is happy to help with any technical issues or feedback!
                  </p>
                  <Button as="a" href="mailto:support@gutbuddy.app" style={{ backgroundColor: 'white', color: '#FF7495', width: '100%', justifyContent: 'center' }}>
                    Email Support
                  </Button>
                </Card>
              </section>
              
              <div className="legal-footer">
                <p>Gut Buddy v1.0.0</p>
              </div>
            </>
          )}

          {isPlayPulse && (
            <>
               <div className="policy-intro fade-in">
                 <HelpCircle size={48} color="#4ECDC4" style={{ marginBottom: '20px' }} />
                 <p className="intro-text">
                   Welcome to PlayPulse Support! We're here to help you have the best gaming experience.
                 </p>
               </div>

               <section className="legal-section fade-in">
                 <div className="section-title-row">
                   <HelpCircle size={20} className="text-primary" />
                   <h2>General Questions</h2>
                 </div>
                 <div className="list-group">
                   <AccordionItem 
                     question="Is PlayPulse free to download?" 
                     answer="PlayPulse is completely free to download and play. The app is supported by advertisements." 
                   />
                   <AccordionItem 
                     question="Do I need an internet connection to play?" 
                     answer="No! All games work offline. You only need internet for ads to load." 
                   />
                    <AccordionItem 
                    question="The app crashes when I open it. What should I do?" 
                    answer="Try these steps: 1) Close the app completely and reopen it, 2) Restart your device, 3) Update to the latest version of PlayPulse. If the problem continues, email us with your device details."
                  />
                  <AccordionItem 
                    question="Games are running slowly. How can I fix this?" 
                    answer="Try: 1) Close other apps running in the background, 2) Restart your device, 3) Ensure you have the latest app version."
                  />
                 </div>
               </section>

               <section className="legal-section fade-in">
                 <div className="section-title-row">
                   <Mail size={20} className="text-secondary" />
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
                   <Button as="a" href="mailto:support@playpulsegames.com" icon={Mail} className="w-full">
                     Email Support
                   </Button>
                 </div>
               </section>
            </>
          )}
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
