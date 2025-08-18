/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import { useLoginMutation } from "../../../redux/features/auth/auth-api";
import { Button } from "../../ui/button";
import { data, useNavigate } from "react-router";
import { toast } from "sonner";
import config from "../../../config";

const loginSchema = z.object({
    email: z.email(),
    password: z.string()
})

export function LoginForm() {
    const [login] = useLoginMutation();
    const navigate = useNavigate()
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const onSubmit = async (loginData: z.infer<typeof loginSchema>) => {

        try {
            const res = await login(loginData).unwrap();
            console.log(res)
            navigate("/", { state: loginData.email })
        } catch (error: any) {
            console.log(error)
            if (error.data.message === "User not found") {
                toast.error("Wrong email or password")
            }
            if (error?.status === 401) {
                navigate("/verify", { state: loginData.email });
            }
        }
    }


    return (
        // email
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="email" {...field}
                                />
                            </FormControl>
                            <FormDescription className="sr-only">
                                This is email field
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/*password*/}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="password" {...field}
                                />
                            </FormControl>
                            <FormDescription className="sr-only">
                                This is password field
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex items-center justify-center gap-4">
      <Button type="submit" className="px-6">
        Login
      </Button>

      <Button
        type="button"
        variant="outline"
        className="flex items-center gap-2 px-6"
        onClick={() => window.open(`${config.baseUrl}/auth/google`, "_self")}
      >
        <img
          className="w-5 h-5"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png"
          alt="Google logo"
        />
        Google
      </Button>
    </div>
            </form>
            {/* http://localhost:5000/api/v1/auth/google */}
        </Form>
    )

}