import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View
      className="flex-1 items-center justify-center bg-white min-h-0 min-w-0"
    >
      <Link href="./viewfinder">
          Open Camera
      </Link>
    </View>
  );
}
