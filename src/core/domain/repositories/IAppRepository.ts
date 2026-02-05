import type { AppEntity } from '../entities/App';

export interface IAppRepository {
  getAll(): Promise<AppEntity[]>;
  getById(id: string): Promise<AppEntity | undefined>;
}
