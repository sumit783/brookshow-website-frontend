import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchTicketDetails, Ticket } from "@/api/tickets";
import { Badge } from "@/components/ui/badge";
import { Loader2, Calendar, MapPin, User, Phone, Users, CheckCircle, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { API_BASE_URI } from "@/api/client";

const TicketDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadTicket = async () => {
        try {
            if (!id) return;
            const data = await fetchTicketDetails(id);
            if (data.success) {
                setTicket(data.ticket);
            } else {
                setError("Failed to load ticket details");
            }
        } catch (err) {
            setError("An error occurred while fetching ticket details");
            console.error(err);
        } finally {
            setLoading(false);
        }
        };

        loadTicket();
    }, [id]);

    if (loading) {
        return (
        <div className="flex justify-center items-center h-screen bg-background">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
        );
    }

    if (error || !ticket) {
        return (
        <div className="flex justify-center items-center h-screen bg-background p-4">
            <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold text-destructive">Oops!</h2>
                <p className="text-muted-foreground">{error || "Ticket not found"}</p>
                <Link to="/">
                    <Button variant="outline">Go Home</Button>
                </Link>
            </div>
        </div>
        );
    }

    const { eventId, ticketTypeId, buyerName, buyerPhone, persons, qrDataUrl, scanned, isValide } = ticket;

    const getImageUrl = (imagePath: string) => {
        if (!imagePath) return '';
        if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
            return imagePath;
        }
        if (imagePath.startsWith('/')) {
            return `${API_BASE_URI}${imagePath}`;
        }
        return `${API_BASE_URI}/${imagePath}`;
    };

    return (
        <div className="min-h-screen bg-background relative flex items-center justify-center p-4 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute top-[40%] right-[0%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[100px] animate-pulse delay-700"></div>
                <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] bg-secondary/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10 w-full max-w-4xl fade-in-scale">
                 <Link to="/profile" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Profile
                 </Link>

                <div className="flex flex-col md:flex-row shadow-strong rounded-3xl overflow-hidden min-h-[500px] hover-glow">
                    {/* Event Info Section (Left/Top) */}
                    <div className="flex-[3] bg-gradient-modern p-8 text-white relative flex flex-col justify-between">
                         <div className="moving-bg bg-gradient-overlay opacity-10 absolute inset-0"></div>
                         
                         <div className="relative z-10 space-y-6">
                            <div className="flex items-start justify-between">
                                <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-md">
                                    {ticketTypeId.title} Experience
                                </Badge>
                                 {/* {eventId.plannerProfileId?.logoUrl ? (
                                    <img 
                                        src={getImageUrl(eventId.plannerProfileId.logoUrl)} 
                                        alt={eventId.plannerProfileId.organization || "Organizer"} 
                                        className="h-10 w-10 rounded-full border-2 border-white/50 object-cover" 
                                    />
                                ) : (
                                    <div className="h-10 w-10 rounded-full border-2 border-white/50 bg-white/10 flex items-center justify-center font-bold text-lg backdrop-blur-md">
                                        {eventId.title?.charAt(0) || "E"}
                                    </div>
                                )} */}
                            </div>

                            <div className="space-y-2">
                                <h1 className="text-4xl md:text-5xl font-heading font-bold leading-tight drop-shadow-lg">
                                    {eventId.title}
                                </h1>
                                <div className="flex flex-col gap-2 text-white/90 font-medium">
                                     <div className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5" />
                                        {format(new Date(eventId.startAt), "EEEE, MMMM do, yyyy")}
                                     </div>
                                     <div className="flex items-center gap-2">
                                        <div className="h-5 w-5 flex items-center justify-center text-xs font-bold border border-white/50 rounded-sm">
                                            {format(new Date(eventId.startAt), "h:mm")}
                                        </div>
                                         {format(new Date(eventId.startAt), "p")}
                                     </div>
                                </div>
                            </div>
                         </div>

                         <div className="relative z-10 mt-8 space-y-4">
                            <div className="flex items-start gap-3 bg-black/20 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                                <MapPin className="h-6 w-6 text-accent shrink-0 mt-1" />
                                <div>
                                    <p className="font-semibold text-lg">{eventId.venue}</p>
                                    <p className="text-white/70 text-sm">{eventId.address}, {eventId.city}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-white/60 text-xs uppercase tracking-wider">Buyer</p>
                                    <p className="font-medium truncate">{buyerName}</p>
                                </div>
                                <div>
                                     <p className="text-white/60 text-xs uppercase tracking-wider">Admit</p>
                                     <p className="font-medium">{persons} Person{persons > 1 ? 's' : ''}</p>
                                </div>
                            </div>
                         </div>
                    </div>

                    {/* Perforation Line */}
                    <div className="relative md:w-[2px] w-full md:h-auto h-[2px] bg-background">
                         {/* <div className="absolute -top-3 left-1/2 -translate-x-1/2 md:top-auto md:-left-3 md:translate-x-0 w-6 h-6 bg-background rounded-full z-20"></div> */}
                         <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 md:bottom-auto md:top-1/2 md:-right-3 md:translate-x-0 w-6 h-6 bg-background rounded-full z-20 hidden md:block"></div>
                         <div className="absolute bottom-auto top-1/2 -right-3 md:hidden w-6 h-6 bg-background rounded-full z-20"></div>
                         
                         <div className="w-full h-full border-l-2 border-dashed border-gray-300 md:block hidden"></div>
                         <div className="w-full h-full border-t-2 border-dashed border-gray-300 md:hidden block"></div>
                    </div>

                    {/* Ticket Stub Section (Right/Bottom) */}
                    <div className="flex-[1.5] bg-card p-8 flex flex-col items-center justify-center relative shadow-inner">
                         {/* Scan Pattern Overlay */}
                         <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000000_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

                         <div className="relative z-10 w-full flex flex-col items-center space-y-6">
                            <div className="relative group">
                                <div className={`absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 ${!isValide ? 'from-destructive to-orange-500 opacity-75' : ''}`}></div>
                                <div className="relative bg-white p-3 rounded-lg shadow-sm">
                                    <img src={qrDataUrl} alt="QR Code" className="w-40 h-40 mix-blend-multiply" />
                                    
                                    {!isValide && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[2px]">
                                            <span className="text-destructive font-black text-2xl uppercase tracking-widest border-4 border-destructive p-2 rotate-[-15deg] shadow-lg">
                                                Void
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="text-center space-y-2 w-full">
                                <div className="text-xs text-muted-foreground uppercase tracking-widest font-mono">
                                    Ticket Status
                                </div>
                                {scanned ? (
                                    <div className="inline-flex items-center justify-center gap-2 w-full py-2 bg-secondary/50 rounded-lg text-secondary-foreground font-medium animate-pulse">
                                         <CheckCircle className="h-4 w-4" /> Scanned
                                    </div>
                                ) : (
                                    <div className="inline-flex items-center justify-center gap-2 w-full py-2 bg-green-500/10 text-green-600 dark:text-green-400 rounded-lg font-medium border border-green-500/20">
                                        Ready to Scan
                                    </div>
                                )}
                            </div>

                            <div className="w-full border-t border-border pt-4">
                                <p className="text-[10px] text-center text-muted-foreground font-mono break-all">
                                    ID: {ticket._id}
                                </p>
                            </div>
                         </div>
                    </div>
                </div>
                
                 <div className="text-center mt-8 text-sm text-muted-foreground">
                    <p>Show this code at the entrance.</p>
                 </div>
            </div>
        </div>
    );
};

export default TicketDetails;
