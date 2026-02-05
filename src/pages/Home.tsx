import { Github, Twitter, Mail, ArrowUpRight, Cpu } from 'lucide-react';
import { apps } from '../data/apps';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const masterly = apps.find(a => a.id === 'masterly');
  const playpulse = apps.find(a => a.id === 'playpulse');
  const gutbuddy = apps.find(a => a.id === 'gutbuddy');

  return (
    <div className="home personal-home">
      <div className="bento-container fade-in">
        
        {/* 1. Bio / Identity Tile (Large) */}
        <div className="bento-card bio-card">
          <div className="bio-content">
            <div className="bio-header">
              <img src="/favicon.png" alt="Ashwin" className="bio-avatar" />
              <div className="status-badge">
                <span className="status-dot"></span>
                Available for work
              </div>
            </div>
            <h1>Ashwin Anbazhagan</h1>
            <p className="bio-text">
              Indie Hacker & Product Engineer. <br/>
              I build high-quality mobile & web apps that solve real problems.
              Turning ideas into reality, one pixel at a time.
            </p>
            <div className="social-row">
              <a href="#" className="social-btn" aria-label="Twitter"><Twitter size={20} /></a>
              <a href="#" className="social-btn" aria-label="GitHub"><Github size={20} /></a>
              <a href="mailto:ashwin@briefly.live" className="social-btn" aria-label="Email"><Mail size={20} /></a>
            </div>
          </div>
        </div>

        {/* 2. Masterly (Hero Project Tile - External) */}
        {masterly && (
          <a href={masterly.externalUrl} target="_blank" rel="noreferrer" className="bento-card app-card masterly-card group">
            <div className="card-content">
              <div className="app-icon-box">
                <img src={masterly.icon} alt="Masterly" />
              </div>
              <div className="app-text">
                <h3>{masterly.name}</h3>
                <p>{masterly.tagline}</p>
              </div>
              <div className="arrow-icon"><ArrowUpRight size={24} /></div>
            </div>
          </a>
        )}

        {/* 3. Tech Stack / Info Tile (Small) */}
        <div className="bento-card tech-card">
          <Cpu size={32} className="mb-4 text-gray-500" />
          <h4 className="text-lg font-bold mb-2">Tech Stack</h4>
          <div className="tags-cloud">
            <span>React Native</span>
            <span>Expo</span>
            <span>Supabase</span>
            <span>TypeScript</span>
            <span>Node.js</span>
            <span>Swift</span>
          </div>
        </div>

        {/* 4. PlayPulse (Medium Tile - Internal) */}
        {playpulse && (
          <Link to="/playpulse" className="bento-card app-card playpulse-card group">
            <div className="card-content">
              <div className="app-icon-box">
                <img src={playpulse.icon} alt="PlayPulse" />
              </div>
              <div className="app-text">
                <h3>{playpulse.name}</h3>
                <p>10+ Games. Offline.</p>
              </div>
              <div className="arrow-icon"><ArrowUpRight size={24} /></div>
            </div>
          </Link>
        )}

        {/* 5. Gut Buddy (Medium Tile - Internal) */}
        {gutbuddy && (
          <Link to="/gutbuddy" className="bento-card app-card gutbuddy-card group">
            <div className="card-content">
              <div className="app-icon-box">
                <img src={gutbuddy.icon} alt="Gut Buddy" />
              </div>
              <div className="app-text">
                <h3>{gutbuddy.name}</h3>
                <p>Track. Understand. Heal.</p>
              </div>
              <div className="arrow-icon"><ArrowUpRight size={24} /></div>
            </div>
          </Link>
        )}

        {/* 6. Stats / CTA Tile */}
        <div className="bento-card stats-card">
          <div className="stat-item">
            <span className="stat-num">3+</span>
            <span className="stat-label">Apps Shipped</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">10k+</span>
            <span className="stat-label">Happy Users</span>
          </div>
           <div className="stat-item">
            <span className="stat-num">4.9</span>
            <span className="stat-label">Avg Rating</span>
          </div>
        </div>

      </div>
    </div>
  );
}