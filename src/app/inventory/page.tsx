import InventoryAPI from "@/api/InventoryAPI";
import InventoryCard from "@/components/custom/inventory-card";
import { InventoryItem } from "@/types";
import { useEffect, useState } from "react";

export default function Page() {
  const [inventory, setInventory] = useState<InventoryItem[]>();

  const fetchInventory = async () => {
    try {
      const response = await InventoryAPI.all();
      setInventory(response.data);
    } catch (err: any) {
      console.error("Server Error:", err.response.data);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <section className="w-full h-full flex justify-center">
      <div className="container max-w-[70rem]">
        {
          inventory?.map((item) => (
              <InventoryCard
                food_item={item}
                key={item.id}
              />
            )
          )
        }
      </div>
    </section>
  );
}
