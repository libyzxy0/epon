import React from "react";
import {
  Text,
  View
} from "@/components/Themed";
import {
  useColorScheme
} from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import {
  Image
} from "expo-image";
import logo from "@/assets/images/logo.png";

export function CustomLoading({
  text
}: { text: string; }) {
  const colors = Colors[(useColorScheme() ?? "light")];
  return (
    <View
      style={ {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.card
      }}
      >
      <Image

        style={ {
          height: 200,
          width: 200
        }}
        source={logo}
        contentFit="contain"
        />
      <Text style={ {
        marginTop: 20,
        color: colors.textSecondary
      }}>{text}</Text>
    </View>
  );
}