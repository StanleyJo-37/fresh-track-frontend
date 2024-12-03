import { Link, Redirect, router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function Index() {
  return (
    <View>
      <Text>This is the dashboard.</Text>
      <Link href="./dashboard" asChild>
        <Pressable>
          <Text>Home</Text>
        </Pressable>
      </Link>
      <Link href="/(register)">To register</Link>
      {/* <Button onPress={()=>{
        router.push("/dashboard/Index")
      }}>Click me!</Button> */}
    </View>
  );
}
