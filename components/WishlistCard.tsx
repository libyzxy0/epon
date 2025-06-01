import {
  useColorScheme
} from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import {
  Text,
  View
} from "@/components/Themed";
import {
  TouchableOpacity
} from "react-native";
import {
  useCoinStore
} from "@/store/useCoinStore";
import Ionicons from "@expo/vector-icons/Ionicons";

export function WishlistCard({
  id,
  name,
  description,
  price,
  progress,
  color,
  created_at,
  is_bought,
  onLongPress,
  onPress
}: {
  id: string;
  name: string;
  description: string;
  price: number;
  progress: number;
  created_at: string;
  is_bought: boolean;
  color: "blue" | "yellow" | "red" | "primary";
  onLongPress: () => {};
  onPress: () => {};
}) {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  const {
    short_currency
  } = useCoinStore();
  return (
    <TouchableOpacity activeOpacity={0.8} onLongPress={() => onLongPress()}>
      <View
        style={ {
          backgroundColor: colors.card,
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 8,
          opacity: is_bought ? 0.8: 1
        }}
        >
        <View
          transparent
          style={ {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 5
          }}
          >
          <Text
            style={ {
              color: is_bought ? colors.textSecondary: colors[color]['default'],
              fontFamily: "PoppinsBold",
              fontSize: 16
            }}
            >
            {name}
          </Text>

          {!is_bought && progress >= 100 ? (
            <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={ {
              backgroundColor: colors.primary.lowOpacity,
              paddingHorizontal: 10,

              borderWidth: 1,
              borderColor: colors.primary.secondary,
              borderRadius: 6
            }}>
              <Text
                style={ {
                  paddingTop: 1,
                  color: is_bought ? colors.textSecondary: colors.primary['default'],
                  fontFamily: "PoppinsBold",
                  fontSize: 13
                }}
                >
                Buy {short_currency}{price}
              </Text>
            </TouchableOpacity>
          ): (
            <Text
              style={ {
                paddingTop: 1,
                color: is_bought ? colors.textSecondary: colors.primary['default'],
                fontFamily: "PoppinsBold"
              }}
              >
              {is_bought ? "Bought": short_currency + price.toLocaleString("en-US")}
            </Text>
          )}

        </View>
        <Text
          style={ {
            color: colors.textSecondary,
            marginVertical: 7
          }}
          >
          {description}
        </Text>
        <View
          transparent
          style={ {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
          >
          <View transparent style={ {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 5
          }}>
            <Ionicons name="calendar-outline" size={15} color={colors.textSecondary} />
            <Text
              style={ {
                color: colors.textSecondary,
                fontSize: 12,
                paddingTop: 2
              }}
              >
              {new Date(created_at).toLocaleString("default", {
                month: "long",
                year: "numeric"
              })}
            </Text>
          </View>
          <Text
            style={ {
              color: is_bought ? colors.textSecondary: colors[color]['default'],
              marginTop: 2,
              fontSize: 12
            }}
            >
            {progress + "%"}
          </Text>
        </View>

        <View
          style={ {
            marginTop: is_bought ? 10: 25
          }}
          >
          {!is_bought && (
            <>
              <View
                style={ {
                  position: "absolute",
                  bottom: 8,
                  height: 8,
                  borderRadius: 50,
                  width: "100%",
                  backgroundColor: colors.cardSecondary
                }}
                />

              <View
                style={ {
                  position: "absolute",
                  bottom: 8,
                  height: 8,
                  borderRadius: 50,
                  width: progress ? `${progress}%`: "0%",
                  backgroundColor: colors[color]['default']
                }}
                />
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

/* I love you Renelyn */