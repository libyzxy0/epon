import { useColorScheme } from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import { Text, View } from "@/components/Themed";
import { Pressable } from "react-native";
import { useCoinStore } from "@/store/useCoinStore";
import Ionicons from "@expo/vector-icons/Ionicons";

export function WishlistCard({
    id,
    name,
    description,
    price,
    progress,
    color,
    created_at,
    onPress
}: {
    id: string;
    name: string;
    description: string;
    price: number;
    progress: number;
    created_at: string;
    color: "blue" | "yellow" | "red" | "primary";
    onPress: (id: string) => {};
}) {
    const theme = useColorScheme() ?? "light";
    const colors = Colors[theme];
    const { short_currency } = useCoinStore();
    return (
        <Pressable onLongPress={() => onPress(id)}>
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
                        justifyContent: "space-between",
                        paddingTop: 5
                    }}
                >
                    <Text
                        style={{
                            color: colors[color][300],
                            fontFamily: "PoppinsBold",
                            fontSize: 16
                        }}
                    >
                        {name}
                    </Text>

                    <Text
                        style={{
                            paddingTop: 1,
                            color: colors.primary[500],
                            fontFamily: "PoppinsBold"
                        }}
                    >
                        {short_currency}
                        {price.toLocaleString("en-US")}
                    </Text>
                </View>
                <Text
                    style={{
                        color: colors.secondary[500],
                        marginVertical: 7
                    }}
                >
                    {description}
                </Text>
                <View
                    transparent
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}
                >
                    <View transparent style={{
                      flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 5
                    }}>
                        <Ionicons name="calendar-outline" size={15} color={colors.secondary[400]} />
                        <Text
                            style={{
                                color: colors.secondary[400],
                                fontSize: 12,
                                paddingTop: 2
                            }}
                        >
                            {new Date(created_at).toLocaleString("default", {
                              month: "long",
                              year: "numeric"
                          })}
                        </Text>
                    </View>
                    <Text
                        style={{
                            color: colors[color][300],
                            marginTop: 2,
                            fontSize: 12
                        }}
                    >
                        {progress + "%"}
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
