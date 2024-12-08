"use client";

import AiAPI from "@/api/AiAPI";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { base64ToFile, cn } from "@/lib/utils";
import { ResultsType } from "@/types";
import { AxiosError } from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

type FoodResult = {
  food_name: string;
  food_type: string;
  freshness: number;
  fresh_till: string;
};

const freshRGBValue = (value: number) => {
  // Define RGB values for red, yellow, and green
  const red = [255, 0, 0];
  const yellow = [255, 255, 0];
  const green = [0, 255, 0];

  let startColor, endColor;

  // Determine the color range based on the value
  if (value < 0.5) {
    startColor = red;
    endColor = yellow;
    value = value * 2; // Normalize value for range 0-1 between red and yellow
  } else {
    startColor = yellow;
    endColor = green;
    value = (value - 0.5) * 2; // Normalize value for range 0-1 between yellow and green
  }

  // Perform the linear interpolation
  const r = Math.round(startColor[0] + value * (endColor[0] - startColor[0]));
  const g = Math.round(startColor[1] + value * (endColor[1] - startColor[1]));
  const b = Math.round(startColor[2] + value * (endColor[2] - startColor[2]));

  // Return the color as a string in rgb() format
  return `rgb(${r}, ${g}, ${b})`;
};

export default function Page() {
  let imageString = "";
  if (typeof window !== "undefined" && window.localStorage) {
    imageString = localStorage.getItem("snapped_image") as string;
  }

  const [result, setResult] = useState<FoodResult>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchResults = useCallback(async () => {
    try {
      const file = base64ToFile(imageString, "temp.jpeg");
      const formData = new FormData();

      formData.append("image_upload", file);
      const results = await AiAPI.infer(formData);

      setResult(JSON.parse(results.data));
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

  useEffect(() => {
    console.log(result);
  }, [result]);

  return (
    <section className="relative w-full h-full flex justify-center">
      <div
        className={cn(
          "w-full absolute -z-10 bottom-0 transition-all duration-300"
        )}
        style={{
          backgroundColor: freshRGBValue((result?.freshness ?? 0) / 100),
          height: `${result?.freshness ?? 0}%`,
        }}
      />

      <div className="container max-w-[70rem] flex flex-col items-center my-10">
        {/* <div>
          <h2>FoodName: {result?.food_name}</h2>
          <p>FoodType: {result?.food_type}</p>
          <p>Freshness: {result?.freshness}</p>
        </div> */}

        {/* <div className="w-16 h-16 ">
          <Image src="https://placehold.co/400" alt="fruit" width={400} height={400}/>
        </div> */}

        {/* Food Image */}
        <div className="text-center">
          <Avatar className="w-36 h-36 border-4 border-white">
            <AvatarImage src="https://placehold.co/400" />
          </Avatar>
          <h2 className="mt-4 text-2xl font-bold capitalize">
            {result?.food_name}
          </h2>
        </div>

        {/* Details */}
        <div className="flex-1 w-full max-w-[480px] mt-6 flex gap-4">
            <div className="w-full">
                <h2 className="text-2xl text-center">Nutritional Facts:</h2>
                <p>Energy: 100</p>
                <p>Protein: 100</p>
                <p>Carbs: 100</p>
                <p>Sugar: 100</p>
                <p>Sodium: 100</p>
                <p>Iron: 100</p>
            </div>

            <div className="w-full">
                <h2 className="text-2xl text-center">Total Scanned:</h2>
                <p className="text-center">24</p>
            </div>
        </div>

        {/* Freshness */}
        <div>
          <h2 className="text-black font-semibold text-[64px]">{result?.freshness ?? 0}%</h2>
        </div>
      </div>
    </section>
  );
}
