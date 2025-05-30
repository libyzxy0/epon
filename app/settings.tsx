import { Text, View } from "@/components/Themed";
import { Pressable, Switch, Appearance } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import Storage from 'expo-sqlite/kv-store';

export default function Settings() {
    const theme = useColorScheme() ?? "light";
    const colors = Colors[theme];
    const router = useRouter();
    const [isDarkMode, setIsDarkMode] = useState(theme === "dark" ? true : false);
    const toggleSwitch = () => {
        setIsDarkMode(previousState => !previousState);
        Storage.setItemSync('apptheme', theme === "dark" ? "light" : "dark");
        Appearance.setColorScheme(theme === "dark" ? "light" : "dark");
    };
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colors.background
            }}
        >
            <View
                style={{
                    margin: 15,
                    flex: 1
                }}
            >
                <View
                    style={{
                        paddingVertical: 8,
                        gap: 15,
                        borderRadius: 9,
                        flexDirection: "column",
                        paddingHorizontal: 15,
                        backgroundColor: colors.secondary[50]
                    }}
                >
                    <Pressable
                        onPress={() => router.push("/about")}
                        style={{
                            borderBottomWidth: 2,
                            borderColor: colors.secondary[100],
                            paddingVertical: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <Text>About</Text>
                        <View transparent>
                            <Feather
                                name="chevron-right"
                                size={20}
                                color={colors.secondary[300]}
                            />
                        </View>
                    </Pressable>
                    <View
                        transparent
                        style={{
                            borderBottomWidth: 2,
                            borderColor: colors.secondary[100],
                            paddingBottom: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <Text>Currency</Text>
                        <View transparent>
                            <Feather
                                name="chevron-down"
                                size={20}
                                color={colors.secondary[300]}
                            />
                        </View>
                    </View>

                    <View
                        transparent
                        style={{
                            borderBottomWidth: 2,
                            borderColor: colors.secondary[100],
                            paddingBottom: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <Text>Help & Support</Text>
                        <View transparent>
                            <Feather
                                name="heart"
                                size={20}
                                color={colors.secondary[300]}
                            />
                        </View>
                    </View>

                    <View
                        transparent
                        style={{
                            borderBottomWidth: 2,
                            borderColor: colors.secondary[100],
                            paddingBottom: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <Text>Notifications</Text>
                        <View transparent>
                            <Feather
                                name="bell"
                                size={20}
                                color={colors.secondary[300]}
                            />
                        </View>
                    </View>

                    <View
                        transparent
                        style={{
                            paddingBottom: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <Text>Dark Mode</Text>
                        <View transparent>
                            <Switch
                                trackColor={{
                                    false: "#767577",
                                    true: colors.primary[300]
                                }}
                                thumbColor={
                                    isDarkMode ? colors.primary[400] : "#f4f3f4"
                                }
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isDarkMode}
                            />
                        </View>
                    </View>
                </View>

                <Text
                    style={{
                        marginTop: 60,
                        color: colors.red[300],
                        marginLeft: 5,
                        fontFamily: "PoppinsBold",
                        fontSize: 12
                    }}
                >
                    Danger Zone
                </Text>

                <View
                    style={{
                        paddingVertical: 8,
                        marginTop: 10,
                        gap: 15,
                        borderRadius: 9,
                        flexDirection: "column",
                        paddingHorizontal: 15,
                        backgroundColor: colors.secondary[50]
                    }}
                >
                    <View
                        transparent
                        style={{
                            paddingVertical: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        <Text style={{ color: colors.red[400] }}>
                            Erase All Data
                        </Text>
                        <View transparent>
                            <Feather
                                name="trash"
                                size={20}
                                color={colors.red[300]}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
