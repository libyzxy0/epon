import {
  Text,
  View
} from "@/components/Themed";
import {
  useColorScheme
} from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import AppTitle from "@/components/AppTitle";
import {
  MostSavedCoinChart
} from "@/components/MostSavedCoinChart";
import {
  MonthlyCoinChart
} from "@/components/MonthlyCoinChart";
import {
  DailyCoinChart
} from "@/components/DailyCoinChart";
import {
  LineChart,
  BarChart
} from "react-native-chart-kit";
import {
  Dimensions,
  ScrollView
} from "react-native";
import {
  SafeAreaView
} from "react-native-safe-area-context";
import {
  useMemo,
  useState,
  useEffect
} from 'react'
import {
  useSQLiteContext
} from "expo-sqlite";
import {
  useCoinStore
} from '@/store/useCoinStore'
import {
  Image
} from "expo-image";
import noDataSvg from "@/assets/images/No_data-rafiki.svg";

export default function Statistics() {
  const colors = Colors[(useColorScheme() ?? "light")];
  const {
    short_currency,
    coins
  } = useCoinStore();
  const [transactions,
    setTransactions] = useState(null);
  const [loading,
    setLoading] = useState(false);

  const db = useSQLiteContext();

  useEffect(() => {
    const loadTransactions = async () => {
      setLoading(true);
      const transacs = await db.getAllAsync('SELECT * FROM transactions;');
      setTransactions(transacs);
      setLoading(false);
    }
    loadTransactions();
  }, [coins])

  const mostSavedCoin = useMemo(() => {
    if (!transactions || transactions.length === 0) return [];

    const highlightedAmounts = [5,
      10,
      20,
      50];

    const reduced = transactions
    .filter((transaction) => transaction.transaction_type !== "use")
    .reduce((acc, current) => {
      const amountKey = highlightedAmounts.includes(current.amount) ? current.amount: 'Others';
      const existing = acc.find(item => item.amount === amountKey);

      if (existing) {
        existing.used++;
      } else {
        acc.push({
          amount: amountKey, used: 1
        });
      }

      return acc;
    },
      []);

    return reduced.map(r => {
      const colorMap = {
        5: colors.yellow.default,
        10: colors.red.default,
        20: colors.primary.default,
        50: colors.blue.default
      };

      return {
        amount: r.used,
        name: r.amount === 'Others' ? 'Others': `${short_currency}${r.amount}`,
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
    const mondayOffset = currentDay === 0 ? -6: 1 - currentDay;
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() + mondayOffset);
    startOfWeek.setHours(0, 0, 0, 0);
    const currentWeekTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.created_at);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);
      return transactionDate >= startOfWeek && transactionDate <= endOfWeek;
    });
    const totals = Array(7).fill(0);
    currentWeekTransactions
    .filter((transaction) => transaction.transaction_type !== "use")
    .forEach((t) => {
      const transactionDate = new Date(t.created_at);
      const daysDiff = Math.floor((transactionDate - startOfWeek) / (1000 * 60 * 60 * 24));
      if (daysDiff >= 0 && daysDiff < 7) {
        totals[daysDiff] += t.amount;
      }
    });
    return {
      labels: weekLabels,
      data: totals
    };
  }, [transactions]);

  const monthChartData = useMemo(() => {
    const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    if (!transactions || transactions.length === 0) {
      return {
        labels: monthLabels,
        data: Array(12).fill(0)
      };
    }
    const totals = Array(12).fill(0);
    transactions
    .filter((transaction) => transaction.transaction_type !== "use")
    .forEach((t) => {
      const monthIndex = new Date(t.created_at).getMonth();
      totals[monthIndex] += t.amount;
    });
    return {
      labels: monthLabels,
      data: totals
    };
  },
    [transactions]);



  return (
    <SafeAreaView
      style={ {
        flex: 1,
        backgroundColor: colors.background
      }}
      >
      <AppTitle />

      {loading ? (
        <View style={ {
          flex: 1,
          alignItems: 'center',
          marginTop: 120
        }}>
          <Image style={ {
            height: 250,
            width: 250
          }} source={noDataSvg} />

          <Text style={ {
            marginTop: 5
          }}>Loading transactions...</Text>
        </View>): (
        <>
          {!loading && transactions && transactions.length === 0 && (
            <View style={ {
              flex: 1,
              alignItems: 'center',
              marginTop: 120
            }}>
              <Image style={ {
                height: 250,
                width: 250
              }} source={noDataSvg} />

              <Text style={ {
                marginTop: 5
              }}>You don't have any transactions yet.</Text>
            </View>
          )}

          {!loading && transactions && transactions.length > 0 && (
            <ScrollView
              contentContainerStyle={ { flexGrow: 1,
                paddingBottom: 95 }}
              >
              <View
                style={ {
                  marginTop: 20,
                  marginHorizontal: 20
                }}
                >
                <Text
                  style={ {
                    fontFamily: "PoppinsBold",
                    fontSize: 23,
                    marginLeft: 5
                  }}
                  >
                  Statistics
                </Text>
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