import {
  Text,
  View
} from "@/components/Themed";
import {
  useColorScheme
} from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import React from "react";
import {
  Calendar
} from "react-native-calendars";
import {
  useSQLiteContext
} from "expo-sqlite";
import {
  useCoinStore
} from '@/store/useCoinStore'
import {
  useMemo,
  useState,
  useEffect
} from 'react'


type CalendarDateType = {
  dateString: string;
  year: string;
  month: string;
  day: string;
  timestamp: string;
};

export function CalendarTracker() {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  const [date,
    setDate] = useState < CalendarDateType | null > (null);

  const {
    short_currency,
    coins,
    started_at
  } = useCoinStore();

  const db = useSQLiteContext();

  const [transactions,
    setTransactions] = useState();
  useEffect(() => {
    const loadTransactions = async () => {
      const transacs = await db.getAllAsync('SELECT * FROM transactions;');
      setTransactions(transacs);
    }
    loadTransactions();
  }, [coins])

  const datesData = useMemo(() => {
  if (!transactions || transactions.length === 0) return {};
  
  const datesD = {};
  const startDate = new Date(started_at);
  const today = new Date();
  
  for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
    const dateKey = new Date(d).toISOString().slice(0, 10);
    datesD[dateKey] = {
      marked: false,
      selected: true,
      selectedColor: colors.textTertiary
    };
  }
  
  const transactionsByDate = {};
  transactions.forEach((transaction) => {
    const dateKey = transaction.created_at.split('T')[0];
    if (!transactionsByDate[dateKey]) {
      transactionsByDate[dateKey] = [];
    }
    transactionsByDate[dateKey].push(transaction);
  });
  
  Object.entries(transactionsByDate).forEach(([dateKey, dayTransactions]) => {
    const hasUseTransaction = dayTransactions.some(t => t.transaction_type === "use");
    
    if (hasUseTransaction) {
      datesD[dateKey] = {
        marked: true,
        selected: true,
        selectedColor: colors.primary['default']
      };
    } else {
      const hasValidSaveTransaction = dayTransactions.some(t => 
        t.transaction_type === "save" && new Date(started_at) < new Date(t.created_at)
      );
      
      datesD[dateKey] = {
        marked: false,
        selected: hasValidSaveTransaction,
        selectedColor: colors.primary['default']
      };
    }
  });
  
  return datesD;
}, [transactions, started_at]);

  return (
    <View
      style={ {
        marginTop: 20,
        paddingVertical: 10,
        borderRadius: 9,
        backgroundColor: colors.card,
        paddingHorizontal: 4
      }}
      >
      <View
        transparent
        style={ {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 15,
          marginTop: 3
        }}
        >
        <Text
          style={ {
            fontFamily: "PoppinsBold",
            fontSize: 16,
            color: colors.text,
            paddingTop: 3
          }}
          >
          {date
          ? new Date(date.timestamp).toLocaleString("default", {
            month: "long",
            year: "numeric"
          }): new Date().toLocaleString("default", {
            month: "long",
            year: "numeric"
          })}

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
              Held ✓
            </Text>
          </View>

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
                backgroundColor: colors.textTertiary,
                height: 15,
                width: 15,
                borderRadius: 20
              }}
              />
            <Text
              style={ {
                color: colors.textTertiary,
                paddingTop: 2.5
              }}
              >
              Void ✗
            </Text>
          </View>
        </View>
      </View>
      
      <View key={theme}>
        <Calendar
          onMonthChange={setDate}
          monthFormat={"MMMM, yyyy"}
          hideArrows={true}
          renderHeader={() => null}
          theme={ {
            monthTextColor: colors.text,
            backgroundColor: colors.card,
            calendarBackground: colors.card,
            textSectionTitleColor: colors.primary['default'],
            selectedDayBackgroundColor: colors.card,
            selectedDayTextColor: colors.text,
            todayTextColor: colors.primary['default'],
            dayTextColor: colors.text,
            textDisabledColor: colors.textTertiary
          }}
          markedDates={datesData}
          />
      </View>
    </View>
  );
}