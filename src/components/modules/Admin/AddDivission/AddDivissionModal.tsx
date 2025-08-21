import { Button } from "../../../../components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../../../components/ui/dialog"
import { Input } from "../../../../components/ui/input"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../../ui/form"
import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDivissionPostMutation } from "../../../../redux/features/Division/division.api"
// import { useTourTypePostMutation } from "../../../../redux/features/Tour/tour.api"
// import { toast } from "sonner"

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    description: z.string(),
})

export function AddDivissionModal() {
    const [divissionPost] = useDivissionPostMutation(undefined)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: ""
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const res = await divissionPost({ name: values.name, description: values.description })
        // toast.success(res.data.message)
        console.log(res)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add Tour Type</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Tour Type</DialogTitle>
                </DialogHeader>

                {/* ✅ FormProvider wrapper */}
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="name" // ✅ schema এর সাথে match
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tour Type Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Tour Type Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="sr-only">
                                        This is the Tour Type Name field
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description" // ✅ schema এর সাথে match
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Divission description here"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="sr-only">
                                        This is the divission description field
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
