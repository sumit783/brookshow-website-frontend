import client from './client';

export interface UserProfile {
    id: string;
    displayName: string;
    email: string;
    phone: string;
    role: string;
    countryCode: string;
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    createdAt: string;
}

export interface TicketSummary {
    id: string;
    event: {
        id: string;
        title: string;
        date: string;
        venue: string;
        location: string;
        image: string;
    };
    ticketType: string;
    quantity: number;
    totalPrice: number;
    purchaseDate: string;
    isValid: boolean;
}

export interface BookingSummary {
    id: string;
    artist: {
        id: string;
        name: string;
        image: string;
        category: string[];
    };
    service: string;
    date: string;
    startDate?: string;
    endDate?: string;
    status: string;
}

export interface UserProfileResponse {
    success: boolean;
    user: UserProfile;
    tickets: TicketSummary[];
    bookings: BookingSummary[];
}

export const fetchUserProfile = async (): Promise<UserProfileResponse> => {
    const response = await client.get<UserProfileResponse>('/api/user/profile');
    return response.data;
};
