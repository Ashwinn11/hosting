export interface AppEntity {
  id: string;
  name: string;
  tagline: string;
  description: string;
  bundleId: string;
  icon: string;
  color: string;
  gradient: string;
  supportEmail: string;
  developerName: string;
  platforms: ('ios' | 'android')[];
  features: string[];
  games?: string[];
  externalUrl?: string;
  iosUrl?: string;
  androidUrl?: string;
}
