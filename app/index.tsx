import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <View className="flex-1 items-center justify-center ">
        <Text className="font-bold text-3xl text-red-500">
          Hello there
        </Text>
        <Text>
          Hi
        </Text>
      </View>
    </View>
  );
}
