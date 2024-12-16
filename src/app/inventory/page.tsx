import InventoryAPI from "@/api/InventoryAPI";
import InventoryCard from "@/components/custom/inventory-card";
import { InventoryItem } from "@/types";

export default async function Page() {
  let inventory: InventoryItem[] = [];

  try {
    const response = await InventoryAPI.all();
    inventory = response.data;
  } catch (err: any) {
    console.error("Server Error:", err.response.data);
  };

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
