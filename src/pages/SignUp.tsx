import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { registerUser, verifyRegistrationOtp } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const registerSchema = z.object({
  email: z.string().email(),
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
                // Store token if needed, or just redirect
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
        <div className="min-h-screen grid lg:grid-cols-2">
             <div className="hidden lg:flex flex-col bg-muted text-white p-10 justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/90" />
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold">BrookShow</h2>
                </div>
                <div className="relative z-10">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            "The best way to predict the future is to wait for the event to happen."
                        </p>
                        <footer className="text-sm">Sofia Davis</footer>
                    </blockquote>
                </div>
             </div>
             
             <div className="flex items-center justify-center p-8">
                <Card className="w-full max-w-sm border-0 shadow-none">
                    <CardHeader className="text-center px-0">
                        <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                        <CardDescription>
                            {step === "register" ? "Enter your details to get started" : "Verify your email to continue"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-0">
                        {step === "register" ? (
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onRegister)} className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="displayName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Full Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="John Doe" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="m@example.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                     <div className="grid grid-cols-4 gap-2">
                                        <FormField
                                            control={form.control}
                                            name="countryCode"
                                            render={({ field }) => (
                                                <FormItem className="col-span-1">
                                                    <FormLabel>Code</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="+91" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            render={({ field }) => (
                                                <FormItem className="col-span-3">
                                                    <FormLabel>Phone</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="1234567890" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Button type="submit" className="w-full" disabled={loading}>
                                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Sign Up
                                    </Button>
                                </form>
                            </Form>
                        ) : (
                            <div className="space-y-6 flex flex-col items-center">
                                <div className="text-center space-y-2">
                                    <p className="text-sm text-muted-foreground">
                                        We sent a verification code to <strong>{email}</strong>
                                    </p>
                                </div>
                                <InputOTP maxLength={4} value={otp} onChange={setOtp}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                    </InputOTPGroup>
                                </InputOTP>
                                <Button onClick={onVerifyOtp} className="w-full" disabled={loading}>
                                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Verify
                                </Button>
                                <Button variant="link" onClick={() => setStep("register")} className="text-sm">
                                    Change Email
                                </Button>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="px-0 flex flex-col gap-2">
                        <div className="text-center text-sm text-muted-foreground">
                             Already have an account?{" "}
                             <Link to="/signin" className="underline underline-offset-4 hover:text-primary">
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
