"use client";

import AiAPI from "@/api/AiAPI";
import { ResultsType } from "@/types";
import { AxiosError } from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
    const params = useParams();
    const imageString = params.image as string;
    const [results, setResults] = useState<ResultsType>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchResults = useCallback(async() => {
        try {
            const results = await AiAPI.infer(imageString);
            setResults(results.data);
        } catch (err) {
            if (err instanceof AxiosError) {
                toast("Gangguan dialami. Periksa kembali jaringan Anda.");
            }
        } finally {
            setIsLoading(false);
        }
    }, [imageString]);

    useEffect(() => {
        fetchResults();
    }, []);

    return (
        <div>
            <Image
                src={imageString}
                alt="image"
            />
        </div>
    );
}