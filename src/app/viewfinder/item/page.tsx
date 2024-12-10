"use client";

import AiAPI from "@/api/AiAPI";
import useViewfinder from "@/hooks/use-viewfinder";
import { ResultsType } from "@/types";
import { AxiosError } from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
    const { image, setImage } = useViewfinder();

    const [results, setResults] = useState<ResultsType>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchResults = useCallback(async() => {
        try {
            const results = await AiAPI.infer(image);
            setResults(results.data);
        } catch (err) {
            if (err instanceof AxiosError) {
                toast("Gangguan dialami. Periksa kembali jaringan Anda.");
            }
        } finally {
            setIsLoading(false);
        }
    }, [image]);

    useEffect(() => {
        fetchResults();
        console.log(image);

        return () => setImage("");
    }, []);

    return (
        <div>
            <img
                src={image}
                alt="image"
            />
            {image}
        </div>
    );
}