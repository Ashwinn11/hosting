import { apps } from '../data/apps';
import AppCard from '../components/AppCard';
import './Home.css';

export default function Home() {
  return (
    <div className="home container">
      <section className="hero fade-in">
        <h1 className="hero-title">
          Premium Apps.<br />
          One Platform.
        </h1>
        <p className="hero-description">
          Discover our collection of beautifully crafted mobile applications.
          Available on iOS and Android.
        </p>
      </section>
      
      <section className="apps-grid">
        {apps.map((app, index) => (
          <div 
            key={app.id} 
            className="fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <AppCard app={app} />
          </div>
        ))}
        
        {apps.length === 0 && (
          <div className="empty-state">
            <p>No apps available yet. Check back soon!</p>
          </div>
        )}
      </section>
    </div>
  );
}
