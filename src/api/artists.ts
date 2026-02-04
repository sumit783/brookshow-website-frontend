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
  startTime: string,
  endDate: string,
  endTime: string
): Promise<AvailabilityResponse> => {
  console.log("artist availability data", artistId, serviceId, date, startTime, endDate, endTime);
  const response = await client.get(`/api/user/artist/availability?artistId=${artistId}&serviceId=${serviceId}&date=${date}&startTime=${startTime}&endDate=${endDate}&endTime=${endTime}`);
  return response.data;
};

export interface BookingPriceResponse {
  success: boolean;
  available?: boolean;
  price: number;
  unit: string;
  basePrice: number;
  advance?: number;
  duration: {
    start: string;
    end: string;
    milliseconds: number;
  };
  message?: string;
  conflicts?: {
    bookings?: Array<{
      id: string;
      startAt: string;
      endAt: string;
      status: string;
    }>;
    calendarBlocks?: Array<{
      id: string;
      startDate: string;
      endDate: string;
      type: string;
      title: string;
    }>;
  };
}

export const fetchBookingPrice = async (
  artistId: string,
  serviceId: string,
  startDate: string,
  endDate: string
): Promise<BookingPriceResponse> => {
  const response = await client.get(`/api/user/artist/${artistId}/price?serviceId=${serviceId}&startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`);
  return response.data;
};

export interface BookArtistRequest {
  serviceId: string;
  startDate: string;
  endDate: string;
  eventName: string;
  advanceAmount: number;
  totalPrice: number;
  paidAmount: number;
}

export interface BookArtistResponse {
  success: boolean;
  message?: string;
}

export const bookArtist = async (
  artistId: string,
  payload: BookArtistRequest,
): Promise<BookArtistResponse> => {
  const response = await client.post(`/api/user/artist/${artistId}/book`, payload);
  return response.data;
};

export interface UserBooking {
  _id: string;
  artistId: {
    _id: string;
    userId: {
      _id: string;
      displayName: string;
      email: string;
      phone: string;
    };
    location: {
      city: string;
      state: string;
      country: string;
    };
    profileImage: string;
    bio: string;
    category: string[];
    rating: number;
    stats?: {
      events: number;
      experience: string;
    };
  };
  serviceId: {
    _id: string;
    artistId: string;
    category: string;
    unit: string;
    price_for_user: number;
    price_for_planner: number;
    advance: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  eventId: string | null;
  source: string;
  startAt: string;
  endAt: string;
  totalPrice: number;
  paidAmount: number;
  advanceAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  eventName?: string;
}

export interface UserBookingsResponse {
  success: boolean;
  count: number;
  bookings: UserBooking[];
}

export const fetchUserBookings = async (): Promise<UserBookingsResponse> => {
  const response = await client.get<UserBookingsResponse>('/api/user/bookings');
  return response.data;
};

export interface SingleBookingResponse {
  success: boolean;
  booking: UserBooking;
}

export const fetchBookingById = async (id: string): Promise<SingleBookingResponse> => {
  const response = await client.get<SingleBookingResponse>(`/api/user/bookings/${id}`);
  return response.data;
};