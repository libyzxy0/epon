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
     
     
     <View
        transparent
        style={ {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginRight: 5
        }}
        >
        <Text
          style={ {
            fontFamily: "PoppinsBold",
            fontSize: 16,
            color: colors.primary.default,
            paddingTop: 3
          }}
          >
         Monthly Coins

        </Text>

        <View
          transparent
          style={ {
            flexDirection: "row",
            alignItems: "center",
            gap: 12
          }}
          >
          <View
            transparent
            style={ {
              flexDirection: "row",
              alignItems: "center",
              gap: 4
            }}
            >
            <View
              style={ {
                backgroundColor: colors.primary['default'],
                height: 15,
                width: 15,
                borderRadius: 20
              }}
              />
            <Text
              style={ {
                color: colors.primary['default'],
                paddingTop: 2.5
              }}
              >
              Save
            </Text>
          </View>

          <View
            transparent
            style={ {
              flexDirection: "row",
              alignItems: "center",
              gap: 4,
            }}
            >
            <View
              style={ {
                backgroundColor: colors.red.default,
                height: 15,
                width: 15,
                borderRadius: 20
              }}
              />
            <Text
              style={ {
                color: colors.red.default,
                paddingTop: 2.5
              }}
              >
              Use
            </Text>
          </View>
        </View>
      </View>

      <ScrollView horizontal>
        <LineChart
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
              stroke: colors.text
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