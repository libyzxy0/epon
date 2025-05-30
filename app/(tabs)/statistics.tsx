import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import AppTitle from "@/components/AppTitle";
import { LineChart, PieChart, BarChart } from "react-native-chart-kit";
import { Dimensions, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const monthChartData = {
    labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    data: [1000, 3000, 2400, 2040, 5000, 8000, 9000, 6000]
};
const dayChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    data: [100, 300, 400, 400, 400, 400, 400, 450]
};

export default function Statistics() {
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
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 95 }}
            >
                <View
                    style={{
                        marginTop: 20,
                        marginHorizontal: 20
                    }}
                >
                    <Text
                        style={{
                            fontFamily: "PoppinsBold",
                            fontSize: 23,
                            marginLeft: 5
                        }}
                    >
                        Statistics
                    </Text>
                    <BezierChart isBezier chartData={monthChartData} />
                    <BarExamChart chartData={dayChartData} />
                    <CutiePieChart />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

function CutiePieChart({ chartData }) {
    const theme = useColorScheme() ?? "light";
    const colors = Colors[theme];

    const mostSavedCoin = [
        {
            name: "₱5",
            amount: 9000,
            color: colors.yellow[500],
            legendFontColor: colors.yellow[500],
            legendFontSize: 15
        },
        {
            name: "₱10",
            amount: 3000,
            color: colors.red[500],
            legendFontColor: colors.red[500],
            legendFontSize: 15
        },
        {
            name: "₱20",
            amount: 4000,
            color: colors.primary[400],
            legendFontColor: colors.primary[400],
            legendFontSize: 15
        },
        {
            name: "₱50",
            amount: 3500,
            color: colors.blue[500],
            legendFontColor: colors.blue[500],
            legendFontSize: 15
        },
        {
            name: "Other",
            amount: 5400,
            color: "#7b11df",
            legendFontColor: "#7b11df",
            legendFontSize: 15
        }
    ];
    return (
        <View
            style={{
                marginTop: 20,
                paddingHorizontal: 16,
                paddingVertical: 15,
                borderRadius: 9,
                backgroundColor: colors.secondary[50]
            }}
        >
            <Text
                style={{
                    fontFamily: "PoppinsBold",
                    fontSize: 16,
                    color: colors.primary[400]
                }}
            >
                Most Saved Coin
            </Text>
            <PieChart
                data={mostSavedCoin}
                width={289}
                height={180}
                chartConfig={{
                    color: () => colors.primary[300]
                }}
                accessor={"amount"}
                backgroundColor={colors.secondary[50]}
                center={[0, 5]}
                absolute
            />
        </View>
    );
}

function BezierChart({
    chartData,
    isBezier
}: {
    chartData: { labels: string[]; data: number[] };
}) {
    const theme = useColorScheme() ?? "light";
    const colors = Colors[theme];
    return (
        <View
            style={{
                marginTop: 20,
                paddingHorizontal: 16,
                paddingVertical: 15,
                borderRadius: 9,
                backgroundColor: colors.secondary[50]
            }}
        >
            <Text
                style={{
                    fontFamily: "PoppinsBold",
                    fontSize: 16,
                    color: colors.primary[400]
                }}
            >
                Montly Coins
            </Text>

            <ScrollView horizontal>
                <LineChart
                    data={{
                        labels: chartData.labels,
                        datasets: [
                            {
                                data: chartData.data
                            }
                        ]
                    }}
                    width={
                        (monthChartData.labels.length *
                            Dimensions.get("window").width) /
                        6
                    }
                    height={220}
                    yAxisLabel="₱"
                    yAxisSuffix=""
                    yAxisInterval={1}
                    chartConfig={{
                        propsForBackgroundLines: {
                            stroke: colors.secondary[300]
                        },
                        backgroundColor: colors.secondary[50],
                        backgroundGradientFrom: colors.secondary[50],
                        backgroundGradientTo: colors.secondary[100],
                        decimalPlaces: 2,
                        color: (opacity = 1) =>
                            colors.text,
                        labelColor: (opacity = 1) =>
                            colors.secondary[800],
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: colors.primary[400]
                        }
                    }}
                    bezier={isBezier}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                        marginTop: 10
                    }}
                />
            </ScrollView>
        </View>
    );
}

function BarExamChart({
    chartData,
    isBezier
}: {
    chartData: { labels: string[]; data: number[] };
}) {
    const theme = useColorScheme() ?? "light";
    const colors = Colors[theme];
    return (
        <View
            style={{
                marginTop: 20,
                paddingHorizontal: 16,
                paddingVertical: 15,
                borderRadius: 9,
                backgroundColor: colors.secondary[50]
            }}
        >
            <Text
                style={{
                    fontFamily: "PoppinsBold",
                    fontSize: 16,
                    color: colors.primary[400]
                }}
            >
                Daily Coins
            </Text>

            <ScrollView horizontal>
                <BarChart
                    data={{
                        labels: chartData.labels,
                        datasets: [
                            {
                                data: chartData.data
                            }
                        ]
                    }}
                    width={
                        (monthChartData.labels.length *
                            Dimensions.get("window").width) /
                        6
                    }
                    height={220}
                    yAxisLabel="₱"
                    yAxisSuffix=""
                    yAxisInterval={1}
                    chartConfig={{
                        propsForBackgroundLines: {
                            stroke: colors.secondary[300]
                        },
                        backgroundColor: colors.secondary[50],
                        backgroundGradientFrom: colors.secondary[50],
                        backgroundGradientTo: colors.secondary[100],
                        decimalPlaces: 2,
                        color: (opacity = 1) => colors.primary[300],
                        labelColor: (opacity = 1) =>
                            colors.secondary[800],
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: colors.primary[400]
                        }
                    }}
                    bezier={isBezier}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                        marginTop: 10
                    }}
                />
            </ScrollView>
        </View>
    );
}
