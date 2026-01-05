import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <nav className="navbar glass">
        <div className="container">
          <Link to="/" className="logo">
            <span className="logo-icon">✨</span>
            <span className="logo-text">briefly.live</span>
          </Link>
          <div className="nav-links">
            <Link to="/" className="nav-link">Apps</Link>
          </div>
        </div>
      </nav>
      
      <main className="main-content">
        {children}
      </main>
      
      <footer className="footer">
        <div className="container">
          <p className="footer-text">
            © {new Date().getFullYear()} Briefly. All rights reserved.
          </p>
          <div className="footer-links">
            <a href="mailto:hello@briefly.live">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
