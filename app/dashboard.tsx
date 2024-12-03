import InventoryCarousel from "@/components/InventoryCarousel";
import InventoryItem from "@/components/InvetoryItem";
import { Inventory } from "@/types/inventory";
import { Vegetable } from "@/types/vegetable";
import { Href, Link, router } from "expo-router";
import { Text, View } from "react-native";

export const static_img = {
  test: require('@/assets/images/react-logo.png')
}

const vegetable:Vegetable = {
  name: "Choy Sum",
  description: "Yummy veggie",
  img: "test"
}

const dummy: Inventory = {
  vegetable,
  added_at: new Date(),
  fresh_till: new Date()
}

export default function Index() {
  return (
    <View>
      {/* <Text>Edit app/index.tsx to edit this screen.</Text> */}
      {/* <Text>This is the dashboard.</Text>   */}
      {/* <InventoryItem inventory={dummy}/> */}
      <Link href={"/viewfinder" as Href} />
      <InventoryCarousel/>
    </View>
  );
}
