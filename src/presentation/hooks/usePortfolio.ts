import { useState, useEffect } from 'react';
import type { AppEntity } from '../../core/domain/entities/App';
import { appService } from '../../di';

export function usePortfolio() {
  const [apps, setApps] = useState<AppEntity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await appService.getPortfolio();
        setApps(data);
      } catch (error) {
        console.error('Failed to load portfolio', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  return { 
    apps, 
    loading,
    masterly: apps.find(a => a.id === 'masterly'),
    playpulse: apps.find(a => a.id === 'playpulse'),
    gutbuddy: apps.find(a => a.id === 'gutbuddy')
  };
}
