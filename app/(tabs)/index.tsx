import { Text, View } from "@/components/Themed";
import AppTitle from "@/components/AppTitle";
import { CalendarTracker } from "@/components/CalendarTracker";
import { SaveCoin } from "@/components/SaveCoin";
import { CoinStatus } from "@/components/CoinStatus";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";

export default function TabOneScreen() {
    const theme = useColorScheme() ?? "light";
    const colors = Colors[theme];
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colors.background
            }}
        >
            <AppTitle />
            <View
                style={{
                    marginTop: 20,
                    marginHorizontal: 20
                }}
            >
                <CoinStatus />
                <SaveCoin />
                <CalendarTracker />
            </View>
        </SafeAreaView>
    );
}
