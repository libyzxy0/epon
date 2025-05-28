import { useColorScheme } from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import { Text, View } from "@/components/Themed";
import { Pressable } from "react-native";

export function WishlistCard({
    id,
    name,
    price,
    progress,
    color,
    onPress
}: {
    id: string;
    name: string;
    price: number;
    progress: number;
    color: "blue" | "yellow" | "red" | "primary";
    onPress: (id: string) => {};
}) {
    const theme = useColorScheme() ?? "light";
    const colors = Colors[theme];
    return (
        <Pressable onPress={() => onPress(id)}>
            <View
                style={{
                    backgroundColor: colors.secondary[50],
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 8
                }}
            >
                <View
                    transparent
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}
                >
                    <Text
                        style={{
                            color: colors[color][400],
                            fontFamily: "PoppinsBold",
                            fontSize: 20
                        }}
                    >
                        {name}
                    </Text>
                    <Text
                        style={{
                            color: colors[color][300],
                            fontFamily: "PoppinsBold",
                            fontSize: 20,
                            marginTop: 2
                        }}
                    >
                        ₱{price}
                    </Text>
                </View>
                <View
                    style={{
                        marginTop: 25
                    }}
                >
                    <View
                        style={{
                            position: "absolute",
                            bottom: 8,
                            height: 8,
                            borderRadius: 50,
                            width: "100%",
                            backgroundColor: colors.secondary[300]
                        }}
                    />

                    <View
                        style={{
                            position: "absolute",
                            bottom: 8,
                            height: 8,
                            borderRadius: 50,
                            width: progress ? `${progress}%` : "0%",
                            backgroundColor: colors[color][300]
                        }}
                    />
                </View>
            </View>
        </Pressable>
    );
}
