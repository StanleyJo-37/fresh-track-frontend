"use client";

import ViewfinderContext from "@/contexts/ViewfinderContext";
import { useState } from "react";

export default function ViewfinderProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [image, setImage] = useState<string>('');
    
    return (
        <ViewfinderContext.Provider value={{ image, setImage }}>
            {children}
        </ViewfinderContext.Provider>
    );
}