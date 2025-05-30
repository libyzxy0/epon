import { View, Text } from "@/components/Themed";
import { useColorScheme } from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import { Image } from "expo-image";
import logo from "@/assets/images/logo.png";

export default function AppTitle() {
    const theme = useColorScheme() ?? "light";
    const colors = Colors[theme];
    const router = useRouter();
    return (
        <View
            style={{
                zIndex: 10,
                backgroundColor: colors.background,
                paddingHorizontal: 25,
                paddingTop: 20,
                paddingBottom: 10,
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >
            <View>
                <Image
                    style={{
                        height: 50,
                        width: 50
                    }}
                    source={logo}
                    contentFit="cover"
                />
            </View>
            <View>
                <Pressable onPress={() => router.push("/settings")}>
                    <Feather name="settings" size={20} color={colors.text} />
                </Pressable>
            </View>
        </View>
    );
}
