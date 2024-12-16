"use client";

import { AddFoodInventoryProps, FoodResult } from "@/types";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "../ui/avatar";
import { Ref, useCallback, useImperativeHandle, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import InventoryAPI from "@/api/InventoryAPI";
import { cn } from "@/lib/utils";

export default function FoodItemPicker({
    food_results,
    ref
}: {
    food_results: FoodResult[];
    ref: Ref<{ getSelection: () => number[] }>;
}) {
    const [selected, setSelected] = useState<number[]>([]);
    const { toast } = useToast();

    const onChange = (index: number) => {
        if (selected.includes(index)) {
            setSelected(selected.filter((i) => i !== index));
        } else {
            setSelected([...selected, index]);
        }
    }

    useImperativeHandle(ref, () => ({
        getSelection: () => selected
    }), [selected]);

    return (
        <div>
            {
                food_results.map((food, index) => (
                    <div key={index} className="flex justify-between items-center p-4 border-b-2 border-gray-200">
                        <Avatar
                            className={cn(
                                "w-36 h-36 border-4 border-white",
                                selected.includes(index) && "border-green-500",
                                !selected.includes(index) && "border-gray-500"
                            )}
                            onClick={() => {
                                onChange(index);
                            }}
                        >
                            <AvatarImage src="https://placehold.co/400" />
                        </Avatar>
                    </div>
                ))
            }
        </div>
    );
}