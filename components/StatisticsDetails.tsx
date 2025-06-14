import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useCoinStore } from "@/store/useCoinStore";
import { useMemo } from "react";
const screenWidth = Dimensions.get("window").width;

type TransactionType = {
    id: string;
    name: string;
    description: string | null;
    transaction_type: string;
    amount: number;
    created_at: string;
};

export function StatisticsDetails({
    transactions
}: {
    transactions: TransactionType[];
}) {
    const colors = Colors[useColorScheme() ?? "light"];
    const { coins, currency } = useCoinStore();

    const savedCoins = useMemo(() => {
        if (!transactions || transactions.length === 0) {
            return 0;
        }

        const filteredSave = transactions.filter(
            titi => titi.transaction_type === "save"
        );

        const gagongData = filteredSave.reduce(
            (acc, curr) => acc + curr.amount,
            0
        );

        return gagongData;
    }, [transactions]);

    const usedCoins = useMemo(() => {
        if (!transactions || transactions.length === 0) {
            return 0;
        }

        const filteredUse = transactions.filter(
            titi => titi.transaction_type === "use"
        );

        const gagongData = filteredUse.reduce(
            (acc, curr) => acc + curr.amount,
            0
        );

        return gagongData;
    }, [transactions]);

    const savingHabitLevel = useMemo(() => {
        const level = (coins / savedCoins) * 100;
        if (level >= 90) {
            return {
                label: "Awesome 🚀",
                color: colors.primary.default
            };
        } else if (level >= 70 && level < 90) {
            return {
                label: "Good ⭐",
                color: colors.blue.default
            };
        } else if (level >= 50 && level < 70) {
            return {
                label: "Fair 🪙",
                color: colors.yellow.default
            };
        } else {
            return {
                label: "Bad 🤬",
                color: colors.red.default
            };
        }
    }, [transactions]);

    return (
        <View
            style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                paddingTop: 15,
                gap: 5
            }}
        >
            <MiniCardCutie
                label="Current Savings"
                value={`${coins} ${currency}`}
                color={colors.yellow.default}
            />
            <MiniCardCutie
                label="Saving Habit Level"
                value={savingHabitLevel.label}
                color={savingHabitLevel.color}
            />
            <MiniCardCutie
                label="Highest Savings"
                value={`${savedCoins} ${currency}`}
                color={colors.primary.default}
            />
            <MiniCardCutie
                label="Used Coins"
                value={`${usedCoins} ${currency}`}
                color={colors.red.default}
            />
        </View>
    );
}

function MiniCardCutie({
    label,
    value,
    color
}: {
    label: string;
    value: string;
    color: string;
}) {
    const colors = Colors[useColorScheme() ?? "light"];
    return (
        <View
            style={{
                backgroundColor: colors.card,
                marginVertical: 5,
                paddingVertical: 12,
                paddingHorizontal: 14,
                gap: 3, 
                borderRadius: 6,
                width: (screenWidth - 50) / 2
            }}
        >
            <Text
                style={{
                    color: colors.textSecondary,
                    fontSize: 12
                }}
            >
                {label}
            </Text>
            <Text
                numberOfLines={1}
                ellipesizeMode="tail"
                style={{
                    color: color,
                    fontSize: 17,
                    fontFamily: "PoppinsBold"
                }}
            >
                {value}
            </Text>
        </View>
    );
}
