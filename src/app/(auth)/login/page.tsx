"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


export default function Page() {
    const router = useRouter();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 my-4 bg-white rounded-lg shadow-lg">
                <div className="flex justify-center mb-4">
                    <img src="_next/image?url=%2Ffresh-track-logo-fill.png&w=32&q=75" alt="Fresh" className="w-14 h-14"/>
                </div>
                <h2 className="text-2xl font-bold text-center mb-6">
                    Sign in to your account
                </h2>

                <form className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block font-medium mt-5">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="stanley.oliver@binus.ac.id"
                            className="w-full px-3 py-2 mt-1 border-0 rounded-lg bg-gray-100 shadow-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block font-medium mt-5">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder=""
                            className="w-full px-3 py-2 mt-1 border-0 rounded-lg bg-gray-100 shadow-sm"
                        />
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
                        onClick={() => router.push('/register')}
                    >
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    )
} 