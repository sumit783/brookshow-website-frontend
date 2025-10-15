import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

type EventPlannerJoinDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function EventPlannerJoinDialog({ open, onOpenChange }: EventPlannerJoinDialogProps) {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");

  const [countryCode, setCountryCode] = useState("+1");
  const [phone, setPhone] = useState("");
  const [phoneOtpRequested, setPhoneOtpRequested] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState("");
  const [phoneCooldown, setPhoneCooldown] = useState(0);

  const [email, setEmail] = useState("");
  const [emailOtpRequested, setEmailOtpRequested] = useState(false);
  const [emailOtp, setEmailOtp] = useState("");
  const [emailCooldown, setEmailCooldown] = useState(0);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setProfileImage(url);
  }, []);

  const canSubmit = useMemo(() => {
    return !!name && !!organization && !!email && !!phone && phoneOtp.length === 4 && emailOtp.length === 4;
  }, [name, organization, email, phone, phoneOtp, emailOtp]);

  useEffect(() => {
    if (phoneCooldown <= 0) return;
    const id = setInterval(() => setPhoneCooldown((v) => (v > 0 ? v - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [phoneCooldown]);

  useEffect(() => {
    if (emailCooldown <= 0) return;
    const id = setInterval(() => setEmailCooldown((v) => (v > 0 ? v - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [emailCooldown]);

  const gradientButton = "bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 text-white hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Join as Event Planner</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label>Profile Image</Label>
            <div className="w-full flex items-center justify-center">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="group p-[3px] rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500/70"
                aria-label="Upload profile image"
              >
                <div className="h-28 w-28 md:h-32 md:w-32 rounded-full bg-background flex items-center justify-center overflow-hidden">
                  {profileImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-xs text-muted-foreground">Upload</span>
                  )}
                </div>
              </button>
              <Input ref={fileInputRef} type="file" accept="image/*" onChange={onFileChange} className="hidden" />
            </div>
          </div>

          <Field label="Name">
            <Input placeholder="Your full name" value={name} onChange={(e) => setName(e.target.value)} />
          </Field>

          <Field label="Organization">
            <Input placeholder="Organization name" value={organization} onChange={(e) => setOrganization(e.target.value)} />
          </Field>

          <Field label="Phone Number">
            <div className="grid grid-cols-[120px_1fr_auto] gap-2 items-center">
              <CountryCode value={countryCode} onChange={setCountryCode} />
              <Input placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <Button
                type="button"
                className={gradientButton}
                disabled={phoneCooldown > 0}
                onClick={() => {
                  setPhoneOtpRequested(true);
                  if (phoneCooldown === 0) setPhoneCooldown(30);
                }}
              >
                {phoneCooldown > 0 ? `Resend in ${phoneCooldown}s` : "Send OTP"}
              </Button>
            </div>
            {phoneOtpRequested && (
              <div className="pt-2 flex items-center gap-2">
                <InputOTP maxLength={4} value={phoneOtp} onChange={(val) => setPhoneOtp(val)}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
                <Button type="button" className={gradientButton} onClick={() => { /* handle phone OTP verify */ }}>
                  Verify
                </Button>
              </div>
            )}
          </Field>

          <Field label="Email">
            <div className="grid grid-cols-[1fr_auto] gap-2 items-center">
              <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Button
                type="button"
                className={gradientButton}
                disabled={emailCooldown > 0}
                onClick={() => {
                  setEmailOtpRequested(true);
                  if (emailCooldown === 0) setEmailCooldown(30);
                }}
              >
                {emailCooldown > 0 ? `Resend in ${emailCooldown}s` : "Send OTP"}
              </Button>
            </div>
            {emailOtpRequested && (
              <div className="pt-2 flex items-center gap-2">
                <InputOTP maxLength={4} value={emailOtp} onChange={(val) => setEmailOtp(val)}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
                <Button type="button" className={gradientButton} onClick={() => { /* handle email OTP verify */ }}>
                  Verify
                </Button>
              </div>
            )}
          </Field>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button className={gradientButton} disabled={!canSubmit} onClick={() => onOpenChange(false)}>Submit</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CountryCode({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const codes = ["+1", "+44", "+91", "+61", "+81"];
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-between w-full">
          <span className="truncate">{value}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-40">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {codes.map((opt) => (
                <CommandItem
                  key={opt}
                  onSelect={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                >
                  {opt}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 text-left">
      <Label className="text-sm text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}


