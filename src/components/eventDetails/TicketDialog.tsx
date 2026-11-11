import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { fetchEventTicketTypes } from "@/api/tickets";
import { toast } from "sonner";

interface TicketDialogProps {
  open: boolean;
  onClose: () => void;
  onPayNow: (data: { name: string; phone: string; persons: number; quantity: number; total: number; ticketTypeId: string }) => void;
  eventId: string;
  currency?: string;
  isPaying?: boolean;
  isSoldOut?: boolean;
}

export const TicketDialog = ({ open, onClose, onPayNow, eventId, currency = "₹", isPaying = false, isSoldOut = false }: TicketDialogProps) => {
  const [name, setName] = useState("");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [quantity, setQuantity] = useState<number | "">(1);
  const [selectedTicketId, setSelectedTicketId] = useState<string>("");

  const { data: ticketTypesResponse, isLoading: loading, error: queryError } = useQuery({
    queryKey: ['ticketTypes', eventId],
    queryFn: () => fetchEventTicketTypes(eventId),
    enabled: open && !!eventId,
  });

  const ticketTypes = ticketTypesResponse?.success ? ticketTypesResponse.ticketTypes : [];

  useEffect(() => {
    if (queryError || (ticketTypesResponse && !ticketTypesResponse.success)) {
      console.error("Failed to fetch ticket types:", queryError || ticketTypesResponse);
      toast.error("Failed to load ticket types");
    }
  }, [queryError, ticketTypesResponse]);

  const isTypeSoldOut = (type: any) => {
    return Boolean(
      type?.isSoldOut ||
      type?.soldOut ||
      type?.availableQuantity === 0 ||
      type?.remainingTickets === 0 ||
      type?.remainingQuantity === 0 ||
      type?.status?.toLowerCase().replace(/\s+/g, '') === 'soldout'
    );
  };

  useEffect(() => {
    if (ticketTypes.length > 0 && !selectedTicketId) {
      const firstAvailable = ticketTypes.find(t => !isTypeSoldOut(t)) || ticketTypes[0];
      setSelectedTicketId(firstAvailable.id);
    }
  }, [ticketTypes, selectedTicketId]);

  useEffect(() => {
    if (open && eventId) {
      // Check for persisted data
      const savedTicket = localStorage.getItem(`pending_ticket_${eventId}`);
      if (savedTicket) {
        try {
          const parsed = JSON.parse(savedTicket);
          if (parsed.name) setName(parsed.name);
          if (parsed.phone) {
            setPhoneDigits(parsed.phone.replace("+91 ", ""));
          }
          if (parsed.quantity) {
            setQuantity(parsed.quantity);
          } else if (parsed.persons) {
            // Fallback for older data, assume 1 ticket if persons is present
            setQuantity(1);
          }
          if (parsed.ticketTypeId) setSelectedTicketId(parsed.ticketTypeId);

          // Note: cleaning up here might be too early if user closes and reopens,
          // but usually restoration should happen once.
          localStorage.removeItem(`pending_ticket_${eventId}`);
        } catch (err) {
          console.error("Failed to restore ticket data", err);
          localStorage.removeItem(`pending_ticket_${eventId}`);
        }
      }
    }
  }, [open, eventId]);

  const selectedTicket = ticketTypes.find(t => t.id === selectedTicketId);
  const unitPrice = selectedTicket?.price || 0;
  const allowedPerTicket = selectedTicket?.allowedPersonsPerTicket || 1;
  const parsedQuantity = typeof quantity === 'number' ? quantity : (Number(quantity) || 0);
  const platformFeePercent = Number(ticketTypesResponse?.platformFeePercent || 0);
  const subtotal = parsedQuantity * unitPrice;
  const platformFee = Number(((subtotal * platformFeePercent) / 100).toFixed(2));
  const total = Number((subtotal + platformFee).toFixed(2));
  const totalPersons = parsedQuantity * allowedPerTicket;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Dialog Card */}
      <div className="relative z-10 w-full max-w-md max-h-[90vh]">
        <div className="relative rounded-2xl glass-modern border border-white/10 p-6 shadow-2xl max-h-[90vh] overflow-y-auto transition-all duration-300 ease-out scale-100 opacity-100 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/30">
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
              {isSoldOut || (ticketTypes.length > 0 && ticketTypes.every(isTypeSoldOut)) ? "Sold Out" : "Get Tickets"}
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
                  {ticketTypes.map((type) => {
                    const sold = isTypeSoldOut(type);
                    return (
                      <option key={type.id} value={type.id} disabled={sold} className="bg-background text-foreground">
                        {type.name} - {currency}{type.price} {sold ? "(Sold Out)" : ""}
                      </option>
                    );
                  })}
                  {ticketTypes.length === 0 && <option value="" disabled>Sold Out</option>}
                </select>
              )}
            </div>
            {selectedTicket && (
              <div className="flex items-center justify-between rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm">
                <span className="text-muted-foreground">Allowed persons per ticket</span>
                <span className="font-semibold text-foreground">{selectedTicket.allowedPersonsPerTicket ?? 1}</span>
              </div>
            )}
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
              <label htmlFor="ticket-quantity" className="block text-sm mb-1 text-muted-foreground">No of tickets</label>
              <input
                id="ticket-quantity"
                type="number"
                min={1}
                className="w-full rounded-lg bg-background/60 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-accent focus:border-accent/40 transition-shadow shadow-inner"
                value={quantity}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "") {
                    setQuantity("");
                  } else {
                    setQuantity(Math.max(1, Number(val)));
                  }
                }}
                placeholder="1"
                aria-required="true"
              />
            </div>
          </div>

          {/* Price Summary */}
          <div className="relative mt-4 rounded-xl border border-white/10 bg-background/50 p-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Price per ticket</span>
              <span className="font-medium">{currency}{unitPrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">No. of Tickets</span>
              <span className="font-medium">{quantity}</span>
            </div>
            {totalPersons > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Persons Allowed</span>
                <span className="font-medium">{totalPersons}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">{currency}{subtotal.toFixed(2)}</span>
            </div>
            {platformFeePercent > 0 && (
              <div className="flex items-center justify-between text-sm text-primary">
                <span className="flex items-center gap-1">
                  Platform Charges ({platformFeePercent}%)
                </span>
                <span className="font-semibold">+{currency}{platformFee.toFixed(2)}</span>
              </div>
            )}
            <div className="h-px bg-white/10 my-1.5" />
            <div className="flex items-center justify-between text-base">
              <div>
                <span className="font-semibold block">Total Amount</span>
                {platformFeePercent > 0 && (
                  <span className="text-[11px] text-muted-foreground block">
                    (Includes ticket base price + platform charges)
                  </span>
                )}
              </div>
              <span className="font-extrabold text-lg bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                {currency}{total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="relative mt-6 flex justify-end gap-3">
            <Button variant="outline" onClick={onClose} className="border-white/20">Cancel</Button>
            {isSoldOut || (selectedTicket && isTypeSoldOut(selectedTicket)) || ticketTypes.length === 0 ? (
              <Button
                disabled
                className="relative bg-red-500/15 text-red-400 border border-red-500/30 cursor-not-allowed min-w-[120px] font-bold"
              >
                Sold Out
              </Button>
            ) : (
              <Button
                disabled={!selectedTicketId || loading || isPaying || !quantity || Number(quantity) < 1}
                onClick={() => onPayNow({
                  name,
                  phone: `+91 ${phoneDigits}`,
                  persons: totalPersons,
                  quantity: Number(quantity) || 1,
                  total,
                  ticketTypeId: selectedTicketId
                })}
                className="relative bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary overflow-hidden min-w-[120px]"
              >
                <div className="relative z-10 flex items-center justify-center gap-2">
                  {isPaying && <Loader2 className="h-4 w-4 animate-spin" />}
                  <span>{isPaying ? "Processing..." : "Pay Now"}</span>
                </div>
                {/* Shimmer */}
                {!isPaying && (
                  <div className="pointer-events-none absolute inset-0 -translate-x-[150%] hover:translate-x-[150%] transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


