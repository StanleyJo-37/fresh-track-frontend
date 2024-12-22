"use client";

import InventoryAPI from "@/api/InventoryAPI";
import InventoryCard from "@/components/custom/inventory-card";
import { InventoryItem } from "@/types";
// import { cookies } from "next/headers";
import { useEffect, useState } from "react";

const getInventory = async () => {
  try {
    const token = localStorage.getItem('freshtrack_token');
    const {data} = await InventoryAPI.all({
      token: token!
    });
    return data;
  } catch (err: any) {
    console.error("Server Error:", err);
    return [];
  }
};

export default async function Page() {
  const [inventory, setInventory] = useState<InventoryItem[]>();
  // let inventory: InventoryItem[] = [];

  // try {
  //   const cookieStore = await cookies();
  //   const response = await InventoryAPI.all({token: cookieStore.get('freshtrack_token')?.value});
  //   inventory = JSON.parse(response.data);
  // } catch (err: any) {
  //   console.error("Server Error:", err);
  //   inventory = [];
  // };

  useEffect(() => {
    getInventory().then((data)=>{
      setInventory(data);
    })
  }, []);

  return (
    <section className="w-full h-full flex justify-center py-16">
      <div className="container max-w-[70rem]">
        {inventory ? (
          <div className="grid grid-cols-2 gap-12 max-md:grid-cols-1">
            {inventory.map((item) => (
              <InventoryCard food_item={item} key={item.id} />
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
}
