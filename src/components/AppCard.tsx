import { Link } from 'react-router-dom';
import { type App } from '../data/apps';
import './AppCard.css';

interface AppCardProps {
  app: App;
}

export default function AppCard({ app }: AppCardProps) {
  return (
    <Link to={`/${app.id}`} className="app-card card" style={{ '--card-gradient': app.gradient } as React.CSSProperties}>
      <div className="app-card-header">
        <div className="app-icon" style={{ background: app.icon.startsWith('/') ? 'transparent' : app.gradient }}>
          {app.icon.startsWith('/') ? (
            <img src={app.icon} alt={`${app.name} logo`} className="app-icon-img" />
          ) : (
            app.icon
          )}
        </div>
        <div className="app-info">
          <h3 className="app-name">{app.name}</h3>
          <p className="app-tagline">{app.tagline}</p>
        </div>
      </div>
      
      <p className="app-description">{app.description}</p>
      
      <div className="app-platforms">
        {app.platforms.map(platform => (
          <span key={platform} className="platform-badge">
            {platform === 'ios' ? '🍎 iOS' : '🤖 Android'}
          </span>
        ))}
      </div>
      
      <div className="app-card-footer">
        <span className="view-details">
          View Details →
        </span>
      </div>
    </Link>
  );
}
