import {
  Text,
  View
} from "@/components/Themed";
import {
  TouchableOpacity,
  Switch,
  Appearance
} from "react-native";
import {
  useColorScheme
} from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import {
  useRouter
} from "expo-router";
import {
  Feather
} from "@expo/vector-icons";
import {
  SafeAreaView
} from "react-native-safe-area-context";
import {
  useState
} from "react";
import Storage from "expo-sqlite/kv-store";
import {
  DeleteConfirmationModal
} from '@/components/DeleteConfirmationModal';
import {
  useSQLiteContext,
} from "expo-sqlite";
import {
  now
} from '@/utils/getDeviceTime'
import { useCoinActions } from "@/hooks/useCoinsActions";
import {
  useWishlistActions
} from "@/hooks/useWishlistActions";

export default function Settings() {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  const router = useRouter();
  const db = useSQLiteContext();
  const [isDarkMode,
    setIsDarkMode] = useState(
    theme === "dark" ? true: false
  );
  const {
    fetchWishlist,
  } = useWishlistActions();
  const {
    fetchCoins,
  } = useCoinActions();
  
  const toggleSwitch = () => {
    setIsDarkMode(previousState => !previousState);
    Storage.setItemSync("apptheme", theme === "dark" ? "light": "dark");
    Appearance.setColorScheme(theme === "dark" ? "light": "dark");
  };

  const [deletionModalOpen,
    setDeletionModalOpen] = useState(false)

  const onConfirmDeletion = async () => {
    await db.execAsync("DELETE FROM coins; DELETE FROM wishlist; DELETE FROM transactions;");
    await db.runAsync(
      `INSERT INTO coins (amount, currency, short_currency, started_at, last_update) VALUES (?, ?, ?, ?, ?)`,
      0,
      "PHP",
      "₱",
      now(),
      now()
    );
    await fetchCoins();
    await fetchWishlist();
    setDeletionModalOpen(false);
  }

  return (
    <SafeAreaView
      style={ {
        flex: 1,
        backgroundColor: colors.background
      }}
      >

      <DeleteConfirmationModal onConfirm={onConfirmDeletion} onCancel={() => setDeletionModalOpen(false)} title={"Erase All Data"} description={`Are you sure to delete your all of your data? This will wipe everything including wishlists, coins and transactions, and cannot be recovered.`} visible={deletionModalOpen} />
      <View
        style={ {
          margin: 15,
          flex: 1
        }}
        >
        <View
          style={ {
            paddingVertical: 8,
            gap: 15,
            borderRadius: 9,
            flexDirection: "column",
            paddingHorizontal: 15,
            backgroundColor: colors.card
          }}
          >
          <TouchableOpacity activeOpacity={0.6}
            onPress={() => router.push("/about")}
            style={ {
              borderBottomWidth: 1,
              borderColor: colors.cardSecondary,
              paddingVertical: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
            >
            <Text>About</Text>
            <View transparent>
              <Feather
                name="chevron-right"
                size={20}
                color={colors.textTertiary}
                />
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6}
            transparent
            style={ {
              borderBottomWidth: 1,
              borderColor: colors.cardSecondary,
              paddingBottom: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
            >
            <Text>Currency</Text>
            <View transparent>
              <Feather
                name="chevron-down"
                size={20}
                color={colors.textTertiary}
                />
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.6}
            transparent
            style={ {
              borderBottomWidth: 1,
              borderColor: colors.cardSecondary,
              paddingBottom: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
            >
            <Text>Help & Support</Text>
            <View transparent>
              <Feather
                name="heart"
                size={20}
                color={colors.textTertiary}
                />
            </View>
          </TouchableOpacity>

          <View
            transparent
            style={ {
              paddingBottom: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
            >
            <Text>Dark Mode</Text>
            <View transparent>
              <Switch
                trackColor={ {
                  false: "#767577",
                  true: colors.primary["default"]
                }}
                thumbColor={
                isDarkMode
                ? colors.primary["default"]: "#f4f3f4"
                }
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isDarkMode}
                />
            </View>
          </View>
        </View>

        <Text
          style={ {
            marginTop: 60,
            color: colors.red["default"],
            marginLeft: 5,
            fontFamily: "PoppinsBold",
            fontSize: 12
          }}
          >
          Danger Zone
        </Text>

        <View
          style={ {
            paddingVertical: 8,
            marginTop: 10,
            gap: 15,
            borderRadius: 9,
            flexDirection: "column",
            paddingHorizontal: 15,
            backgroundColor: colors.card
          }}
          >
          <TouchableOpacity
            onPress={() => router.push('/debuggingpage')}
            activeOpacity={0.6}
            transparent
            style={ {
              borderBottomWidth: 1,
              borderColor: colors.cardSecondary,
              paddingVertical: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
            >
            <Text style={ {
              color: colors.red.default
            }}>Don't Open</Text>
            <View transparent>
              <Feather
                name="code"
                size={20}
                color={colors.red.default}
                />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setDeletionModalOpen(true)}
            activeOpacity={0.8}
            transparent
            style={ {
              paddingBottom: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}
            >
            <Text style={ { color: colors.red["default"] }}>
              Erase All Data
            </Text>
            <View transparent>
              <Feather
                name="trash"
                size={20}
                color={colors.red["default"]}
                />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}