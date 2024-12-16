"use client";

import AiAPI from "@/api/AiAPI";
import InventoryAPI from "@/api/InventoryAPI";
import FoodItemPicker from "@/components/custom/food-item-picker";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { base64ToFile, cn } from "@/lib/utils";
import { AddFoodInventoryProps, FoodResult, ResultsType } from "@/types";
import { AxiosError } from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

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

  const [result, setResult] = useState<FoodResult[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [index, setIndex] = useState<number>(0);
  const { toast } = useToast();

  const FoodPickerRef = useRef<{ getSelectedIndex: () => number[] }>(null); 

  const uploadItems = useCallback(async(selected: number[]) => {
      try {
          const selectedItems: AddFoodInventoryProps[] = selected.map((idx: number) => ({
              food_product_id: result?.[idx].id,
              fresh_until: result?.[idx].fresh_till,
              quantity: 1,
          } as AddFoodInventoryProps));
          
          const response = await InventoryAPI.addItems(selectedItems);

          toast({
              title: "Items added...",
              variant: "default"
          });
      } catch (err) {
          toast({
              title: "Failed to upload items.",
              description: `${err}`,
              variant: "destructive"
          });
      }
  }, [result]);

  const fetchResults = useCallback(async () => {
    try {
      const file = base64ToFile(imageString, "temp.jpeg");
      const formData = new FormData();

      formData.append("image_upload", file);
      formData.append("date_upload", (new Date()).toISOString());
      const results = await AiAPI.infer(formData);

      setResult(JSON.parse(results.data));
    } catch (err) {
      if (err instanceof AxiosError) {
        toast({
          title: "Gangguan dialami. Periksa kembali jaringan Anda.",
          description: `${err}`,
          variant: "destructive",
        });
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
          backgroundColor: freshRGBValue((result?.[index].freshness ?? 0) / 100),
          height: `${result?.[index].freshness ?? 0}%`,
        }}
      />

      <div className="container max-w-[70rem] flex flex-col items-center my-10">
        {/* <div>
          <h2>FoodName: {result?.local_name}</h2>
          <p>FoodType: {result?.food_type}</p>
          <p>Freshness: {result?.freshness}</p>
        </div> */}

        {/* <div className="w-16 h-16 ">
          <Image src="https://placehold.co/400" alt="fruit" width={400} height={400}/>
        </div> */}

        {result?.[index].id ?? <h2>FOOD NOT FOUND</h2>}

        {/* Food Image */}
        <div className="text-center">
          <Avatar className="w-36 h-36 border-4 border-white">
            <AvatarImage src="https://placehold.co/400" />
          </Avatar>
          <h2 className="mt-4 text-2xl font-bold capitalize">
            {result?.[index].local_name}
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

            <div>
              {result?.[index].fresh_till}
            </div>

            <div className="w-full">
                <h2 className="text-2xl text-center">Total Scanned:</h2>
                <p className="text-center">24</p>
            </div>
        </div>

        {/* Freshness */}
        <div>
          <h2 className="text-black font-semibold text-[64px]">{result?.[index].freshness ?? 0}%</h2>
        </div>
      </div>
      <FoodItemPicker
        food_results={result ?? []}
        ref={FoodPickerRef}
      />
      <Button
        variant="default"
        className="w-full"
        onClick={() => {
          uploadItems(FoodPickerRef?.current?.getSelectedIndex() ?? []);
        }}
      >
        Buy
      </Button>
    </section>
  );
}
