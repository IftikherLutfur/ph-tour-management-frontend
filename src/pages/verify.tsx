/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "../components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../components/ui/form";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "../components/ui/input-otp";
import { useSendOTPMutation, useVerifyOTPMutation } from "../redux/features/auth/auth-api";
import { cn } from "../lib/utils";

const FormSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
});

export function Verify() {
    const [confirm, setConfirm] = useState(false);
    const [timer, setTimer] = useState(10)
    const location = useLocation();
    const [email] = useState(location.state);
    const [sendOTP] = useSendOTPMutation();
    const [varifyOTP] = useVerifyOTPMutation()
    const navigate = useNavigate()

    // useEffect(() => {
    //     if (!email) {
    //         navigate("/");
    //     }
    // }, [email, navigate]);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    });

    const handleConfirmButton = async () => {
        // setConfirm(true)
        try {
            const res = await sendOTP({ email }).unwrap();
            console.log(res)
            if (res.succes) {
                toast.success("OTP has been sent");
                setConfirm(true);
                setTimer(120)
            } else {
                toast.error(res?.message);
            }
        } catch (error: any) {
            console.error("Error sending OTP:", error);
            toast.error(
                error?.data?.message || "Something went wrong. Please try again."
            );
        }
    };

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        const userInfo = {
            email: email,
            otp: data.pin
        }
        try {
            await varifyOTP(userInfo)
            toast.success("OTP Varified successfully")
            navigate("/")
        }

        catch (err: any) {
            console.log(err, "Varified failed")
        }


        // toast("You submitted the following values", {
        //     description: (
        //         <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
        //             <code className="text-white">
        //                 {JSON.stringify(data, null, 2)}
        //             </code>
        //         </pre>
        //     ),
        // });
        console.log(data);
    }

    useEffect(() => {
        const timerId = setInterval(() => { 
            if(email&& confirm){
                setTimer((prev)=> (prev>0 ? prev-1 : 0))
            }
            // console.log("Tick")
        }, 1000)
        return () => clearInterval(timerId)
    }, [email,confirm])
    

    return (
        <>
            {confirm ? 
                <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
                    <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                        <h1 className="text-2xl font-bold text-gray-800 text-center">
                            Verify Your Account
                        </h1>
                        <p className="text-gray-500 text-center mt-2">
                            Please enter the 6-digit code sent to{" "}
                            <span className="font-medium text-gray-800">
                                {email}
                            </span>
                        </p>

                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-6 text-center mt-4"
                            >
                                <FormField
                                    control={form.control}
                                    name="pin"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col items-center">
                                            <FormLabel className="text-center sr-only">
                                                One-Time Password
                                                
                                            </FormLabel>
                                            <FormControl>
                                                <InputOTP
                                                    maxLength={6}
                                                    {...field}
                                                >
                                                    <InputOTPGroup className="flex justify-center gap-3">
                                                        {[...Array(6)].map(
                                                            (_, index) => (
                                                                <InputOTPSlot
                                                                    key={index}
                                                                    index={index}
                                                                    className="w-12 h-12 text-xl text-center border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
                                                                />
                                                            )
                                                        )}
                                                    </InputOTPGroup>
                                                </InputOTP>
                                            </FormControl>
                                            <FormDescription className="text-center sr-only">
                                                Please enter the one-time
                                                password sent to your phone.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Submit</Button>
                            </form>
                        </Form>

                        <p className="text-sm text-gray-500 text-center mt-6">
                            Resend the code after -- {timer} sec <br />
                            <Button onClick={handleConfirmButton} 
                            type="button"
                            variant="link"
                            className={cn(
                                "p-0 bg-white text-orange-500",
                                {
                                    "cursor-pointer": timer === 0,
                                    "text-gray-400": timer !== 0,
                                }
                            )}
                            disabled={timer!==0}
                            >
                                Resend
                            </Button>
                        </p>
                    </div>
                </div>
             : (
                <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
                    <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                        <h1 className="text-2xl font-bold text-gray-800 text-center">
                            Verify Your Account
                        </h1>
                        <p className="text-gray-500 text-center mt-2">
                            We will send the 6-digit code to{" "}
                            <span className="font-medium text-gray-800">
                                {email}
                            </span>
                        </p>

                        <Button
                            className="w-full"
                            onClick={handleConfirmButton}
                        >
                            Confirm
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}
