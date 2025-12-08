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

export interface UserProfileResponse {
    success: boolean;
    user: UserProfile;
    tickets: TicketSummary[];
    bookings: any[]; // Define booking interface if needed later
}

export const fetchUserProfile = async (): Promise<UserProfileResponse> => {
    const response = await client.get<UserProfileResponse>('/api/user/profile');
    return response.data;
};
