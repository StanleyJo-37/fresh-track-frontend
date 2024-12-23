"use client";

import AuthAPI from "@/api/AuthAPI";
import axios from "@/api/axios";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Page() {

    const router = useRouter();
    router.replace("/login");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
        confPassword: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({...formData, [id]: value});
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confPassword) {
            setError("Passwords do not match!");
            return;
        }

        setIsLoading(true);
        setError("");
        
        const data = {
            email: formData.email,
            username: formData.username,
            password: formData.password,
            confirm_password: formData.confPassword,
        };

        console.log(data)

        try {
            // console.log(formData);
            // const response = await AuthAPI.register(data);

            // console.log(response.data);

            // router.push("/login")
        } catch (err: any) {
            console.error("Server Error:", err.response.data);
            setError(err.response?.data?.message || "Invalid input");
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <></>
    );

    // return (
    //     <div className="flex items-center justify-center min-h-screen bg-gray-50">
    //         <div className="w-full max-w-md p-8 my-4 bg-white rounded-lg shadow-lg">
    //             <div className="flex justify-center mb-4">
    //                 <img src="_next/image?url=%2Ffresh-track-logo-fill.png&w=32&q=75" alt="Fresh" className="w-14 h-14"/>
    //             </div>
    //             <h2 className="text-2xl font-bold text-center mb-6">
    //                 Create your account
    //             </h2>

    //             {error && <p className="text-red-500 text-center mb-4">{error}</p>}

    //             <form className="space-y-4" onSubmit={handleSubmit}>
    //                 <div>
    //                     <label htmlFor="username" className="block font-medium">Username</label>
    //                     <input
    //                         id="username"
    //                         type="text"
    //                         placeholder="Stanley Oliver"
    //                         value={formData.username}
    //                         onChange={handleInputChange}
    //                         required
    //                         className="w-full px-3 py-2 mt-1 border-0 rounded-lg bg-gray-100 shadow-sm"
    //                     />
    //                 </div>
    //                 <div>
    //                     <label htmlFor="email" className="block font-medium mt-5">Email</label>
    //                     <input
    //                         id="email"
    //                         type="email"
    //                         placeholder="stanley.oliver@binus.ac.id"
    //                         value={formData.email}
    //                         onChange={handleInputChange}
    //                         required
    //                         className="w-full px-3 py-2 mt-1 border-0 rounded-lg bg-gray-100 shadow-sm"
    //                     />
    //                 </div>
    //                 <div>
    //                     <label htmlFor="password" className="block font-medium mt-5">Password</label>
    //                     <input
    //                         id="password"
    //                         type="password"
    //                         placeholder=""
    //                         value={formData.password}
    //                         onChange={handleInputChange}
    //                         required
    //                         className="w-full px-3 py-2 mt-1 border-0 rounded-lg bg-gray-100 shadow-sm"
    //                     />
    //                 </div>
    //                 <div>
    //                     <label htmlFor="confPassword" className="block font-medium mt-5">Confrim Password</label>
    //                     <input
    //                         id="confPassword"
    //                         type="password"
    //                         placeholder=""
    //                         value={formData.confPassword}
    //                         onChange={handleInputChange}
    //                         required
    //                         className="w-full px-3 py-2 mt-1 mb-6 border-0 rounded-lg bg-gray-100 shadow-sm"
    //                     />
    //                 </div>
    //                 <Button 
    //                     variant="default"
    //                     className="w-full"
    //                     type="submit"
    //                     disabled={isLoading}
    //                 >
    //                     SIGN UP
    //                 </Button>
    //             </form>
    //             <p className="text-sm text-center mt-2">
    //                 Already have an account?{' '}
    //                 <button
    //                     className="text-green-600"
    //                     onClick={() => router.push("/login")}
    //                 >
    //                     Sign In
    //                 </button>
    //                 {/* <a href="" className="text-green-600" onClick={() => router.push('/auth/login')}>Sign In</a> */}
    //             </p>
    //         </div>
    //     </div>
    // )
} 