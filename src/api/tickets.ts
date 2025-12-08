import client from './client';

export interface TicketType {
    _id: string;
    title: string;
    price: number;
}

export interface PlannerProfile {
    _id: string;
    organization: string;
    logoUrl: string;
}

export interface Event {
    _id: string;
    plannerProfileId: PlannerProfile;
    title: string;
    venue: string;
    address: string;
    city: string;
    state: string;
    lat: number;
    lng: number;
    startAt: string;
}

export interface Ticket {
    _id: string;
    ticketTypeId: TicketType;
    eventId: Event;
    buyerName: string;
    buyerPhone: string;
    persons: number;
    scannedPersons: number;
    isValide: boolean;
    issuedAt: string;
    scanned: boolean;
    scannedAt?: string;
    qrPayload: any;
    qrDataUrl: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface TicketDetailsResponse {
    success: boolean;
    ticket: Ticket;
}

export const fetchTicketDetails = async (id: string): Promise<TicketDetailsResponse> => {
    const response = await client.get<TicketDetailsResponse>(`/api/user/ticket/${id}`);
    return response.data;
};

export interface BuyTicketData {
    ticketTypeId: string;
    quantity: number;
    buyerName: string;
    buyerPhone: string;
}

export interface BuyTicketResponse {
    success: boolean;
    message: string;
    ticket: Ticket;
    walletUpdated?: boolean;
}

export const buyTicket = async (data: BuyTicketData): Promise<BuyTicketResponse> => {
    const response = await client.post<BuyTicketResponse>('/api/user/buy-ticket', data);
    return response.data;
};
