import { Colors } from "@/constants/Colors";
import { Stack, Tabs } from "expo-router";
import { useEffect } from "react";
import { PermissionsAndroid } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Toast from 'react-native-toast-message';
import React from "react";

export default function RootLayout() {

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <Toast position="top" />
        <Tabs screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors.light.primary,
        }}>
          <Tabs.Screen
            name="(tabs)/home"
            options={{
              title: 'Home',
              tabBarIcon: (props: { focused: boolean; color: string; size: number; }) => (<></>)
            }}
          />
          {/* <Tabs.Screen
            name="(tabs)/viewfinder"
            options={{
              title: 'Viewfinder',
              tabBarIcon: (props: { focused: boolean; color: string; size: number; }) => (<></>)
            }}
          /> */}
        </Tabs>
        {/* <Stack screenOptions={{
          headerShown: false,
        }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)/viewfinder" />
        </Stack> */}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
