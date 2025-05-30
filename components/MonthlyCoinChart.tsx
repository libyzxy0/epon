import {
  Text,
  View
} from "@/components/Themed";
import {
  useColorScheme
} from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import {
  LineChart
} from "react-native-chart-kit";
import {
  Dimensions,
  ScrollView
} from "react-native";

export function MonthlyCoinChart({
  chartData
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
      <Text
        style={ {
          fontFamily: "PoppinsBold",
          fontSize: 16,
          color: colors.primary['default']
        }}
        >
        Montly Coins
      </Text>

      <ScrollView horizontal>
        <LineChart
          data={ {
            labels: chartData.labels,
            datasets: [{
              data: chartData.data
            }]
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
            color: (opacity = 1) =>
            colors.text,
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
          bezier
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