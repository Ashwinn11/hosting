import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle, ChevronDown, Mail, HelpCircle, Smartphone, Bug, Zap, Shield, Camera, Heart, CreditCard, AlertTriangle } from 'lucide-react';
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

  const isGutScan = app.id === 'gutscan';

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
              {isGutScan 
                ? `Welcome to ${app.name} Support! We're here to help you get the most out of your food analysis experience.`
                : `Welcome to ${app.name} Support! We're here to help you have the best gaming experience.`
              }
            </p>
          </div>

          {/* Getting Started */}
          <section className="legal-section fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="section-title-row">
              <HelpCircle size={20} className="text-primary" />
              <h2>{isGutScan ? 'Getting Started' : 'General Questions'}</h2>
            </div>
            
            <div className="list-group">
              {isGutScan ? (
                <>
                  <AccordionItem 
                    question="How do I create an account?" 
                    answer="Download the app from the App Store or Google Play, tap 'Sign Up', and follow the prompts to create your account with email and password." 
                  />
                  <AccordionItem 
                    question="Is GutScan free to use?" 
                    answer="Yes! We offer a free tier with limited daily scans. Upgrade to premium for unlimited scans and advanced features." 
                  />
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </section>

          {/* Scanning Food (GutScan only) */}
          {isGutScan && (
            <section className="legal-section fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="section-title-row">
                <Camera size={20} className="text-secondary" />
                <h2>Scanning Food</h2>
              </div>
              
              <div className="list-group">
                <AccordionItem 
                  question="How does the food scanning work?" 
                  answer="Take a clear photo of your food using the camera in the app. Our AI analyzes the image to identify ingredients and assess gut health impact." 
                />
                <AccordionItem 
                  question="What types of food can I scan?" 
                  answer="You can scan any prepared meal, dish, or individual food items. For best results, ensure good lighting and clear focus on the food." 
                />
                <AccordionItem 
                  question="Why is my scan not working?" 
                  answer="Make sure you have a stable internet connection and the app has camera permissions. If issues persist, try restarting the app or updating to the latest version." 
                />
              </div>
            </section>
          )}

          {/* Account & Data (GutScan only) */}
          {isGutScan && (
            <section className="legal-section fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="section-title-row">
                <Shield size={20} className="text-accent" />
                <h2>Account & Data</h2>
              </div>
              
              <div className="list-group">
                <AccordionItem 
                  question="How do I delete my account?" 
                  answer="Go to Profile > Account Settings > Delete Account. Your data will be permanently removed within 30 days." 
                />
                <AccordionItem 
                  question="Is my data secure?" 
                  answer="Yes, we use industry-standard encryption and store data on secure servers. Review our Privacy Policy for full details." 
                />
              </div>
            </section>
          )}

          {/* Subscriptions (GutScan only) */}
          {isGutScan && (
            <section className="legal-section fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="section-title-row">
                <CreditCard size={20} className="text-primary" />
                <h2>Subscriptions</h2>
              </div>
              
              <div className="list-group">
                <AccordionItem 
                  question="How do I cancel my subscription?" 
                  answer="Manage subscriptions through your App Store or Google Play account settings. Cancellations take effect at the end of the current billing period." 
                />
                <AccordionItem 
                  question="Can I get a refund?" 
                  answer="Refunds are handled by Apple or Google according to their policies. Contact their support for assistance." 
                />
              </div>
            </section>
          )}

          {/* Games (PlayPulse only) */}
          {!isGutScan && app.games && (
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
          <section className="legal-section fade-in" style={{ animationDelay: isGutScan ? '0.5s' : '0.3s' }}>
            <div className="section-title-row">
              <Bug size={20} className="text-accent" />
              <h2>Technical Issues</h2>
            </div>
            
            <div className="list-group">
              <AccordionItem 
                question={isGutScan ? "The app is crashing. What should I do?" : "The app crashes when I open it. What should I do?"} 
                answer={`Try these steps: 1) ${isGutScan ? 'Update to the latest version' : 'Close the app completely and reopen it'}, 2) Restart your device, ${isGutScan ? '3) Ensure you have enough storage space' : '3) Update to the latest version of PlayPulse'}. If the problem continues, email us with your device details.`}
              />
              <AccordionItem 
                question={isGutScan ? "How do I update the app?" : "Games are running slowly. How can I fix this?"} 
                answer={isGutScan 
                  ? "Check the App Store or Google Play for updates, or enable automatic updates in your device settings." 
                  : "Try: 1) Close other apps running in the background, 2) Restart your device, 3) Ensure you have the latest app version."
                }
              />
              {!isGutScan && (
                <AccordionItem 
                  question="Why do I see ads?" 
                  answer="Ads help us keep PlayPulse free for everyone. We try to show ads at natural break points to minimize interruption." 
                />
              )}
            </div>
          </section>

          {/* Health & Medical (GutScan only) */}
          {isGutScan && (
            <section className="legal-section fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="section-title-row">
                <Heart size={20} className="text-secondary" />
                <h2>Health & Medical</h2>
              </div>
              
              <div className="list-group">
                <AccordionItem 
                  question="Is GutScan a medical device?" 
                  answer="No, GutScan provides educational insights only. Consult healthcare professionals for medical advice. See our Terms of Service for the full medical disclaimer." 
                />
                <AccordionItem 
                  question="Can GutScan diagnose conditions?" 
                  answer="No, our app cannot diagnose health conditions. It analyzes food for potential gut health impacts based on general nutritional knowledge." 
                />
              </div>
            </section>
          )}

          {/* Privacy & Data */}
          {!isGutScan && (
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
          <section className="legal-section fade-in" style={{ animationDelay: isGutScan ? '0.7s' : '0.5s' }}>
            <div className="section-title-row">
              <MessageCircle size={20} className="text-secondary" />
              <h2>Contact Us</h2>
            </div>
            <p style={{ marginBottom: '16px' }}>
              {isGutScan ? "Have a question not covered here? We'd love to hear from you!" : "Couldn't find your answer? We'd love to hear from you!"}
            </p>
            <div className="contact-card glass" style={{ padding: '24px', borderRadius: '24px' }}>
              <p style={{ marginBottom: '12px', color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
                {isGutScan 
                  ? "Email: " + app.supportEmail
                  : "Please include your device and OS version, description of your issue or feedback, and screenshots if applicable."
                }
              </p>
              <p style={{ marginBottom: '16px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                {isGutScan ? "Response Time: We aim to respond within 24-48 hours during business days." : "We typically respond within 24-48 hours."}
              </p>
              <Button as="a" href={`mailto:${app.supportEmail}`} icon={Mail} className="w-full">
                Email Support
              </Button>
            </div>
          </section>

          {/* App Versions (GutScan only) */}
          {isGutScan && (
            <section className="legal-section fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="section-title-row">
                <Smartphone size={20} className="text-primary" />
                <h2>App Versions & Compatibility</h2>
              </div>
              <p>
                GutScan is available for iOS 12+ and Android 8+. For the best experience, use the latest app version.
              </p>
            </section>
          )}

          {/* Feedback */}
          <section className="legal-section fade-in" style={{ animationDelay: isGutScan ? '0.9s' : '0.6s' }}>
            <div className="section-title-row">
              <Zap size={20} className="text-accent" />
              <h2>Feedback{isGutScan ? '' : ' & Suggestions'}</h2>
            </div>
            <p>
              {isGutScan 
                ? `We value your feedback! Help us improve by rating the app in the store or sending suggestions to ${app.supportEmail}.`
                : `Have an idea for a new game or feature? We're all ears! Send your suggestions to ${app.supportEmail}.`
              }
            </p>
            {!isGutScan && (
              <p style={{ marginTop: '12px', fontSize: '0.9375rem' }}>
                If you're enjoying {app.name}, please consider leaving a review on the App Store or Google Play. It really helps! ⭐⭐⭐⭐⭐
              </p>
            )}
          </section>
          
          <div className="legal-footer">
            <p>{isGutScan ? `Thank you for using ${app.name}. We're committed to helping you make informed food choices for better gut health!` : `Thank you for playing ${app.name}!`}</p>
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
