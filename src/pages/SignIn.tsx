import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Mail, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { requestLoginOtp, verifyLoginOtp } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

const SignIn = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = location.state?.redirectTo || "/";
    const [step, setStep] = useState<"email" | "otp">("email");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState("");

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
        },
    });

    const onRequestOtp = async (values: z.infer<typeof loginSchema>) => {
        setLoading(true);
        try {
            const response = await requestLoginOtp(values.email);
            if (response.success) {
                toast.success("OTP sent to your email.");
                setEmail(values.email);
                setStep("otp");
            } else {
                toast.error(response.message || "Failed to send OTP");
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.message || "An error occurred");
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
            const response = await verifyLoginOtp({ email, otp, isLogin: true });
            if (response.success) {
                toast.success("Login successful!");
                if (response.jwtToken) {
                    localStorage.setItem("token", response.jwtToken);
                    localStorage.setItem("user", JSON.stringify(response.user));
                }
                navigate(redirectTo);
            } else {
                toast.error(response.message || "Invalid OTP");
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-[#0a0a0a] overflow-hidden">
            {/* Left Side: Visual/Branding */}
            <div className="hidden lg:flex flex-col p-12 justify-between relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 animate-pulse" />
                <div className="absolute top-0 left-0 w-full h-full opacity-30">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent rounded-full blur-[120px] animate-pulse delay-700" />
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
                            Experience the <span className="text-primary italic">Ultimate</span> Sophistication.
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-md leading-relaxed">
                            Join our community and discover premium exclusive events tailored just for you.
                        </p>
                    </div>

                    <div className="flex gap-4 items-center">
                        <div className="flex -space-x-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-12 h-12 rounded-full border-4 border-[#0a0a0a] bg-gray-800 overflow-hidden shadow-soft">
                                    <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-muted-foreground font-medium">
                            <span className="text-white">1,200+</span> members joined this week
                        </p>
                    </div>
                </div>

                <div className="relative z-10 slide-in-up" style={{ animationDelay: "0.4s" }}>
                    <footer className="text-sm text-muted-foreground border-t border-white/10 pt-6">
                        © 2024 BrookShow Inc. All rights reserved.
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

                    <CardHeader className="space-y-2 pb-8">
                        <div className="flex justify-center mb-2 lg:hidden">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                                <ShieldCheck className="w-7 h-7 text-primary" />
                            </div>
                        </div>
                        <CardTitle className="text-3xl font-bold text-center">
                            {step === "email" ? "Welcome Back" : "Security Verification"}
                        </CardTitle>
                        <CardDescription className="text-center text-base">
                            {step === "email" ? "Enter your email to access your account" : "We've sent a code to your email"}
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        {step === "email" ? (
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onRequestOtp)} className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Email Address</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                        <Input
                                                            placeholder="m@example.com"
                                                            className="pl-10 h-12 bg-white/5 border-white/10 focus:border-primary/50 focus:ring-primary/20 transition-smooth"
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage className="text-xs" />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="submit"
                                        className="w-full h-12 text-sm font-bold bg-gradient-primary hover:opacity-90 transition-bounce shadow-glow group"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        ) : (
                                            <>
                                                Continue
                                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </Form>
                        ) : (
                            <div className="space-y-8 flex flex-col items-center py-2">
                                <div className="text-center space-y-1">
                                    <p className="text-sm text-muted-foreground">
                                        Check your inbox at
                                    </p>
                                    <p className="font-bold text-white">{email}</p>
                                </div>
                                <InputOTP maxLength={4} value={otp} onChange={setOtp} containerClassName="gap-3">
                                    <InputOTPGroup className="gap-2">
                                        {[0, 1, 2, 3].map((index) => (
                                            <InputOTPSlot
                                                key={index}
                                                index={index}
                                                className="w-14 h-14 text-xl font-bold bg-white/5 border-white/10 rounded-xl focus:border-primary/50 focus:ring-primary/20"
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
                                        {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Verify Identity"}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        onClick={() => setStep("email")}
                                        className="w-full text-muted-foreground hover:text-white hover:bg-white/5"
                                    >
                                        Change Email
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>

                    <CardFooter className="flex flex-col gap-4 pt-6">
                        <div className="w-full flex items-center gap-4 text-muted-foreground text-xs uppercase font-bold tracking-widest before:content-[''] before:flex-1 before:h-px before:bg-white/10 after:content-[''] after:flex-1 after:h-px after:bg-white/10">
                            New here?
                        </div>
                        <Button variant="outline" className="w-full h-12 border-white/10 bg-transparent hover:bg-white/5 transition-smooth" asChild>
                            <Link to="/signup">
                                Create an Account
                            </Link>
                        </Button>

                        <div className="w-full flex items-center gap-4 text-primary/50 text-xs uppercase font-bold tracking-widest before:content-[''] before:flex-1 before:h-px before:bg-primary/10 after:content-[''] after:flex-1 after:h-px after:bg-primary/10 pt-4">
                            Partner Portals
                        </div>
                        <div className="grid grid-cols-2 gap-3 w-full">
                            <Button
                                variant="outline"
                                className="h-10 border-primary/20 bg-primary/5 hover:bg-primary/10 text-xs font-bold transition-smooth hover:text-gray-200"
                                asChild
                            >
                                <a href="https://artist.brookshow.com" target="_blank" rel="noopener noreferrer">
                                    Artist Dashboard
                                </a>
                            </Button>
                            <Button
                                variant="outline"
                                className="h-10 border-accent/20 bg-accent/5 hover:bg-accent/10 text-xs font-bold transition-smooth hover:text-gray-200"
                                asChild
                            >
                                <a href="https://planner.brookshow.com" target="_blank" rel="noopener noreferrer">
                                    Planner Dashboard
                                </a>
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default SignIn;

