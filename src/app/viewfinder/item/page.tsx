"use client";

import AiAPI from "@/api/AiAPI";
import InventoryAPI from "@/api/InventoryAPI";
import FoodItemPicker from "@/components/custom/food-item-picker";
import { Icons } from "@/components/icons";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useToast } from "@/hooks/use-toast";
import { base64ToFile, cn } from "@/lib/utils";
import { AddFoodInventoryProps, FoodResult, ResultsType } from "@/types";
import { useWindowSize } from "@uidotdev/usehooks";
import { AxiosError } from "axios";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

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

  const [results, setResult] = useState<FoodResult[]>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [index, setIndex] = useState<number>(0);
  const { toast } = useToast();

  const { width: screenWidth } = useWindowSize();

  // const FoodPickerRef = useRef<{ getSelectedIndex: () => number[] }>(null);

  const [selected, setSelected] = useState<number[]>([]);
  const onSelect = (index: number) => {
    if (selected.includes(index)) {
      setSelected(selected.filter((i) => i !== index));
    } else {
      setSelected([...selected, index]);
    }
  };

  const uploadItems = useCallback(
    async (selected: number[]) => {
      setLoading(true);
      try {
        const selectedItems: AddFoodInventoryProps[] = selected.map(
          (idx: number) =>
            ({
              food_product_id: results?.[idx].id,
              fresh_until: results?.[idx].fresh_till,
              quantity: 1,
            } as AddFoodInventoryProps)
        );

        const token = localStorage.getItem("freshtrack_token");
        const response = await InventoryAPI.addItems({
          food_items: selectedItems,
          token: token!,
        });

        toast({
          title: "Items added...",
          variant: "default",
        });

        // router.back();
      } catch (err) {
        toast({
          title: "Failed to upload items.",
          description: `${err}`,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [results]
  );

  const fetchResults = useCallback(async () => {
    try {
      const file = base64ToFile(imageString, "temp.jpeg");
      const formData = new FormData();

      formData.append("image_upload", file);
      formData.append("date_upload", new Date().toISOString());

      const token = localStorage.getItem("freshtrack_token");
      const response = await AiAPI.infer(formData, token!);
      const data = JSON.parse(response.data);

      setResult(data);
    } catch (err) {
      if (err instanceof AxiosError) {
        toast({
          title: "Gangguan dialami. Periksa kembali jaringan Anda.",
          description: `${err}`,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  }, [imageString]);

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <section className="relative w-full h-screen flex max-md:flex-col justify-center">
      <div
        className={cn(
          "w-full absolute -z-10 bottom-0 transition-all duration-300"
        )}
        style={{
          backgroundColor: freshRGBValue(
            (results?.[index].freshness ?? 0) / 100
          ),
          height: `${results?.[index].freshness ?? 0}%`,
        }}
      />

      <div className="w-full h-auto flex flex-row justify-center items-center">
        {results?.length! > 1 && (
          <ChevronLeftCircle className="w-10 h-10 hover:cursor-pointer"
            onClick={() => {
              if (index > 0) setIndex(index - 1);
            }}
          />
        )}

        <div className="container max-w-[70rem] flex flex-col items-center my-10">
          {/* Food Image */}
          {!isLoading ? (
            <div className="text-center">
              <Avatar className="w-36 h-36 border-4 border-white">
                <AvatarImage src="https://placehold.co/400" />
              </Avatar>
              <h2 className="mt-4 text-2xl font-bold capitalize">
                {results?.[index].local_name}
              </h2>

              <div>
                <h2 className="text-black font-semibold text-[64px]">
                  {results?.[index].freshness ?? 0}%
                </h2>
              </div>
            </div>
          ) : (
            <>
              <Icons.LoaderCircle className="animate-spin w-16 h-16" />
            </>
          )}

          {/* Details */}
          {/* <div className="flex-1 w-full max-w-[480px] mt-6 flex gap-4">
            <div className="w-full">
              <h2 className="text-2xl text-center">Nutritional Facts:</h2>
              <p>Energy: 100</p>
              <p>Protein: 100</p>
              <p>Carbs: 100</p>
              <p>Sugar: 100</p>
              <p>Sodium: 100</p>
              <p>Iron: 100</p>
            </div>

            <div>{results?.[index].fresh_till}</div>

            <div className="w-full">
              <h2 className="text-2xl text-center">Total Scanned:</h2>
              <p className="text-center">24</p>
            </div>
          </div> */}

          {/* Freshness */}
        </div>

        {results?.length! > 1 && (
          <ChevronRightCircle className="w-10 h-10 hover:cursor-pointer"
            onClick={() => {
              if (index < results?.length! - 1) setIndex(index + 1);
            }}
          />
        )}
      </div>
      
      { !isLoading &&
        <div className="flex flex-col w-full md:w-fit justify-center items-center space-y-4">
          <Carousel
            className="w-full"
            orientation={screenWidth! < 768 ? "horizontal" : "vertical"}
          >
            <CarouselContent className="-ml-0">
              {results?.map((food, index) => (
                <CarouselItem
                  key={index}
                  className="flex flex-col items-center p-4"
                >
                  <Avatar
                    className={cn(
                      "w-24 h-24 border-4 border-white",
                      selected.includes(index) && "border-green-500",
                      !selected.includes(index) && "border-gray-500"
                    )}
                    onClick={() => {
                      onSelect(index);
                    }}
                  >
                    <AvatarImage src="https://placehold.co/400" />
                  </Avatar>
                  <h2>{food.local_name}</h2>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <Button
            variant="default"
            className="w-32"
            onClick={() => {
              uploadItems(selected ?? []);
            }}
          >
            Beli
          </Button>
        </div>
      }
    </section>
  );
}
