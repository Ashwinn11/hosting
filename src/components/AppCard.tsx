import { Link } from 'react-router-dom';
import { ChevronRight, Smartphone, Layout as Android, Rocket, Shield, Zap } from 'lucide-react';
import { type App } from '../data/apps';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import './AppCard.css';

interface AppCardProps {
  app: App;
}

export default function AppCard({ app }: AppCardProps) {
  const isPlayPulse = app.id === 'playpulse';
  
  return (
    <Link to={`/${app.id}`} className="app-card-wrapper">
      <Card className="app-card" style={{ '--card-gradient': app.gradient } as React.CSSProperties}>
        <div className="app-card-bg"></div>
        <div className="app-card-content">
          <div className="app-card-header">
            <div className="app-icon-container">
              {app.icon.startsWith('/') ? (
                <img src={app.icon} alt={`${app.name} logo`} className="app-icon-img" />
              ) : (
                <span className="app-icon-emoji">{app.icon}</span>
              )}
            </div>
            <div className="app-info">
              <h3 className="app-name">{app.name}</h3>
              <div className="app-badges-row">
                <Badge variant="accent" size="sm">Premium</Badge>
                {isPlayPulse && <Badge variant="primary" size="sm">10+ Games</Badge>}
              </div>
            </div>
          </div>
          
          <p className="app-description">{app.description}</p>
          
          <div className="app-highlights">
            <div className="highlight-item"><Rocket size={14} /><span>Fast</span></div>
            <div className="highlight-item"><Shield size={14} /><span>Secure</span></div>
            <div className="highlight-item"><Zap size={14} /><span>Fluid</span></div>
          </div>

          <div className="app-card-footer">
            <div className="app-platforms">
              {app.platforms.map(platform => (
                <Badge 
                  key={platform} 
                  variant="outline" 
                  size="sm" 
                  icon={platform === 'ios' ? Smartphone : Android}
                >
                  {platform === 'ios' ? 'iOS' : 'Android'}
                </Badge>
              ))}
            </div>
            <span className="view-details-btn">
              Explore
              <ChevronRight size={16} />
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
