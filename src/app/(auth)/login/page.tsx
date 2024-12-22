"use client";

import AuthAPI from "@/api/AuthAPI";
import axios from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";


export default function Page() {
    const router = useRouter();
    const [error, setError] = useState<any>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [remember, setRemember] = useState<boolean>(false);

    const handleSubmit =  useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        setIsLoading(true);
        setError("");

        const data = {
            username,
            password,
            remember,
        };

        try {
            const response = await AuthAPI.login(data); 
            router.push("/")
        } catch (err: any) {
            console.error("Server Error:", err.response.data);
            setError(err.response?.data?.message || "Invalid input");
        } finally {
            setIsLoading(false)
        }
    }, [username, password]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 my-4 bg-white rounded-lg shadow-lg">
                <div className="flex justify-center mb-4">
                    <img src="_next/image?url=%2Ffresh-track-logo-fill.png&w=32&q=75" alt="Fresh" className="w-14 h-14"/>
                </div>
                <h2 className="text-2xl font-bold text-center mb-6">
                    Sign in to your account
                </h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block font-medium mt-5">Username</label>
                        <input
                            id="username"
                            type="username"
                            placeholder="Stanley oliver"
                            // value={formData.username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 border-0 rounded-lg bg-gray-100 shadow-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block font-medium mt-5">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder=""
                            // value={formData.password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 mt-1 border-0 rounded-lg bg-gray-100 shadow-sm"
                        />
                    </div>
                    <div className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={remember}
                            onCheckedChange={() => {setRemember(!remember)}}
                        />
                        <Label htmlFor="remember" className="ml-2 items-">Remember me</Label>
                    </div>
                    <Button 
                        variant="default"
                        className="w-full"
                    >
                        SIGN IN
                    </Button>
                </form>
                <p className="text-sm text-center mt-2">
                    Don't have an account?{' '}
                    <button
                        className="text-green-600"
                        type="submit"
                        disabled={isLoading}
                        onClick={() => router.push('/register')}
                    >
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    )
} 