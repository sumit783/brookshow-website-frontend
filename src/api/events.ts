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