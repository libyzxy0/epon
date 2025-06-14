import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import AppTitle from "@/components/AppTitle";
import { MostSavedCoinChart } from "@/components/MostSavedCoinChart";
import { MonthlyCoinChart } from "@/components/MonthlyCoinChart";
import { DailyCoinChart } from "@/components/DailyCoinChart";
import { StatisticsDetails } from "@/components/StatisticsDetails";
import { LineChart, BarChart } from "react-native-chart-kit";
import { Dimensions, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMemo, useState, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { useCoinStore } from "@/store/useCoinStore";
import { Image } from "expo-image";
import noDataSvg from "@/assets/images/No_data-rafiki.svg";

type TransactionType = {
    id: string;
    name: string;
    description: string | null;
    transaction_type: string;
    amount: number;
    created_at: string;
};

export default function Statistics() {
    const colors = Colors[useColorScheme() ?? "light"];
    const { short_currency, coins, started_at } = useCoinStore();
    const [transactions, setTransactions] = useState<TransactionType[] | null>(
        null
    );
    const [loading, setLoading] = useState(false);

    const db = useSQLiteContext();

    useEffect(() => {
        const loadTransactions = async () => {
            setLoading(true);
            const transacs = await db.getAllAsync(
                "SELECT * FROM transactions;"
            );
            setTransactions(transacs);
            setLoading(false);
        };
        loadTransactions();
    }, [coins]);

    const mostSavedCoin = useMemo(() => {
        if (!transactions || transactions.length === 0) return [];

        const highlightedAmounts = [5, 10, 20, 50];

        const reduced = transactions
            .filter(
                (transaction: TransactionType) =>
                    transaction.transaction_type !== "use"
            )
            .reduce((acc, current) => {
                const amountKey = highlightedAmounts.includes(current.amount)
                    ? current.amount
                    : "Others";
                const existing = acc.find(item => item.amount === amountKey);

                if (existing) {
                    existing.used++;
                } else {
                    acc.push({
                        amount: amountKey,
                        used: 1
                    });
                }

                return acc;
            }, []);

        return reduced.map(r => {
            const colorMap = {
                5: colors.yellow.default,
                10: colors.red.default,
                20: colors.primary.default,
                50: colors.blue.default
            };

            return {
                amount: r.used,
                name:
                    r.amount === "Others"
                        ? "Others"
                        : `${short_currency}${r.amount}`,
                color: colorMap[r.amount] || colors.textSecondary,
                legendFontColor: colorMap[r.amount] || colors.textSecondary,
                legendFontSize: 15
            };
        });
    }, [transactions]);

    const dayChartData = useMemo(() => {
        const weekLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        if (!transactions || transactions.length === 0) {
            return {
                labels: weekLabels,
                data: Array(7).fill(0)
            };
        }
        const today = new Date();
        const currentDay = today.getDay();
        const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() + mondayOffset);
        startOfWeek.setHours(0, 0, 0, 0);
        const currentWeekTransactions = transactions.filter(t => {
            const transactionDate = new Date(t.created_at);
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            endOfWeek.setHours(23, 59, 59, 999);
            return (
                transactionDate >= startOfWeek && transactionDate <= endOfWeek
            );
        });

        const totals = Array(7).fill(0);
        currentWeekTransactions
            .filter(transaction => transaction.transaction_type !== "use")
            .forEach(t => {
                const transactionDate = new Date(t.created_at);
                const daysDiff = Math.floor(
                    (transactionDate - startOfWeek) / (1000 * 60 * 60 * 24)
                );
                if (daysDiff >= 0 && daysDiff < 7) {
                    totals[daysDiff] += t.amount;
                }
            });

        return {
            labels: weekLabels,
            data: [
                {
                    data: totals,
                    color: () => colors.primary.default
                }
            ]
        };
    }, [transactions]);

    const monthChartData = useMemo(() => {
        const startMonth = new Date(started_at).getMonth();
        const monthLabels = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ];
        if (!transactions || transactions.length === 0) {
            return {
                labels: monthLabels
                    .slice(startMonth)
                    .concat(monthLabels.slice(0, startMonth)),
                data: [Array(12).fill(0), Array(12).fill(0)]
            };
        }

        const totals = Array(12).fill(0);
        transactions
            .filter(transaction => transaction.transaction_type !== "use")
            .forEach(t => {
                const monthIndex = new Date(t.created_at).getMonth();
                totals[monthIndex] += t.amount;
            });

        const totalsUse = Array(12).fill(0);
        transactions
            .filter(transaction => transaction.transaction_type == "use")
            .forEach(t => {
                const monthIndex = new Date(t.created_at).getMonth();
                totalsUse[monthIndex] += t.amount;
            });

        const rotatedTotals = [
            ...totals.slice(startMonth),
            ...totals.slice(0, startMonth)
        ];
        const rotatedTotalsUse = [
            ...totalsUse.slice(startMonth),
            ...totalsUse.slice(0, startMonth)
        ];

        return {
            labels: monthLabels
                .slice(startMonth)
                .concat(monthLabels.slice(0, startMonth)),
            data: [
                {
                    data: rotatedTotalsUse,
                    color: () => colors.red.default
                },
                {
                    data: rotatedTotals,
                    color: () => colors.primary.default
                }
            ]
        };
    }, [transactions]);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colors.background
            }}
        >
            <AppTitle />

            {loading ? (
                <LoadingTransaction />
            ) : (
                <>
                    {!loading && transactions && transactions.length === 0 && (
                        <EmptyTransactionError />
                    )}

                    {!loading && transactions && transactions.length > 0 && (
                        <ScrollView
                            contentContainerStyle={{
                                flexGrow: 1,
                                paddingBottom: 80
                            }}
                        >
                            <View
                                style={{
                                    marginTop: 10,
                                    marginHorizontal: 20
                                }}
                            >
                                <PageTitleText />
                                <StatisticsDetails
                                    transactions={transactions}
                                />
                                <MostSavedCoinChart chartData={mostSavedCoin} />
                                <DailyCoinChart chartData={dayChartData} />
                                <MonthlyCoinChart chartData={monthChartData} />
                            </View>
                        </ScrollView>
                    )}
                </>
            )}
        </SafeAreaView>
    );
}
function PageTitleText() {
    const colors = Colors[useColorScheme() ?? "light"];
    return (
        <Text
            style={{
                fontFamily: "PoppinsBold",
                fontSize: 22,
                marginLeft: 5
            }}
        >
            Statistics
        </Text>
    );
}
function LoadingTransaction() {
    const colors = Colors[useColorScheme() ?? "light"];
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                marginTop: 260
            }}
        >
            <ActivityIndicator size="large" color={colors.primary.default} />

            <Text
                style={{
                    marginTop: 20,
                    color: colors.textSecondary
                }}
            >
                Loading transactions...
            </Text>
        </View>
    );
}

function EmptyTransactionError() {
    const colors = Colors[useColorScheme() ?? "light"];
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                marginTop: 120
            }}
        >
            <Image
                style={{
                    height: 250,
                    width: 250
                }}
                source={noDataSvg}
            />

            <Text
                style={{
                    marginTop: 5
                }}
            >
                No transactions yet.
            </Text>

            <Text
                style={{
                    fontFamily: "Poppins",
                    fontSize: 14,
                    color: colors.textSecondary,
                    textAlign: "center",
                    paddingHorizontal: 40
                }}
            >
                Your statistics details will appear here once you start saving
                or using coins.
            </Text>
        </View>
    );
}
