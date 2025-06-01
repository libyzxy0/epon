import {
  Text,
  View
} from "@/components/Themed";
import {
  useColorScheme
} from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";

import {
  PieChart
} from "react-native-chart-kit";

export function MostSavedCoinChart({
  chartData
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
        backgroundColor: colors.card,
      }}
      >
      <Text
        style={ {
          fontFamily: "PoppinsBold",
          fontSize: 16,
          color: colors.primary.default,
        }}
        >
        Most Saved Coin
      </Text>
      <PieChart
        data={chartData}
        width={289}
        height={180}
        chartConfig={ {
          color: () => colors.primary['default']
        }}
        accessor={"amount"}
        backgroundColor={colors.card}
        paddingLeft={25}
        center={[0, 5]}
        absolute
        />
    </View>
  );
}