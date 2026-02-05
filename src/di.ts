import { AppService } from './application/services/AppService';
import { InMemoryAppRepository } from './infrastructure/repositories/InMemoryAppRepository';

// Singleton instance setup (Manual Dependency Injection)
const appRepository = new InMemoryAppRepository();
export const appService = new AppService(appRepository);
