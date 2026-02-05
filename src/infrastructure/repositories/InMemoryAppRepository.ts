import type { AppEntity } from '../../core/domain/entities/App';
import type { IAppRepository } from '../../core/domain/repositories/IAppRepository';
import { apps } from '../data/appsData';

export class InMemoryAppRepository implements IAppRepository {
  async getAll(): Promise<AppEntity[]> {
    // Simulate async data fetch
    return Promise.resolve(apps);
  }

  async getById(id: string): Promise<AppEntity | undefined> {
    const app = apps.find(a => a.id === id);
    return Promise.resolve(app);
  }
}
