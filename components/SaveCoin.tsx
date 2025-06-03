import {
  useColorScheme
} from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import {
  Text,
  View
} from "@/components/Themed";
import {
  TouchableOpacity,
  Alert
} from "react-native";
import {
  useCoinActions
} from "@/hooks/useCoinsActions";
import {
  SaveMoneyModal
} from "@/components/SaveMoneyModal";
import {
  useState
} from 'react'
import {
  useCoinStore
} from '@/store/useCoinStore'
import Toast from 'react-native-toast-message'

type CoinButtonType = {
  short_currency: string;
  amount: number;
  onPress: () => void;
  color: "yellow" | "red" | "blue" | "primary";
};

export function SaveCoin() {
  const colors = Colors[(useColorScheme() ?? "light")];
  const {
    saveCoin
  } = useCoinActions();
  const {
    currency
  } = useCoinStore();
  const [coinModal,
    setCoinModal] = useState( {
      visisble: false,
      amount: 0,
      isCustom: false
    });

  const handleSaveMoney = data => {
    setCoinModal({
      visisble: true,
      amount: data.amount,
      isCustom: data.type !== 'quick_button'
    });
  };

  const handleModalConfirm = async (inputAmount: number | null) => {
    if (coinModal.isCustom && inputAmount) {
      saveCoin(inputAmount)
      Toast.show({
        type: 'success',
        text1: 'Woah Nice!',
        text2: `You just saved ${inputAmount} ${currency}, keep it up!`
      })
    } else {
      saveCoin(coinModal.amount)
      Toast.show({
        type: 'success',
        text1: 'Woah Nice!',
        text2: `You just saved ${coinModal.amount} ${currency}, keep it up!`
      })
    }
    setCoinModal({
      visisble: false,
      amount: 0,
      isCustom: false
    })
  }
  const handleModalCancel = () => {
    setCoinModal({
      visisble: false,
      amount: 0,
      isCustom: false
    })
  }

  return (
    <>
      <View
        style={ {
          marginTop: 20,
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderRadius: 9,
          backgroundColor: colors.card
        }}
        >
        <View
          transparent
          style={ {
            flexDirection: "row",
            justifyContent: "space-between"
          }}
          >
          <View transparent>
            <Text
              style={ {
                fontFamily: "PoppinsBold",
                fontSize: 16,
                color: colors.text,
                marginBottom: 10
              }}
              >
              Save a Coin
            </Text>
          </View>
          <View transparent>
            <Text
              style={ {
                fontFamily: "PoppinsItalic",
                fontSize: 12,
                color: colors.textSecondary,
                marginTop: 4
              }}
              >
              for 05/26/2026
            </Text>
          </View>
        </View>

        <View
          transparent
          style={ {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            paddingBottom: 5
          }}
          >
          <CoinButton
            amount={5}
            short_currency={"₱"}
            color={"yellow"}
            onPress={() =>
            handleSaveMoney( { type: "quick_button", amount: 5 })
            }
            />

          <CoinButton
            amount={10}
            short_currency={"₱"}
            color={"red"}
            onPress={() =>
            handleSaveMoney( {
              type: "quick_button",
              amount: 10
            })
            }
            />
          <CoinButton
            amount={20}
            short_currency={"₱"}
            color={"primary"}
            onPress={() =>
            handleSaveMoney( {
              type: "quick_button",
              amount: 20
            })
            }
            />
          <CoinButton
            amount={50}
            short_currency={"₱"}
            color={"blue"}
            onPress={() =>
            handleSaveMoney( {
              type: "quick_button",
              amount: 50
            })
            }
            />

          <TouchableOpacity activeOpacity={0.7}
            onPress={() =>
            handleSaveMoney( { type: "custom", amount: null })
            }
            style={ {
              borderWidth: 2,
              borderColor: colors.blue['secondary'],
              backgroundColor: colors.blue['lowOpacity'],
              flex: 1,
              borderRadius: 9,
              paddingHorizontal: 16,
              paddingVertical: 8,
              margin: 5,
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center"
            }}
            >
            <Text
              style={ {
                fontSize: 12,
                color: colors.blue['default'],
                paddingRight: 2,
                paddingTop: 1.5
              }}
              >
              Custom Amount
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <SaveMoneyModal
        visible={coinModal.visisble}
        amount={coinModal.amount}
        isCustom={coinModal.isCustom}
        onCancel={handleModalCancel}
        onConfirm={handleModalConfirm}
        />
    </>
  );
}

function CoinButton({
  short_currency,
  amount,
  onPress,
  color
}: CoinButtonType) {
  const colors = Colors[(useColorScheme() ?? "light")];
  return (
    <TouchableOpacity activeOpacity={0.7}
      onPress={onPress}
      style={ {
        borderWidth: 2,
        borderColor: colors[color]['secondary'],
        backgroundColor: colors[color]['lowOpacity'],
        borderRadius: 9,
        paddingHorizontal: 16,
        paddingVertical: 4,
        margin: 5,
        justifyContent: "center",
        alignItems: "center"
      }}
      >
      <Text
        style={ {
          fontSize: 12,
          color: colors[color]['default'],
          paddingRight: 2,
          paddingTop: 1.5
        }}
        >
        {short_currency} {amount}
      </Text>
    </TouchableOpacity>
  );
}