import React from "react";
import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import {ActivityIndicator} from "react-native";

export function CustomLoading({ text }) {
    const theme = useColorScheme() ?? "light";
    const colors = Colors[theme];
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.secondary[50]
            }}
        >
            <ActivityIndicator size="large" color={colors.primary[400]} />
            <Text style={{
              marginTop: 20,
              color: colors.secondary[400]
            }}>{text}</Text>
        </View>
    );
}
