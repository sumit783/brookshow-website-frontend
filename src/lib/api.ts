// API Configuration
const BASE_URI = import.meta.env.VITE_API_BASE_URI || 'http://localhost:5000';
export const API_BASE_URI = BASE_URI;

// Get API key from env or use fallback
const envApiKey = import.meta.env.VITE_API_KEY;
const API_KEY = (envApiKey && envApiKey.trim() !== '') ? envApiKey : "gLzOQGmoJk4b92oJcisx3y4KMFcecp";
export const API_KEY_HEADER = API_KEY;

// Debug: Log all VITE_ environment variables (for debugging only)
if (import.meta.env.DEV) {
  console.log('=== Environment Variables Debug ===');
  console.log('VITE_API_BASE_URI:', import.meta.env.VITE_API_BASE_URI || 'NOT SET');
  console.log('VITE_API_KEY:', import.meta.env.VITE_API_KEY ? `${import.meta.env.VITE_API_KEY.substring(0, 10)}...` : 'NOT SET');
  console.log('All VITE_ vars:', Object.keys(import.meta.env).filter(key => key.startsWith('VITE_')));
  console.log('===================================');
}

// API Response Types
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

// Artist Profile Types
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

// API Functions
export const fetchTopArtists = async (): Promise<TopArtistsResponse> => {
  const url = `${API_BASE_URI}/api/user/top-artists`;
  console.log('Fetching from:', url);
  console.log('API Key exists:', !!API_KEY);
  console.log('API Key length:', API_KEY?.length || 0);
  console.log('API Key value:', API_KEY ? `${API_KEY.substring(0, 10)}...` : 'undefined');
  
  // Ensure API_KEY is always a valid string
  const apiKeyValue = API_KEY && API_KEY.trim() !== '' ? API_KEY : "gLzOQGmoJk4b92oJcisx3y4KMFcecp";
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-api-key': apiKeyValue,
  };
  
  console.log('Request headers:', { 
    'Content-Type': headers['Content-Type'], 
    'x-api-key': apiKeyValue ? `${apiKeyValue.substring(0, 10)}...` : 'MISSING' 
  });
  
  const response = await fetch(url, {
    method: 'GET',
    headers,
    credentials: 'omit', // Explicitly omit credentials to avoid CORS issues
    mode: 'cors', // Explicitly set CORS mode
  });
  
  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    console.error('API Error:', response.status, response.statusText, errorText);
    throw new Error(`Failed to fetch top artists: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  console.log('API Response:', data);
  return data;
};

// Fetch Artist Profile
export const fetchArtistProfile = async (id: string): Promise<ArtistProfile> => {
  const url = `${API_BASE_URI}/api/user/artist/${id}`;
  console.log('Fetching artist profile from:', url);
  
  // Ensure API_KEY is always a valid string
  const apiKeyValue = API_KEY && API_KEY.trim() !== '' ? API_KEY : "gLzOQGmoJk4b92oJcisx3y4KMFcecp";
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-api-key': apiKeyValue,
  };
  
  const response = await fetch(url, {
    method: 'GET',
    headers,
    credentials: 'omit',
    mode: 'cors',
  });
  
  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    console.error('API Error:', response.status, response.statusText, errorText);
    throw new Error(`Failed to fetch artist profile: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  console.log('Artist Profile Response:', data);
  return data;
};

