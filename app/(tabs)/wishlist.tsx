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
  WishlistCard
} from "@/components/WishlistCard";
import {
  FlatList
} from "react-native";
import {
  useState,
  useEffect,
  useRef
} from "react";
import {
  FloatingButtonPlus
} from "@/components/FloatingButtonPlus";
import {
  SafeAreaView
} from "react-native-safe-area-context";
import {
  Alert,
  Pressable
} from "react-native";
import {
  useCoinStore
} from "@/store/useCoinStore";
import {
  useWishlistStore
} from "@/store/useWishlistStore";
import {
  useWishlistActions
} from "@/hooks/useWishlistActions";
import {
  MakeWishSheet
} from "@/components/MakeWishSheet";
import {
  TouchableOpacity
} from "react-native";
import {
  Image
} from "expo-image";
import wishSvg from "@/assets/images/Empty-pana.svg";

const handleColor = (progress: number): string => {
  if (progress < 25) {
    return "red";
  } else if (progress > 25 && progress < 50) {
    return "yellow";
  } else if (progress > 50 && progress < 75) {
    return "blue";
  } else {
    return "primary";
  }
};

export default function Wishlist() {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  const coins = useCoinStore(state => state.coins);

  const {
    fetchWishlist
  } = useWishlistActions();
  const {
    wishlist
  } = useWishlistStore();
  useEffect(() => {
    fetchWishlist();
  }, []);

  const [wishes,
    setWishes] = useState([]);

  useEffect(() => {
    const w = wishlist.map(item => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        progress: Math.round(Math.min((coins / item.price) * 100, 100)),
        is_bought: item.is_bought,
        created_at: item.created_at
      };
    });
    setWishes(w);
  }, [coins, wishlist]);

  const bottomSheetRef = useRef < BottomSheet > (null);

  return (
    <SafeAreaView
      style={ {
        flex: 1,
        backgroundColor: colors.background
      }}
      >
      <AppTitle />

      {wishes && wishes.length > 0 ? (
        <View
          style={ {
            marginHorizontal: 20,
            marginBottom: 120
          }}
          >
          <FlatList
            data={wishes}
            ListHeaderComponent={
            <Text
              style={ {
                fontFamily: "PoppinsBold",
                fontSize: 23,
                marginLeft: 5,
                marginTop: 20
              }}
              >
              My Wishes
            </Text>
            }
            renderItem={({
              item
            }) => (
              <WishlistCard
                onPress={id =>
                Alert.alert("Debug", "Preesed:" + id)
                }
                id={item.id}
                name={item.name}
                description={item.description}
                color={handleColor(item.progress)}
                price={item.price}
                progress={item.progress}
                is_bought={item.is_bought}
                created_at={item.created_at}
                />
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={ {
              flexDirection: "column",
              gap: 15,
              paddingBottom: 40
            }}
            numColumns={1}
            />
        </View>
      ): (
        <View style={ {
          flex: 1,
          alignItems: 'center',
          marginTop: 120
        }}>
          <Image style={ {
            height: 250,
            width: 250
          }} source={wishSvg} />
          
          <Text style={{
            marginTop: 5
          }}>You don't have wishes yet.</Text>
          <Text style={{
            color: colors.textSecondary,
            fontFamily: 'PoppinsItalic'
          }}>Click <Text style={{
            color: colors.primary.default,
            fontFamily: 'PoppinsBold'
          }}>+</Text> to create a new wish.</Text>
        </View>
      )}

      <FloatingButtonPlus
        onPress={() => bottomSheetRef.current?.expand()}
        />

      <MakeWishSheet ref={bottomSheetRef} />

    </SafeAreaView>
  );
}