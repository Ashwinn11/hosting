import { type ReactNode } from 'react';
import { Mail } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useAppDetails } from '../presentation/hooks/useAppDetails';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const params = useParams();
  
  // Update document title and meta tags
  useDocumentTitle();
  
  // Detect if we're on an app-specific page
  const appId = params.appId;
  const { app: currentApp } = useAppDetails(appId || '');
  
  return (
    <div className="layout">
      <main className="main-content">
        {children}
      </main>
      
      <footer className="footer">
        <div className="container">
          <p className="footer-text">
            © {new Date().getFullYear()} {currentApp ? currentApp.name : 'Briefly'}. All rights reserved.
          </p>
          <div className="footer-links">
            <a href={`mailto:${currentApp ? currentApp.supportEmail : 'hello@briefly.live'}`} className="footer-link">
              <Mail size={16} />
              <span>Contact</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
