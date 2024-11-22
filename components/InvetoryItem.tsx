import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Inventory } from "@/types/inventory";
import { Avatar, Card } from "react-native-paper";
import CardContent from "react-native-paper/lib/typescript/components/Card/CardContent";

export default function InventoryItem({ inventory }: { inventory: Inventory }) {
  const url: string = inventory.vegetable.img ?? "";

  const styles = StyleSheet.create({
    container: {
      gap: 15,
      display: "flex",
      flexDirection: "row",
      borderWidth: 0.5,
      borderRadius: 25,
      padding: 10,
      backgroundColor: "#ffffff",

      shadowColor: "#171717",
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 12,
    },
    image: {
      width: 40,
      height: 40,
      borderWidth: 0.5,
      borderRadius: 200,
      padding: 32,
      backgroundColor: "#ffffff",

      shadowColor: "#171717",
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 12,
    },
    detail_container: {},
  });

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("@/assets/images/react-logo.png")} />
      {/* <Avatar.Image source={require("@/assets/images/react-logo.png")} /> */}
      <View style={styles.detail_container}>
        <Text>{inventory.vegetable.name}</Text>
        <Text>{`${"Added: " + inventory.added_at.toLocaleDateString()}`}</Text>
        <Text>{`${
          "Fresh till: " + inventory.added_at.toLocaleDateString()
        }`}</Text>
      </View>
    </View>
  );
}
