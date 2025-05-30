import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text } from '@/components/Themed'
import { MaterialIcons, FontAwesome5, AntDesign } from "@expo/vector-icons";
import { usePathname } from "expo-router";

const icons = {
    wishlist: props => <AntDesign name="star" size={24} {...props} />,
    index: props => <FontAwesome5 name="piggy-bank" size={24} {...props} />,
    statistics: props => <MaterialIcons name="query-stats" size={24} {...props} />
};

export default function TabButton({
    isFocused,
    label,
    routeName,
    color,
    onPress
}) {

    return (
        <Pressable style={styles.container} onPress={onPress}>
            {icons[routeName]?.({ color })}
            <Text style={{
              color: color,
              paddingVertical: 3,
              fontSize: 12
            }}>{label}</Text>
            
                <View
                    style={{
                        height: 3,
                        backgroundColor: isFocused ? color : 'transparent',
                        width: 13,
                        borderRadius: isFocused ? 50 : 0,
                    }}
                ></View>
            
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    label: {
        fontSize: 10,
        marginTop: 2
    }
});
