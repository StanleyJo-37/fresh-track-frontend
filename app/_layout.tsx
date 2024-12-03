import { Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import SplashScreenComponent from "@/components/SplashScreenComponent";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import Toast from 'react-native-toast-message';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isFontLoaded] = useFonts({
    "Nunito-ExtraLight": require("@/assets/fonts/Nunito/Nunito-ExtraLight.ttf"),
    "Nunito-ExtraLightItalic": require("@/assets/fonts/Nunito/Nunito-ExtraLightItalic.ttf"),

    "Nunito-Light": require("@/assets/fonts/Nunito/Nunito-Light.ttf"),
    "Nunito-LightItalic": require("@/assets/fonts/Nunito/Nunito-LightItalic.ttf"),

    "Nunito-Regular": require("@/assets/fonts/Nunito/Nunito-Regular.ttf"),
    "Nunito-Italic": require("@/assets/fonts/Nunito/Nunito-Italic.ttf"),

    "Nunito-Medium": require("@/assets/fonts/Nunito/Nunito-Medium.ttf"),
    "Nunito-MediumItalic": require("@/assets/fonts/Nunito/Nunito-MediumItalic.ttf"),

    "Nunito-SemiBold": require("@/assets/fonts/Nunito/Nunito-SemiBold.ttf"),
    "Nunito-SemiBoldItalic": require("@/assets/fonts/Nunito/Nunito-SemiBoldItalic.ttf"),

    "Nunito-Bold": require("@/assets/fonts/Nunito/Nunito-Bold.ttf"),
    "Nunito-BoldItalic": require("@/assets/fonts/Nunito/Nunito-BoldItalic.ttf"),

    "Nunito-ExtraBold": require("@/assets/fonts/Nunito/Nunito-ExtraBold.ttf"),
    "Nunito-ExtraBoldItalic": require("@/assets/fonts/Nunito/Nunito-ExtraBoldItalic.ttf"),
  });

  useEffect(() => {
    const hideSplashScreen = async() => {
      if (isFontLoaded) await SplashScreen.hideAsync();
    }

    hideSplashScreen();
  }, [isFontLoaded]);

  return (
    <GestureHandlerRootView>
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen name="dashboard" />
      </Tabs>
      <Toast />
    </GestureHandlerRootView>
  );
}
