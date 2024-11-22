import { SplashScreen, Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";

export default function RootLayout() {

  const [isFontLoaded] = useFonts({
    'Nunito-ExtraLight': require('@/assets/fonts/Nunito/Nunito-ExtraLight.ttf'),
    'Nunito-ExtraLightItalic': require('@/assets/fonts/Nunito/Nunito-ExtraLightItalic.ttf'),

    'Nunito-Light': require('@/assets/fonts/Nunito/Nunito-Light.ttf'),
    'Nunito-LightItalic': require('@/assets/fonts/Nunito/Nunito-LightItalic.ttf'),
    
    'Nunito-Regular': require('@/assets/fonts/Nunito/Nunito-Regular.ttf'),
    'Nunito-Italic': require('@/assets/fonts/Nunito/Nunito-Italic.ttf'),

    'Nunito-Medium': require('@/assets/fonts/Nunito/Nunito-Medium.ttf'),
    'Nunito-MediumItalic': require('@/assets/fonts/Nunito/Nunito-MediumItalic.ttf'),
    
    'Nunito-SemiBold': require('@/assets/fonts/Nunito/Nunito-SemiBold.ttf'),
    'Nunito-SemiBoldItalic': require('@/assets/fonts/Nunito/Nunito-SemiBoldItalic.ttf'),

    'Nunito-Bold': require('@/assets/fonts/Nunito/Nunito-Bold.ttf'),
    'Nunito-BoldItalic': require('@/assets/fonts/Nunito/Nunito-BoldItalic.ttf'),

    'Nunito-ExtraBold': require('@/assets/fonts/Nunito/Nunito-ExtraBold.ttf'),
    'Nunito-ExtraBoldItalic': require('@/assets/fonts/Nunito/Nunito-ExtraBoldItalic.ttf'),
  });

  if (!isFontLoaded) return <Splash />

  return <Stack screenOptions={{
    headerShown: false,
  }}>
    <Stack.Screen
      name="index"
    />
  </Stack>;
}
