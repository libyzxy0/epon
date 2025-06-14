import {
  Text,
  View
} from "@/components/Themed";
import {
  useColorScheme
} from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import {
  BottomShit
} from "@/components/BottomShit";
import BottomSheet, {
  BottomSheetTextInput
} from "@gorhom/bottom-sheet";
import React, {
  forwardRef,
  useState
} from "react";
import {
  TouchableOpacity
} from "react-native";
import {
  useCoinActions
} from "@/hooks/useCoinsActions";
import {
  useCoinStore
} from '@/store/useCoinStore'
import Toast from 'react-native-toast-message'

export const UseMoneySheet = forwardRef < BottomSheet, any > ((props, ref) => {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  const [amount, setAmount] = useState(null);
  const [note, setNote] = useState(null);
  const {
    currency,
    coins
  } = useCoinStore();
  const {
    useCoin
  } = useCoinActions();

  const handleUseMoney = async () => {
    
    if(amount === null || amount === "") {
      Toast.show({
        type: 'warning',
        text1: 'Missing amount!',
        text2: `Please enter the amount of coins you want to use!`
      })
      return;
    }
    
    const {
      success, error
    } = await useCoin(amount, note);

    if (success) {
      Toast.show({
        type: 'success',
        text1: 'Nice! but Not! 😐',
        text2: `You've just used ${amount} ${currency} of your coins!`
      })
      ref.current?.close();
      setNote(null);
      setAmount(null);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Failed to use coin!',
        text2: `${error}`
      })
    }
  }
  return (
    <BottomShit containerStyle={ {
      paddingHorizontal: 20
    }} ref={ref} snapPoints={["50%"]}>
      <Text
        style={ {
          fontFamily: "PoppinsBold",
          fontSize: 20,
          marginTop: 10
        }}
        >
        Use Coin 🪙
      </Text>
      <View
        transparent
        style={ {
          marginTop: 20,
          gap: 20
        }}
        >

        <View
          transparent
          style={ {
            gap: 5,
          }}
          >
          <View
          transparent
            style={ {
              paddingLeft: 2,
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between'
            }}
            >
            <Text style={{
              color: colors.textSecondary,
              fontSize: 12,
            }}>Amount</Text>
            {amount && (
              <Text style={{ fontSize: 10, fontFamily: 'PoppinsItalic', color: Math.round(Math.min((amount / coins) * 100)) <= 100 ? colors.yellow.default : colors.red.default }}>{Math.round(Math.min((amount / coins) * 100)) <= 100 ? `Your savings will be reduced by ${Math.round(Math.min((amount / coins) * 100, 100))}%` : 'Insufficient coins.'}</Text>
            )}
          </View>
          <BottomSheetTextInput
            onChangeText={setAmount}
            defaultValue={amount}
            style={ {
              backgroundColor: colors.cardSecondary,
              color: colors.text,
              paddingHorizontal: 15,
              borderRadius: 7,
              borderWidth: 1,
              borderColor: colors.border
            }}
            keyboardType={"number-pad"}
            placeholder="3000"
            placeholderTextColor={colors.textSecondary}
            />
        </View>
        <View
          transparent
          style={ {
            gap: 5
          }}
          >
          <Text
            style={ {
              color: colors.textSecondary,
              fontSize: 12,
              paddingLeft: 2
            }}
            >
            Note
          </Text>
          <BottomSheetTextInput
            onChangeText={setNote}
            defaultValue={note}
            multiline
            numberOfLines={4}
            style={ {
              backgroundColor: colors.cardSecondary,
              color: colors.text,
              paddingHorizontal: 15,
              borderRadius: 7,
              borderWidth: 1,
              borderColor: colors.border
            }}
            placeholder="Buy Load"
            placeholderTextColor={colors.textSecondary}
            />
        </View>
        <TouchableOpacity onPress={() => handleUseMoney()} activeOpacity={0.7}
          style={ {
            backgroundColor: colors.primary['default'],
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
            borderRadius: 8
          }}
          >
          <Text
            style={ {
              fontFamily: "PoppinsBold",
              paddingTop: 2
            }}
            >
            Use Money
          </Text>
        </TouchableOpacity>
      </View>
    </BottomShit>
  );
});