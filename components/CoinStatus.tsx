import {
  Text,
  View
} from '@/components/Themed';
import {
  useColorScheme
} from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import { TouchableOpacity } from 'react-native'
import { useCoinStore } from '@/store/useCoinStore'
export function CoinStatus({ onUsePress }: { onUsePress: () => {};}) {
  const colors = Colors[(useColorScheme() ?? "light")];
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
                    Savings
                </Text>
                <Text
                numberOfLines={1}
                ellipesizeMode="tail"
                    style={{
                        fontFamily: "PoppinsBold",
                        fontSize: 20,
                        color: colors.primary['default'],
                        paddingRight: 80
                    }}
                >
                    {coins !== null ? `${currency} ${coins.toLocaleString('en-US')}` : "Loading..."}
                </Text>
            </View>

            <View transparent style={{
              position: 'absolute',
              right: 15
            }}>
                <TouchableOpacity activeOpacity={0.7}
                    onPress={onUsePress}
                    style={{
                        backgroundColor: colors.primary['default'],
                        paddingHorizontal: 12,
                        paddingVertical: 4,
                        borderRadius: 50,
                        
                    }}
                >
                    <Text
                        style={{
                            fontSize: 12,
                            paddingTop: 1.5,
                            color: colors.text
                        }}
                    >
                        Use Coin
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
