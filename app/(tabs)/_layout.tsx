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
} from 'react-native'
import Colors from "@/constants/Colors";
import {
  useColorScheme
} from "@/hooks/useColorScheme";
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function _layout() {
  const colors = Colors[useColorScheme() ?? "light"];
  return (
    <SafeAreaProvider>
      <StatusBar translucent={false} backgroundColor={colors.background} />
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