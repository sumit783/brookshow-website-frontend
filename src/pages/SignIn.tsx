import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { requestLoginOtp, verifyLoginOtp } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const loginSchema = z.object({
  email: z.string().email(),
});

const SignIn = () => {
    const navigate = useNavigate();
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
                navigate("/"); 
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
        <div className="min-h-screen grid lg:grid-cols-2">
             <div className="hidden lg:flex flex-col bg-muted text-white p-10 justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-secondary/90" />
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold">BrookShow</h2>
                </div>
                <div className="relative z-10">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            "Simplicity is the ultimate sophistication."
                        </p>
                        <footer className="text-sm">Leonardo da Vinci</footer>
                    </blockquote>
                </div>
             </div>
             
             <div className="flex items-center justify-center p-8">
                <Card className="w-full max-w-sm border-0 shadow-none">
                    <CardHeader className="text-center px-0">
                        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
                        <CardDescription>
                            {step === "email" ? "Enter your email to sign in" : "Enter the OTP sent to your email"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-0">
                        {step === "email" ? (
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onRequestOtp)} className="space-y-4">
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
                                    <Button type="submit" className="w-full" disabled={loading}>
                                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Sign In with Email
                                    </Button>
                                </form>
                            </Form>
                        ) : (
                            <div className="space-y-6 flex flex-col items-center">
                                <div className="text-center space-y-2">
                                    <p className="text-sm text-muted-foreground">
                                        We sent a code to <strong>{email}</strong>
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
                                <Button variant="link" onClick={() => setStep("email")} className="text-sm">
                                    Change Email
                                </Button>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="px-0 flex flex-col gap-2">
                        <div className="text-center text-sm text-muted-foreground">
                             Don't have an account?{" "}
                             <Link to="/signup" className="underline underline-offset-4 hover:text-primary">
                                 Sign up
                             </Link>
                        </div>
                    </CardFooter>
                </Card>
             </div>
        </div>
    );
};

export default SignIn;
