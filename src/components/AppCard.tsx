import { Link } from 'react-router-dom';
import { ChevronRight, Smartphone, Layout as Android, Rocket, Shield, Zap, ExternalLink } from 'lucide-react';
import { type App } from '../data/apps';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import './AppCard.css';

interface AppCardProps {
  app: App;
  variant?: 'default' | 'minimal';
}

export default function AppCard({ app, variant = 'default' }: AppCardProps) {
  const isPlayPulse = app.id === 'playpulse';
  const isMinimal = variant === 'minimal';
  
  const CardContent = (
    <Card 
      className={`app-card ${isMinimal ? 'minimal-card' : ''}`} 
      style={!isMinimal ? { '--card-gradient': app.gradient } as React.CSSProperties : undefined}
    >
      {!isMinimal && <div className="app-card-bg"></div>}
      
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
            {!isMinimal && (
              <div className="app-badges-row">
                <Badge variant="accent" size="sm">Premium</Badge>
                {isPlayPulse && <Badge variant="primary" size="sm">10+ Games</Badge>}
              </div>
            )}
            {isMinimal && <p className="text-sm text-gray-500 mt-1">{app.tagline}</p>}
          </div>
          {isMinimal && (
             <span className="minimal-arrow text-gray-600 group-hover:text-white transition-colors">
                {app.externalUrl ? <ExternalLink size={20} /> : <ChevronRight size={20} />}
             </span>
          )}
        </div>
        
        {!isMinimal && (
          <>
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
                {app.externalUrl ? 'Visit Website' : 'Explore'}
                {app.externalUrl ? <ExternalLink size={16} /> : <ChevronRight size={16} />}
              </span>
            </div>
          </>
        )}
      </div>
    </Card>
  );

  if (app.externalUrl) {
    return (
      <a 
        href={app.externalUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="app-card-wrapper group"
      >
        {CardContent}
      </a>
    );
  }

  return (
    <Link to={`/${app.id}`} className="app-card-wrapper group">
      {CardContent}
    </Link>
  );
}
