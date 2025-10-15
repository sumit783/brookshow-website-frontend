import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

type ArtistJoinDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const TALENT_OPTIONS = [
  "Singer",
  "DJ",
  "Band",
  "Dancer",
  "Comedian",
  "Magician",
  "Host/MC",
];

const SPECIALTY_OPTIONS = [
  "Weddings",
  "Corporate Events",
  "Birthdays",
  "Nightclubs",
  "Festivals",
  "Charity Shows",
];

const SOCIAL_OPTIONS = ["Instagram", "Facebook", "Twitter/X", "YouTube", "TikTok", "LinkedIn", "Website"];

export function ArtistJoinDialog({ open, onOpenChange }: ArtistJoinDialogProps) {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [talents, setTalents] = useState<string[]>([]);
  const [about, setAbout] = useState("");
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [eventsCompleted, setEventsCompleted] = useState("");
  const [experienceYears, setExperienceYears] = useState("");

  const [pendingSocial, setPendingSocial] = useState<{ platform: string; url: string }>({ platform: "", url: "" });
  const [socialLinks, setSocialLinks] = useState<Array<{ platform: string; url: string }>>([]);

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

  const toggleMulti = useCallback((list: string[], value: string, setList: (v: string[]) => void) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }, []);

  const canSubmit = useMemo(() => {
    return (
      !!name && talents.length > 0 && !!city && !!state && !!email && !!phone && phoneOtp.length === 4 && emailOtp.length === 4
    );
  }, [name, talents, city, state, email, phone, phoneOtp, emailOtp]);

  const addSocial = () => {
    if (!pendingSocial.platform || !pendingSocial.url) return;
    setSocialLinks((prev) => [...prev, pendingSocial]);
    setPendingSocial({ platform: "", url: "" });
  };

  useEffect(() => {
    if (phoneCooldown <= 0) return;
    const id = setInterval(() => {
      setPhoneCooldown((v) => (v > 0 ? v - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [phoneCooldown]);

  useEffect(() => {
    if (emailCooldown <= 0) return;
    const id = setInterval(() => {
      setEmailCooldown((v) => (v > 0 ? v - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [emailCooldown]);

  const gradientButton = "bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 text-white hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Join as Artist</DialogTitle>
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

          <Field label="Talent">
            <MultiSelect
              options={TALENT_OPTIONS}
              selected={talents}
              onToggle={(v) => toggleMulti(talents, v, setTalents)}
              placeholder="Select talents"
            />
            <div className="flex flex-wrap gap-2 pt-1">
              {talents.map((t) => (
                <Badge
                  key={t}
                  variant="secondary"
                  className="cursor-pointer select-none"
                  onClick={() => toggleMulti(talents, t, setTalents)}
                  title="Remove"
                >
                  {t}
                  <span className="ml-1 text-xs">×</span>
                </Badge>
              ))}
            </div>
          </Field>

          <Field label="About">
            <Textarea placeholder="Tell us about yourself" value={about} onChange={(e) => setAbout(e.target.value)} />
          </Field>

          <Field label="Specialties">
            <MultiSelect
              options={SPECIALTY_OPTIONS}
              selected={specialties}
              onToggle={(v) => toggleMulti(specialties, v, setSpecialties)}
              placeholder="Select specialties"
            />
            <div className="flex flex-wrap gap-2 pt-1">
              {specialties.map((s) => (
                <Badge
                  key={s}
                  variant="secondary"
                  className="cursor-pointer select-none"
                  onClick={() => toggleMulti(specialties, s, setSpecialties)}
                  title="Remove"
                >
                  {s}
                  <span className="ml-1 text-xs">×</span>
                </Badge>
              ))}
            </div>
          </Field>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="City">
              <Input placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
            </Field>
            <Field label="State">
              <Input placeholder="State" value={state} onChange={(e) => setState(e.target.value)} />
            </Field>
          </div>

            <Field label="Years of Experience">
              <Input type="number" inputMode="numeric" placeholder="0" value={experienceYears} onChange={(e) => setExperienceYears(e.target.value)} />
            </Field>
          <Field label="Connect">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <MultiCombo
                options={SOCIAL_OPTIONS}
                value={pendingSocial.platform}
                onChange={(v) => setPendingSocial((p) => ({ ...p, platform: v }))}
                placeholder="Platform"
              />
              <Input placeholder="Profile URL" value={pendingSocial.url} onChange={(e) => setPendingSocial((p) => ({ ...p, url: e.target.value }))} />
              <Button type="button" onClick={addSocial} disabled={!pendingSocial.platform || !pendingSocial.url}>Add</Button>
            </div>
            {!!socialLinks.length && (
              <div className="flex flex-wrap gap-2 pt-1">
                {socialLinks.map((s, idx) => (
                  <Badge key={`${s.platform}-${idx}`} variant="outline">{s.platform}: {s.url}</Badge>
                ))}
              </div>
            )}
          </Field>

          <Field label="Phone Number">
            <div className="grid grid-cols-[120px_1fr_auto] gap-2 items-center">
              <MultiCombo options={["+1", "+44", "+91", "+61", "+81"]} value={countryCode} onChange={setCountryCode} />
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

function MultiSelect({ options, selected, onToggle, placeholder }: { options: string[]; selected: string[]; onToggle: (value: string) => void; placeholder?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-between">
          <span className="truncate">{selected.length ? `${selected.length} selected` : placeholder || "Select"}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-64">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt}
                  onSelect={() => {
                    onToggle(opt);
                    setOpen(false);
                  }}
                >
                  <div className="mr-2">
                    <Checkbox checked={selected.includes(opt)} aria-label={opt} />
                  </div>
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

function MultiCombo({ options, value, onChange, placeholder }: { options: string[]; value: string; onChange: (v: string) => void; placeholder?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-between w-full">
          <span className="truncate">{value || placeholder || "Select"}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-56">
        <Command>
          <CommandInput placeholder="Search..." />
        <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
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


