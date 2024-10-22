import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Home() {
return (
    <View
        className="flex-1 items-center justify-center bg-white min-h-0 min-w-0"
    >
        <Link href="/(tabs)/viewfinder" onPress={() => console.log("Open Camera NOWWWWWWWWWWWWWWWWWW")}>
            Open Camera
        </Link>
    </View>
);
}
