import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, User, Mail, Phone, Globe, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { registerUser, verifyRegistrationOtp } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const registerSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    displayName: z.string().min(2, "Name must be at least 2 characters"),
    countryCode: z.string().min(1, "Country code is required"),
});

const SignUp = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<"register" | "otp">("register");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState("");

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            phone: "",
            displayName: "",
            countryCode: "+91",
        },
    });

    const onRegister = async (values: z.infer<typeof registerSchema>) => {
        setLoading(true);
        try {
            const response = await registerUser({ ...values, role: "user" } as any);
            if (response.success) {
                toast.success("Registration successful. Please verify your email.");
                setEmail(values.email);
                setStep("otp");
            } else {
                toast.error(response.message || "Registration failed");
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.message || "An error occurred during registration");
        } finally {
            setLoading(false);
        }
    };

    const onVerifyOtp = async () => {
        if (otp.length !== 4) {
            toast.error("Please enter a valid 4-digit OTP");
            return;
        }
        setLoading(true);
        try {
            const response = await verifyRegistrationOtp({ email, otp });
            if (response.success) {
                toast.success("Email verified successfully!");
                if (response.jwtToken) {
                    localStorage.setItem("token", response.jwtToken);
                    localStorage.setItem("user", JSON.stringify(response.user));
                }
                navigate("/");
            } else {
                toast.error(response.message || "Invalid OTP");
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.message || "Verification failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-[#0a0a0a] overflow-hidden">
            {/* Left Side: Visual/Branding */}
            <div className="hidden lg:flex flex-col p-12 justify-between relative order-last">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 animate-pulse" />
                <div className="absolute top-0 left-0 w-full h-full opacity-30">
                    <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent rounded-full blur-[120px] animate-pulse delay-700" />
                </div>

                <div className="relative z-10 flex items-center gap-2 slide-in-up">
                    <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                        BrookShow
                    </h2>
                </div>

                <div className="relative z-10 space-y-8 slide-in-up" style={{ animationDelay: "0.2s" }}>
                    <div className="space-y-4">
                        <h1 className="text-5xl font-extrabold leading-tight tracking-tight">
                            Start Your <span className="text-primary italic">Premium</span> Journey.
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-md leading-relaxed">
                            Create an account today and get exclusive access to world-class events and experiences.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="glass-modern p-4 rounded-2xl border-white/5 space-y-2">
                            <ShieldCheck className="w-6 h-6 text-primary" />
                            <h3 className="text-sm font-bold">Secure Auth</h3>
                            <p className="text-xs text-muted-foreground">Advanced OTP-based security.</p>
                        </div>
                        <div className="glass-modern p-4 rounded-2xl border-white/5 space-y-2">
                            <Sparkles className="w-6 h-6 text-accent" />
                            <h3 className="text-sm font-bold">VIP Access</h3>
                            <p className="text-xs text-muted-foreground">Priority booking for members.</p>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 slide-in-up" style={{ animationDelay: "0.4s" }}>
                    <footer className="text-sm text-muted-foreground border-t border-white/10 pt-6">
                        Trusted by over <span className="text-white font-bold">50,000+</span> luxury seekers worldwide.
                    </footer>
                </div>
            </div>

            {/* Right Side: Authentication Form */}
            <div className="flex items-center justify-center p-6 sm:p-12 relative">
                {/* Mobile branding */}
                <div className="lg:hidden absolute top-8 left-8 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-primary" />
                    <span className="font-bold text-xl">BrookShow</span>
                </div>

                <Card className="w-full max-w-md glass-modern border-0 relative z-10 fade-in-scale overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary" />

                    <CardHeader className="space-y-2 pb-6">
                        <CardTitle className="text-3xl font-bold text-center">
                            {step === "register" ? "Create Account" : "Verify Email"}
                        </CardTitle>
                        <CardDescription className="text-center text-base">
                            {step === "register" ? "Join the elite BrookShow community" : "Confirm your email to get started"}
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        {step === "register" ? (
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onRegister)} className="space-y-5">
                                    <FormField
                                        control={form.control}
                                        name="displayName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                        <Input placeholder="John Doe" className="pl-10 h-11 bg-white/5 border-white/10 focus:border-primary/50 transition-smooth" {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage className="text-xs" />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                        <Input placeholder="m@example.com" className="pl-10 h-11 bg-white/5 border-white/10 focus:border-primary/50 transition-smooth" {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage className="text-xs" />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="grid grid-cols-3 gap-3">
                                        <FormField
                                            control={form.control}
                                            name="countryCode"
                                            render={({ field }) => (
                                                <FormItem className="col-span-1">
                                                    <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Code</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                                                            <Input placeholder="+91" className="pl-8 h-11 bg-white/5 border-white/10 focus:border-primary/50 transition-smooth" {...field} />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage className="text-xs" />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            render={({ field }) => (
                                                <FormItem className="col-span-2">
                                                    <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone Number</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                            <Input placeholder="1234567890" className="pl-10 h-11 bg-white/5 border-white/10 focus:border-primary/50 transition-smooth" {...field} />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage className="text-xs" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Button type="submit" className="w-full h-12 text-sm font-bold bg-gradient-primary hover:opacity-90 transition-bounce shadow-glow group" disabled={loading}>
                                        {loading ? (
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        ) : (
                                            <>
                                                Create Account
                                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </Form>
                        ) : (
                            <div className="space-y-8 flex flex-col items-center py-2">
                                <div className="text-center space-y-1">
                                    <p className="text-sm text-muted-foreground">Verification code sent to</p>
                                    <p className="font-bold text-white">{email}</p>
                                </div>
                                <InputOTP maxLength={4} value={otp} onChange={setOtp} containerClassName="gap-3">
                                    <InputOTPGroup className="gap-2">
                                        {[0, 1, 2, 3].map((index) => (
                                            <InputOTPSlot
                                                key={index}
                                                index={index}
                                                className="w-14 h-14 text-xl font-bold bg-white/5 border-white/10 rounded-xl focus:border-primary/50"
                                            />
                                        ))}
                                    </InputOTPGroup>
                                </InputOTP>
                                <div className="w-full space-y-4">
                                    <Button
                                        onClick={onVerifyOtp}
                                        className="w-full h-12 font-bold bg-gradient-primary hover:opacity-90 transition-bounce shadow-glow"
                                        disabled={loading}
                                    >
                                        {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Verify & Finish"}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        onClick={() => setStep("register")}
                                        className="w-full text-muted-foreground hover:text-white hover:bg-white/5"
                                    >
                                        Back to Details
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>

                    <CardFooter className="flex flex-col gap-4 pt-4 border-t border-white/5 mt-4">
                        <div className="text-center text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link to="/signin" className="text-primary font-bold hover:underline underline-offset-4">
                                Sign in
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default SignUp;

