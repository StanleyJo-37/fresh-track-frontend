"use client";

import ViewfinderContext from "@/contexts/ViewfinderContext";
import { useContext } from "react";

export default function useViewfinder() {
    const { image, setImage } = useContext(ViewfinderContext);
    
    return { image, setImage };
}