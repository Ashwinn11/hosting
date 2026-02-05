import type { AppEntity } from '../../core/domain/entities/App';
import type { IAppRepository } from '../../core/domain/repositories/IAppRepository';

export class AppService {
  private appRepository: IAppRepository;

  constructor(appRepository: IAppRepository) {
    this.appRepository = appRepository;
  }

  async getPortfolio(): Promise<AppEntity[]> {
    return this.appRepository.getAll();
  }

  async getAppDetails(id: string): Promise<AppEntity | undefined> {
    return this.appRepository.getById(id);
  }
}
