import {
  Text,
  View
} from '@/components/Themed';
import {
  useColorScheme
} from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import { Pressable, Alert } from 'react-native'
import { useCoinStore } from '@/store/useCoinStore'
import { useSQLiteContext } from "expo-sqlite";
export function CoinStatus() {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  const { coins, currency } = useCoinStore();
    return (
        <View
            style={{
                backgroundColor: colors.secondary[50],
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
                        color: colors.secondary[600],
                        marginTop: 2
                    }}
                >
                    Saved Money
                </Text>
                <Text
                    style={{
                        fontFamily: "PoppinsBold",
                        fontSize: 20,
                        color: colors.primary[400]
                    }}
                >
                    {coins !== null ? `${currency} ${coins.toLocaleString('en-US')}` : "Loading..."}
                </Text>
            </View>

            <View transparent>
                <Pressable
                    onPress={() =>
                        Alert.alert("Debug", "Use Money button clicked!")
                    }
                    style={{
                        backgroundColor: colors.primary[300],
                        paddingHorizontal: 9,
                        paddingVertical: 4,
                        borderRadius: 50
                    }}
                >
                    <Text
                        style={{
                            fontSize: 12,
                            paddingTop: 1.5
                        }}
                    >
                        Use Money
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
