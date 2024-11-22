import { Link, Redirect, router } from "expo-router";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function Index() {
  return (
    <View>
      <Text>This is the dashboard.</Text>
      <Link href="/dashboard">To dashboard</Link>
      <Link href="/(register)">To register</Link>
      {/* <Button onPress={()=>{
        router.push("/dashboard/Index")
      }}>Click me!</Button> */}
    </View>
  );
}
