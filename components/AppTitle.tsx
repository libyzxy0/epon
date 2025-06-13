import { View, Text } from "@/components/Themed";
import { useColorScheme } from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import logo from "@/assets/images/logo.png";

export default function AppTitle() {
    const colors = Colors[(useColorScheme() ?? "light")];
    const router = useRouter();
    return (
        <View
            style={{
                zIndex: 10,
                backgroundColor: colors.backgroundColor,
                paddingHorizontal: 25,
                paddingTop: 10,
                paddingBottom: 10,
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >
            <TouchableOpacity activeOpacity={0.7}>
                <Image
                   
                    style={{
                        height: 50,
                        width: 50
                    }}
                    source={logo}
                    contentFit="contain"
                />
            </TouchableOpacity>
            <View>
                <TouchableOpacity activeOpacity={0.6} onPress={() => router.push("/settings")}>
                    <Feather name="settings" size={20} color={colors.text} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
