import {
  Text,
  View
} from '@/components/Themed';
import {
  useColorScheme
} from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import { TouchableOpacity, Alert } from 'react-native'
import { useCoinStore } from '@/store/useCoinStore'
import { useSQLiteContext } from "expo-sqlite";
export function CoinStatus() {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  const { coins, currency } = useCoinStore();
    return (
        <View
            style={{
                backgroundColor: colors.card,
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: 9,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >
            <View transparent>
                <Text
                    style={{
                        fontSize: 13,
                        color: colors.textSecondary,
                        marginTop: 2
                    }}
                >
                    Saved Money
                </Text>
                <Text
                    style={{
                        fontFamily: "PoppinsBold",
                        fontSize: 20,
                        color: colors.primary['default']
                    }}
                >
                    {coins !== null ? `${currency} ${coins.toLocaleString('en-US')}` : "Loading..."}
                </Text>
            </View>

            <View transparent>
                <TouchableOpacity activeOpacity={0.7}
                    onPress={() =>
                        Alert.alert("Debug", "Use Money button clicked!")
                    }
                    style={{
                        backgroundColor: colors.primary['default'],
                        paddingHorizontal: 12,
                        paddingVertical: 4,
                        borderRadius: 50
                    }}
                >
                    <Text
                        style={{
                            fontSize: 12,
                            paddingTop: 1.5,
                            color: colors.card
                        }}
                    >
                        Use Money
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
