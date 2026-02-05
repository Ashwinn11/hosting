import { useState, useEffect } from 'react';
import type { AppEntity } from '../../core/domain/entities/App';
import { appService } from '../../di';

export function useAppDetails(id: string) {
  const [app, setApp] = useState<AppEntity | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApp = async () => {
      setLoading(true);
      try {
        const data = await appService.getAppDetails(id);
        setApp(data);
      } catch (error) {
        console.error(`Failed to load app ${id}`, error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchApp();
    }
  }, [id]);

  return { app, loading };
}
