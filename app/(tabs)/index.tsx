import { Text, View } from "@/components/Themed";
import AppTitle from "@/components/AppTitle";
import { CalendarTracker } from '@/components/CalendarTracker'
import { SaveCoin } from "@/components/SaveCoin";
import { CoinStatus } from "@/components/CoinStatus";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabOneScreen() {
    return (
        <SafeAreaView
            style={{
                flex: 1
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
