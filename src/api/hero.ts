import client from './client';

export interface HeroImage {
  _id: string;
  title: string;
  desktopUrl: string;
  tabletUrl: string;
  mobileUrl: string;
  isActive: boolean;
  order: number;
}

interface HeroResponse {
  success: boolean;
  items: HeroImage[];
}

export const listHeroImages = async (): Promise<HeroImage[]> => {
  const response = await client.get<HeroResponse>('/api/admin/hero');
  return response.data.success ? response.data.items.filter(item => item.isActive) : [];
};
