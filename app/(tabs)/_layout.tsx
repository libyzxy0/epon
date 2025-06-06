import React, {
  useEffect
} from "react";
import {
  Tabs
} from "expo-router";
import TabBar from "@/components/TabBar";
import {
  View
} from "@/components/Themed";
import {
  StatusBar
} from 'expo-status-bar'
import Colors from "@/constants/Colors";
import {
  useColorScheme
} from "@/hooks/useColorScheme";
import {
  SafeAreaProvider
} from 'react-native-safe-area-context';
import Storage from "expo-sqlite/kv-store";
import {
  useRouter
} from "expo-router";
import Onboarding from '@/app/onboarding'

export default function _layout() {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  const router = useRouter();

  const onboarding = Storage.getItemSync("onboardingCompleted");
  
  if (onboarding === null) {
    return <Onboarding />
  }


  return (
    <SafeAreaProvider>
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
      <Tabs
        tabBar={props => <TabBar {...props} />}
        screenOptions={ {
          headerShown: false
        }}
        >
        <Tabs.Screen
          name="wishlist"
          options={ {
            title: "Wishlist",
            animation: 'fade'
          }}
          />
        <Tabs.Screen
          name="index"
          options={ {
            title: "Home",
            animation: 'fade'
          }}
          />
        <Tabs.Screen
          name="statistics"
          options={ {
            title: "Statistics",
            animation: 'fade'
          }}
          />
      </Tabs>
    </SafeAreaProvider>
  );
}