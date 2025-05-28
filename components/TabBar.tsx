import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, Button } from "@/components/Themed";
import TabButton from "@/components/TabButton";
import { useColorScheme } from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";

export default function TabBar({ state, descriptors, navigation }) {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];

  return (
    <View default>
      <View
      default
        style={styles.tabbar}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel || options.title || route.name;

          if (["_sitemap", "+not-found"].includes(route.name)) return null;

          const isFocused = state.index === index;
          const onPress = () => !isFocused && navigation.navigate(route.name);

          return (
            <TabButton
              key={route.name}
              onPress={onPress}
              isFocused={isFocused}
              routeName={route.name}
              color={
                isFocused ? colors.primary[600] : colors.secondary[600]
              }
              label={label}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden"
  }
});

export default TabBar;
