import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { fetchEventTicketTypes, type EventTicketType } from "@/api/tickets";
import { toast } from "sonner";

interface TicketDialogProps {
  open: boolean;
  onClose: () => void;
  onPayNow: (data: { name: string; phone: string; persons: number; total: number; ticketTypeId: string }) => void;
  eventId: string;
  currency?: string;
}

export const TicketDialog = ({ open, onClose, onPayNow, eventId, currency = "$" }: TicketDialogProps) => {
  const [name, setName] = useState("");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [persons, setPersons] = useState<number>(1);
  const [ticketTypes, setTicketTypes] = useState<EventTicketType[]>([]);
  const [selectedTicketId, setSelectedTicketId] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && eventId) {
      setLoading(true);
      fetchEventTicketTypes(eventId)
        .then((response) => {
          if (response.success && response.ticketTypes.length > 0) {
            setTicketTypes(response.ticketTypes);
            setSelectedTicketId(response.ticketTypes[0].id);
          }
        })
        .catch((error) => {
          console.error("Failed to fetch ticket types:", error);
          toast.error("Failed to load ticket types");
        })
        .finally(() => setLoading(false));
    }
  }, [open, eventId]);

  const selectedTicket = ticketTypes.find(t => t.id === selectedTicketId);
  const unitPrice = selectedTicket?.price || 0;
  const total = Math.max(1, persons || 0) * unitPrice;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Dialog Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="relative rounded-2xl glass-modern border border-white/10 p-6 shadow-2xl overflow-hidden transition-all duration-300 ease-out scale-100 opacity-100">
          {/* Animated border glow */}
          <div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-40"
            style={{
              background:
                "conic-gradient(from 140deg at 50% 50%, rgba(179,12,93,0.15), rgba(79,11,176,0.15), transparent 60%)",
            }}
          />

          {/* Subtle pattern overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20px_20px,rgba(255,255,255,.06)_1px,transparent_1px)] [background-size:18px_18px]" />

          {/* Header */}
          <div className="relative mb-4 flex items-start justify-between">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-accent to-primary bg-clip-text text-transparent">
              Get Tickets
            </h3>
            <button
              aria-label="Close"
              onClick={onClose}
              className="rounded-lg p-2 border border-white/10 hover:border-white/20 hover:bg-white/5 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-foreground/80">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="relative space-y-4">
            <div>
              <label htmlFor="ticket-type" className="block text-sm mb-1 text-muted-foreground">Ticket Type</label>
              {loading ? (
                 <div className="w-full h-10 bg-white/5 animate-pulse rounded-lg" />
              ) : (
                <select
                  id="ticket-type"
                  className="w-full rounded-lg bg-background/60 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-accent focus:border-accent/40 transition-shadow shadow-inner text-foreground appearance-none"
                  value={selectedTicketId}
                  onChange={(e) => setSelectedTicketId(e.target.value)}
                >
                  {ticketTypes.map((type) => (
                    <option key={type.id} value={type.id} className="bg-background text-foreground">
                      {type.name} - {currency}{type.price}
                    </option>
                  ))}
                  {ticketTypes.length === 0 && <option>No tickets available</option>}
                </select>
              )}
            </div>

            <div>
              <label htmlFor="ticket-name" className="block text-sm mb-1 text-muted-foreground">Name</label>
              <input
                id="ticket-name"
                className="w-full rounded-lg bg-background/60 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-accent focus:border-accent/40 transition-shadow shadow-inner"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-required="true"
              />
            </div>

            <div>
              <label htmlFor="ticket-phone" className="block text-sm mb-1 text-muted-foreground">Phone Number</label>
              <div className="flex gap-2">
                <div className="select-none flex items-center rounded-lg bg-background/60 border border-white/10 px-3 text-foreground/80">
                  +91
                </div>
                <input
                  id="ticket-phone"
                  type="number"
                  inputMode="numeric"
                  pattern="\\d*"
                  className="w-full rounded-lg bg-background/60 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-accent focus:border-accent/40 transition-shadow shadow-inner"
                  placeholder="10-digit number"
                  value={phoneDigits}
                  onChange={(e) => {
                    const onlyDigits = e.target.value.replace(/\D/g, "").slice(0, 10);
                    setPhoneDigits(onlyDigits);
                  }}
                  aria-required="true"
                  autoComplete="tel"
                />
              </div>
            </div>

            <div>
              <label htmlFor="ticket-persons" className="block text-sm mb-1 text-muted-foreground">Number of Persons</label>
              <input
                id="ticket-persons"
                type="number"
                min={1}
                className="w-full rounded-lg bg-background/60 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-accent focus:border-accent/40 transition-shadow shadow-inner"
                value={persons}
                onChange={(e) => setPersons(Number(e.target.value))}
                placeholder="1"
                aria-required="true"
              />
            </div>
          </div>

          {/* Price Summary */}
          <div className="relative mt-4 rounded-xl border border-white/10 bg-background/50 p-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Price per ticket</span>
              <span className="font-medium">{currency}{unitPrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Quantity</span>
              <span className="font-medium">{Math.max(1, persons || 0)}</span>
            </div>
            <div className="h-px bg-white/10 my-2" />
            <div className="flex items-center justify-between text-base">
              <span className="font-semibold">Total</span>
              <span className="font-extrabold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                {currency}{total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="relative mt-6 flex justify-end gap-3">
            <Button variant="outline" onClick={onClose} className="border-white/20">Cancel</Button>
            <Button
              disabled={!selectedTicketId || loading}
              onClick={() => onPayNow({ 
                name, 
                phone: `+91 ${phoneDigits}`, 
                persons: Math.max(1, persons || 0), 
                total,
                ticketTypeId: selectedTicketId
              })}
              className="relative bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary overflow-hidden"
            >
              <span className="relative z-10">Pay Now</span>
              {/* Shimmer */}
              <div className="pointer-events-none absolute inset-0 -translate-x-[150%] hover:translate-x-[150%] transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};


