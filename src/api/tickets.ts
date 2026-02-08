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

export interface EventTicketType {
    id: string;
    name: string;
    price: number;
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

export interface RazorpayOrder {
    id: string;
    amount: number;
    currency: string;
}

export interface BuyTicketResponse {
    success: boolean;
    message: string;
    ticket: Ticket;
    walletUpdated?: boolean;
    razorpayOrder?: RazorpayOrder;
}

export const buyTicket = async (data: BuyTicketData): Promise<BuyTicketResponse> => {
    const response = await client.post<BuyTicketResponse>('/api/user/buy-ticket', data);
    return response.data;
};

export interface EventTicketTypesResponse {
    success: boolean;
    ticketTypes: EventTicketType[];
}

export const fetchEventTicketTypes = async (eventId: string): Promise<EventTicketTypesResponse> => {
    const response = await client.get<EventTicketTypesResponse>(`/api/user/event/${eventId}/ticket-types`);
    return response.data;
};

export interface VerifyTicketPurchaseRequest {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}

export const verifyTicketPurchase = async (data: VerifyTicketPurchaseRequest): Promise<{ success: boolean; message: string }> => {
    const response = await client.post('/api/user/buy-ticket/verify', data);
    return response.data;
};
