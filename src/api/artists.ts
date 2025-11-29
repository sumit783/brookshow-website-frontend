import client from './client';

export interface TopArtist {
  id: string;
  name: string;
  category: string;
  rating: number;
  location: string;
  image: string;
  specialties: string[];
  price: number;
}

export interface TopArtistsResponse {
  success: boolean;
  artists: TopArtist[];
}

export const fetchTopArtists = async (): Promise<TopArtistsResponse> => {
  const response = await client.get<TopArtistsResponse>('/api/user/top-artists');
  return response.data;
};

export interface ArtistProfile {
  success: boolean;
  id: string;
  name: string;
  category: string;
  rating: number;
  location: string;
  image: string;
  specialties: string[];
  bio: string;
  price: number;
  portfolio: {
    images: string[];
    videos: string[];
  };
  stats: {
    events: number;
    experience: string;
  };
}

export const fetchArtistProfile = async (id: string): Promise<ArtistProfile> => {
  const response = await client.get<ArtistProfile>(`/api/user/artist/${id}`);
  return response.data;
};

export interface SimilarArtist {
  id: string;
  name: string;
  category: string;
  rating: number;
  location: string;
  image: string;
  specialties: string[];
  price: number;
}

export interface SimilarArtistsResponse {
  success: boolean;
  artists: SimilarArtist[];
}

export const fetchSimilarArtists = async (artistId: string): Promise<SimilarArtistsResponse> => {
  const response = await client.get(`/api/user/artist/${artistId}/similar`);
  return response.data;
};

export interface AllArtist {
  id: string;
  name: string;
  category: string;
  rating: number;
  location: string;
  image: string;
  specialties: string[];
  price: number;
}

export interface AllArtistsResponse {
  success: boolean;
  artists: AllArtist[];
  count: number;
}

export const fetchAllArtists = async (): Promise<AllArtistsResponse> => {
  const response = await client.get(`/api/user/artists`);
  return response.data;
};

export interface ArtistService {
  id: string;
  category: string;
  unit: string;
  price_for_user: number;
  price_for_planner: number;
  advance: number;
}

export interface ArtistServicesResponse {
  success: boolean;
  artistId: string;
  services: ArtistService[];
  count: number;
}

export const fetchArtistServices = async (artistId: string): Promise<ArtistServicesResponse> => {
  const response = await client.get(`/api/user/artist/${artistId}/services`);
  return response.data;
};

export interface AvailabilityResponse {
  success: boolean;
  available: boolean;
  artist: { id: string; name: string; };
  service: { id: string; category: string; unit: string; };
  requestedTime: { date: string; startTime: string; startAt: string; };
  message: string;
}

export const checkArtistAvailability = async (
  artistId: string,
  serviceId: string,
  date: string,
  startTime: string
): Promise<AvailabilityResponse> => {
  const response = await client.get(`/api/user/artist/availability?artistId=${artistId}&serviceId=${serviceId}&date=${date}&startTime=${startTime}`);
  return response.data;
};