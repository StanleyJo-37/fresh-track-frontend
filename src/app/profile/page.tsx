"use client";

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { UserType } from "@/types";
import { UserCircleIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
    username: z.string(),
    email: z.string().email().default(""),
    password: z.string().default(""),
    conf_password: z.string().default(""),
});

export default function Page() {
    const [user, setUser] = useState<UserType | undefined>(
        {
            username: "Stanley",
        }
    );

    // const fetchUser = async() => {
    //     try {
    //         const data = await 
    //     }
    // }

    // useEffect(() => {
    //     fetchUser();
    // }, []);

    // const {
    //     control,
    //     register,
    //     watch,
    //     formState: {
    //         isDirty,
    //         isLoading,
    //         errors,
    //     }
    // } = useForm<z.infer<typeof schema>>({
    //     resolver: zodResolver(schema),
    //     defaultValues: {
    //         username: user?.username ?? "",
    //         email: user?.email ?? "",
    //         password: "",
    //         conf_password: ""
    //     }
    // });

    const formHook = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            username: user?.username ?? "",
            email: user?.email ?? "",
            password: "",
            conf_password: ""
        }
    });


    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="flex flex-col items-center justify-center space-y-20">
                <div className="flex flex-col items-center justify-center">
                    {
                        user?.avatar
                        ? (
                            <Image
                                src={user.avatar}
                                alt="Avatar"
                                className="rounded-full w-20 h-20"
                            />
                        )
                        : (
                            <UserCircleIcon
                                className="rounded-full w-20 h-20"
                            />
                        )
                    }
                    <h1>{user?.username}</h1>
                </div>
                <Form
                    {...formHook}
                >
                    <div className="flex flex-col space-y-12">
                        <div className="flex flex-col space-y-4">
                            <FormField
                                control={formHook.control}
                                name="username"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Username:</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="bg-[#f6f6f6] font-[#d1d1d1] !outline-none !border-none"
                                                placeholder="Username..."
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={formHook.control}
                                name="email"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Email:</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="bg-[#f6f6f6] font-[#d1d1d1] !outline-none !border-none"
                                                placeholder="Email..."
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={formHook.control}
                                name="password"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Password:</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="bg-[#f6f6f6] font-[#d1d1d1] !outline-none !border-none"
                                                placeholder="Enter your password..."
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={formHook.control}
                                name="conf_password"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Confirm Password:</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="bg-[#f6f6f6] font-[#d1d1d1] !outline-none !border-none"
                                                placeholder="Enter your password again..."
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex w-full justify-center space-x-4">
                            <Button
                                variant="destructive"
                                className="w-28"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="default"
                                className="w-28"
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
}