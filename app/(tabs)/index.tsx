import {
  Text,
  View
} from "@/components/Themed";
import AppTitle from "@/components/AppTitle";
import {
  CalendarTracker
} from "@/components/CalendarTracker";
import {
  SaveCoin
} from "@/components/SaveCoin";
import {
  CoinStatus
} from "@/components/CoinStatus";
import {
  RecentTransactions
} from "@/components/RecentTransactions";
import {
  SafeAreaView
} from "react-native-safe-area-context";
import {
  useColorScheme
} from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import {
  BottomShit
} from '@/components/BottomShit'
import BottomSheet from "@gorhom/bottom-sheet";
import {
  useRef
} from 'react'
import {
  TouchableOpacity
} from 'react-native'
import {
  UseMoneySheet
} from '@/components/UseMoneySheet'
import {
  ScrollView
} from 'react-native'

export default function Index() {
  const colors = Colors[(useColorScheme() ?? "light")];
  const moneyBottomSheetRef = useRef < BottomSheet > (null);

  return (
    <SafeAreaView
      style={ {
        flex: 1,
        backgroundColor: colors.background
      }}
      >
      <AppTitle />
      <ScrollView
      showsVerticalScrollIndicator={false} 
        style={ {
          marginTop: 20,
          marginHorizontal: 20,
        }}
        >
        <View transparent style={ {
          marginBottom: 80,
        }}>
          <CoinStatus onUsePress={() => moneyBottomSheetRef.current?.expand()} />
          <SaveCoin />
          <CalendarTracker />
          <RecentTransactions />
        </View>
      </ScrollView>

      <UseMoneySheet ref={moneyBottomSheetRef} />
    </SafeAreaView>
  );
}