import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle, ChevronDown, Mail, HelpCircle, Smartphone, Bug, Zap, Shield, Heart } from 'lucide-react';
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

  const isGutBuddy = app.id === 'gutbuddy';

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
              {isGutBuddy 
                ? `Welcome to ${app.name} Support! We're here to help you get the most out of your gut health tracking experience.`
                : `Welcome to ${app.name} Support! We're here to help you have the best gaming experience.`
              }
            </p>
          </div>

          {/* Getting Started */}
          <section className="legal-section fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="section-title-row">
              <HelpCircle size={20} className="text-primary" />
              <h2>{isGutBuddy ? 'Getting Started' : 'General Questions'}</h2>
            </div>
            
            <div className="list-group">
              {isGutBuddy ? (
                <>
                  <AccordionItem 
                    question="How do I create an account?" 
                    answer="Download the app from the App Store, tap 'Get Started', and follow the prompts to create your account using email or Apple Sign-In." 
                  />
                  <AccordionItem 
                    question="How is my Gut Health Score calculated?" 
                    answer="Your score is based on the Bristol Stool Scale, symptom frequency, regularity of logs, and the absence of medical red flags (like blood or mucus)." 
                  />
                  <AccordionItem 
                    question="Is Gut Buddy free to use?" 
                    answer="We offer a high-value tracking experience with premium features available for deeper insights and history." 
                  />
                </>
              ) : (
                <>
                  <AccordionItem 
                    question={`Is ${app.name} free to download?`} 
                    answer={`${app.name} is completely free to download and play. The app is supported by advertisements.`} 
                  />
                  <AccordionItem 
                    question="Do I need an internet connection to play?" 
                    answer="No! All games work offline. You only need internet for ads to load." 
                  />
                </>
              )}
            </div>
          </section>

          {/* Tracking & Insights (Gut Buddy only) */}
          {isGutBuddy && (
            <section className="legal-section fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="section-title-row">
                <Smartphone size={20} className="text-secondary" />
                <h2>Tracking & Insights</h2>
              </div>
              
              <div className="list-group">
                <AccordionItem 
                  question="How does trigger detection work?" 
                  answer="Our algorithm analyzes what you eat 2-24 hours before you log symptoms or unhealthy stool types to identify potential food triggers." 
                />
                <AccordionItem 
                  question="What are Daily Missions?" 
                  answer="Missions help you build better habits by tracking water intake, fiber, probiotics, and exercise." 
                />
                <AccordionItem 
                  question="How do I log a bowel movement?" 
                  answer="Tap the 'I just pooped!' button on the home screen and select the type that matches the Bristol Stool Scale." 
                />
              </div>
            </section>
          )}

          {/* Account & Privacy (Gut Buddy only) */}
          {isGutBuddy && (
            <section className="legal-section fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="section-title-row">
                <Shield size={20} className="text-accent" />
                <h2>Account & Privacy</h2>
              </div>
              
              <div className="list-group">
                <AccordionItem 
                  question="Is my data shared with anyone?" 
                  answer="No. Your health data is stored securely and is never sold to third parties or shared with advertisers. You have full control." 
                />
                <AccordionItem 
                  question="How do I delete my account?" 
                  answer="Go to Profile > Settings > Delete Account. Your data will be permanently removed within 30 days." 
                />
              </div>
            </section>
          )}

          {/* Technical Issues */}
          <section className="legal-section fade-in" style={{ animationDelay: isGutBuddy ? '0.5s' : '0.4s' }}>
            <div className="section-title-row">
              <Bug size={20} className="text-accent" />
              <h2>Technical Issues</h2>
            </div>
            
            <div className="list-group">
              <AccordionItem 
                question={isGutBuddy ? "The app is crashing. What should I do?" : "The app crashes when I open it. What should I do?"} 
                answer={`Try these steps: 1) ${isGutBuddy ? 'Update to the latest version' : 'Close the app completely and reopen it'}, 2) Restart your device, ${isGutBuddy ? '3) Ensure you have enough storage space' : '3) Update to the latest version of PlayPulse'}. If the problem continues, email us with your device details.`}
              />
              <AccordionItem 
                question={isGutBuddy ? "How do I update the app?" : "Games are running slowly. How can I fix this?"} 
                answer={isGutBuddy 
                  ? "Check the App Store for updates, or enable automatic updates in your device settings." 
                  : "Try: 1) Close other apps running in the background, 2) Restart your device, 3) Ensure you have the latest app version."
                }
              />
              {!isGutBuddy && (
                <AccordionItem 
                  question="Why do I see ads?" 
                  answer="Ads help us keep the app free for everyone. We try to show ads at natural break points to minimize interruption." 
                />
              )}
            </div>
          </section>

          {/* Health & Medical (Gut Buddy only) */}
          {isGutBuddy && (
            <section className="legal-section fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="section-title-row">
                <Heart size={20} className="text-secondary" />
                <h2>Health & Medical</h2>
              </div>
              
              <div className="list-group">
                <AccordionItem 
                  question={`Is ${app.name} a medical device?`} 
                  answer={`${app.name} provides educational insights only. Consult healthcare professionals for medical advice. See our Terms of Service for the full medical disclaimer.`} 
                />
                <AccordionItem 
                  question={`Can ${app.name} diagnose conditions?`} 
                  answer="No, our app cannot diagnose health conditions. It analyzes your logs for health patterns based on general nutritional and digestive knowledge." 
                />
              </div>
            </section>
          )}

          {/* Privacy & Data */}
          {!isGutBuddy && (
            <section className="legal-section fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="section-title-row">
                <Shield size={20} className="text-primary" />
                <h2>Privacy & Data</h2>
              </div>
              
              <div className="list-group">
                <AccordionItem 
                  question="What data do you collect?" 
                  answer="We collect minimal data for analytics and advertising purposes. See our Privacy Policy for details."
                />
                <AccordionItem 
                  question="How do I delete my data?" 
                  answer="Since we don't collect personal data, there's nothing to delete on our servers. To remove local data, simply uninstall the app." 
                />
              </div>
            </section>
          )}

          {/* Contact Section */}
          <section className="legal-section fade-in" style={{ animationDelay: isGutBuddy ? '0.7s' : '0.5s' }}>
            <div className="section-title-row">
              <MessageCircle size={20} className="text-secondary" />
              <h2>Contact Us</h2>
            </div>
            <p style={{ marginBottom: '16px' }}>
              {isGutBuddy ? "Have a question not covered here? We'd love to hear from you!" : "Couldn't find your answer? We'd love to hear from you!"}
            </p>
            <div className="contact-card glass" style={{ padding: '24px', borderRadius: '24px' }}>
              <p style={{ marginBottom: '12px', color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
                {isGutBuddy 
                  ? "Email: " + app.supportEmail
                  : "Please include your device and OS version, description of your issue or feedback, and screenshots if applicable."
                }
              </p>
              <p style={{ marginBottom: '16px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                {isGutBuddy ? "Response Time: We aim to respond within 24-48 hours during business days." : "We typically respond within 24-48 hours."}
              </p>
              <Button as="a" href={`mailto:${app.supportEmail}`} icon={Mail} className="w-full">
                Email Support
              </Button>
            </div>
          </section>

          {/* App Versions (Gut Buddy only) */}
          {isGutBuddy && (
            <section className="legal-section fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="section-title-row">
                <Smartphone size={20} className="text-primary" />
                <h2>App Versions & Compatibility</h2>
              </div>
              <p>
                {app.name} is available for iOS 15+. For the best experience, use the latest app version.
              </p>
            </section>
          )}

          {/* Feedback */}
          <section className="legal-section fade-in" style={{ animationDelay: isGutBuddy ? '0.9s' : '0.6s' }}>
            <div className="section-title-row">
              <Zap size={20} className="text-accent" />
              <h2>Feedback{isGutBuddy ? '' : ' & Suggestions'}</h2>
            </div>
            <p>
              {isGutBuddy 
                ? `We value your feedback! Help us improve by rating the app in the store or sending suggestions to ${app.supportEmail}.`
                : `Have an idea for a new game or feature? We're all ears! Send your suggestions to ${app.supportEmail}.`
              }
            </p>
            {!isGutBuddy && (
              <p style={{ marginTop: '12px', fontSize: '0.9375rem' }}>
                If you're enjoying {app.name}, please consider leaving a review on the App Store or Google Play. It really helps! ⭐⭐⭐⭐⭐
              </p>
            )}
          </section>
          
          <div className="legal-footer">
            <p>{isGutBuddy ? `Thank you for using ${app.name}. We're committed to helping you make informed food choices for better gut health!` : `Thank you for playing ${app.name}!`}</p>
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
