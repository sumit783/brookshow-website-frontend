import client from './client';

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  price: string;
  status: string;
  image: string;
}

export interface EventsResponse {
  success: boolean;
  events: Event[];
  count: number;
}

export const fetchEvents = async (): Promise<EventsResponse> => {
  const response = await client.get<EventsResponse>('/api/user/events');
  return response.data;
};

export interface EventDetails {
  id: string;
  title: string;
  date: string;
  time: string;
  doors: string;
  venue: string;
  location: string;
  fullAddress: string;
  latitude: number;
  longitude: number;
  description: string;
  price: string;
  status: string;
  image: string;
  ageRestriction: string;
  artist?: string;
  lineup?: string[];
  attendance?: string;
}

export interface EventDetailsResponse {
  success: boolean;
  id: string;
  title: string;
  date: string;
  time: string;
  doors: string;
  venue: string;
  location: string;
  fullAddress: string;
  latitude: number;
  longitude: number;
  description: string;
  price: string;
  status: string;
  image: string;
  ageRestriction: string;
  artist?: string;
  lineup?: string[];
  attendance?: string;
}

export const fetchEventDetails = async (id: string): Promise<EventDetailsResponse> => {
  const response = await client.get(`/api/user/event/${id}`);
  return response.data;
};

export interface EventListItem {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  latitude: number;
  longitude: number;
  price: string;
  status: string;
  image: string;
  attendance?: string;
  category?: string;
}

export interface EventsListResponse {
  success: boolean;
  events: EventListItem[];
  count: number;
}

export const fetchEventsList = async (): Promise<EventsListResponse> => {
  const response = await client.get(`/api/user/events`);
  return response.data;
};

export interface SearchEventsParams {
  q?: string;
  city?: string;
  category?: string;
  startDate?: string;
  endDate?: string;
}

export const searchEvents = async (params: SearchEventsParams): Promise<EventsListResponse> => {
  const queryParams = new URLSearchParams();
  if (params.q) queryParams.append('q', params.q);
  if (params.city && params.city !== 'all') queryParams.append('city', params.city);
  if (params.category && params.category !== 'all') queryParams.append('category', params.category);
  if (params.startDate) queryParams.append('startDate', params.startDate);
  if (params.endDate) queryParams.append('endDate', params.endDate);

  const response = await client.get<EventsListResponse>(`/api/user/search-event?${queryParams.toString()}`);
  return response.data;
};

export interface EventSearchFiltersResponse {
  success: boolean;
  cities: string[];
  categories: string[];
}

export const fetchEventSearchFilters = async (): Promise<EventSearchFiltersResponse> => {
  const response = await client.get<EventSearchFiltersResponse>(`/api/user/search-event-filters`);
  return response.data;
};