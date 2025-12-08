import client from './client';

export interface RegisterData {
    email: string;
    phone: string;
    displayName: string;
    countryCode: string;
    role: string;
}

export interface VerifyOtpData {
    email: string;
    otp: string;
    isLogin?: boolean;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    user?: any;
    jwtToken?: string;
    otp?: string; // Sometimes returned in dev mode
}

export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
    const response = await client.post<AuthResponse>('/api/auth/register', data);
    return response.data;
};

export const verifyRegistrationOtp = async (data: VerifyOtpData): Promise<AuthResponse> => {
    const response = await client.post<AuthResponse>('/api/auth/verify-registration-otp', data);
    return response.data;
};

export const requestLoginOtp = async (email: string): Promise<AuthResponse> => {
    const response = await client.post<AuthResponse>('/api/auth/request-otp', { email });
    return response.data;
};

export const verifyLoginOtp = async (data: VerifyOtpData): Promise<AuthResponse> => {
    const response = await client.post<AuthResponse>('/api/auth/verify-email-otp', data);
    return response.data;
};
