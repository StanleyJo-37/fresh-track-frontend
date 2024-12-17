import InventoryAPI from "@/api/InventoryAPI";
import InventoryCard from "@/components/custom/inventory-card";
import { InventoryItem } from "@/types";
import { cookies } from "next/headers";

export default async function Page() {
  let inventory: InventoryItem[] = [];

  try {
    const cookieStore = await cookies();
    const response = await InventoryAPI.all({token: cookieStore.get('freshtrack_token')?.value});
    console.log(response.data);
    inventory = JSON.parse(response.data);
  } catch (err: any) {
    console.error("Server Error:", err);
    inventory = [];
  };

  return (
    <section className="w-full h-full flex justify-center py-16">
      <div className="container max-w-[70rem]">
        {
          inventory ?
            <div className="grid grid-cols-2 gap-12 max-md:grid-cols-1">
              {
                inventory.map((item) => (
                    <InventoryCard
                      food_item={item}
                      key={item.id}
                    />
                  )
                )
              }
            </div> :
            <></>
        }
      </div>
    </section>
  );
}
