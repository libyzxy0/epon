import {
  Text,
  View
} from "@/components/Themed";
import {
  useColorScheme
} from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import {
  BarChart
} from "react-native-chart-kit";
import {
  Dimensions,
  ScrollView
} from "react-native";

export function DailyCoinChart({
  chartData,
}: {
  chartData: {
    labels: string[]; data: number[]
  };
}) {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];

  return (
    <View
      style={ {
        marginTop: 20,
        paddingHorizontal: 16,
        paddingVertical: 15,
        borderRadius: 9,
        backgroundColor: colors.card
      }}
      >
      <View transparent style={ {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <Text
          style={ {
            fontFamily: "PoppinsBold",
            fontSize: 16,
            color: colors.primary['default']
          }}
          >
          Weekly Coins
        </Text>
        <Text style={{
          color: colors.textSecondary
        }}>{`Week ${Math.floor((new Date() - new Date(new Date().getFullYear(), new Date().getMonth(), 1 + (8 - (new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay() || 7)) % 7)) / (7 * 24 * 60 * 60 * 1000)) + 1}`}</Text>
      </View>

      <ScrollView horizontal>
        <BarChart
          data={ {
            labels: chartData.labels,
            datasets: chartData.data
          }}
          width={
          (chartData.labels.length *
            Dimensions.get("window").width) /
          6
          }
          height={220}
          yAxisLabel="₱"
          yAxisSuffix=""
          yAxisInterval={1}
          chartConfig={ {
            propsForBackgroundLines: {
              stroke: colors.textTertiary
            },
            backgroundColor: colors.card,
            backgroundGradientFrom: colors.card,
            backgroundGradientTo: colors.cardSecondary,
            decimalPlaces: 2,
            color: (opacity = 1) => colors.primary['default'],
            labelColor: (opacity = 1) =>
            colors.text,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: colors.primary['default']
            }
          }}
          style={ {
            marginVertical: 8,
            borderRadius: 16,
            marginTop: 10
          }}
          />
      </ScrollView>
    </View>
  );
}