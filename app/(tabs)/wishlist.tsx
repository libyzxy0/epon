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
  FlatList,
  TouchableOpacity,
  Alert,
  Pressable,
  RefreshControl
} from "react-native";
import {
  useState,
  useEffect,
  useRef,
  useCallback
} from "react";
import {
  FloatingButtonPlus
} from "@/components/FloatingButtonPlus";
import {
  SafeAreaView
} from "react-native-safe-area-context";
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
  Image
} from "expo-image";
import wishSvg from "@/assets/images/Empty-pana.svg";
import BottomSheet from "@gorhom/bottom-sheet"
import {
  DeleteConfirmationModal
} from '@/components/DeleteConfirmationModal'
import {
  ConfirmationModal
} from '@/components/ConfirmationModal'
import Toast from 'react-native-toast-message'
type WishlistType = {
  id: string;
  name: string;
  description: string;
  price: number;
  is_bought: boolean;
  created_at: string;
  progress?: number;
};

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
  const colors = Colors[(useColorScheme() ?? "light")];
  const {
    coins,
    currency
  } = useCoinStore();

  const {
    fetchWishlist,
    markAsBought,
    removeWish,
    loading,
    setLoading
  } = useWishlistActions();
  const {
    wishlist
  } = useWishlistStore();
  useEffect(() => {
    fetchWishlist();
  }, []);
  const [refreshing,
    setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setLoading(true);
    fetchWishlist();
    setRefreshing(false);
    setLoading(false);
  }, [fetchWishlist]);

  const [wishes,
    setWishes] = useState < WishlistType > ([]);

  useEffect(() => {
    const w = wishlist.map((item: WishlistType) => {
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

  const bottomSheetRef = useRef < BottomSheet | null > (null);

  const [pwish,
    setPWish] = useState < WishlistType | null > (null);
  const [bwish,
    setBWish] = useState < WishlistType | null > (null);

  const handleWishAction = (data: WishlistType) => {
    setPWish(data);
  }

  const onConfirmDeletion = async () => {
    const {
      success,
      error
    } = await removeWish(pwish.id);
    if (success) {
      setPWish(null);
      Toast.show({
        type: 'success',
        text1: 'Deleted!',
        text2: "Wish deleted successfully!"
      })
    }
  }

  const toggleBought = async ({
    id, progress, price, name
  }) => {
    if (progress >= 100) {
      setBWish({
        id, progress, price, name
      })
    }
  }

  const onConfirmPurchase = async () => {
    const {
      success
    } = await markAsBought(bwish.id, true, bwish.price, bwish.name);
    if (success) {
      setBWish(null);
      Toast.show({
        type: 'success',
        text1: 'Congratulations 🎉',
        text2: `You just bought your wish “${bwish.name}” 🎉`
      })
    }
  }

  return (
    <SafeAreaView
      style={ {
        flex: 1,
        backgroundColor: colors.background
      }}
      >
      <AppTitle />

      <DeleteConfirmationModal onConfirm={onConfirmDeletion} onCancel={() => setPWish(null)} title={"Delete Wish"} description={`Are you sure to delete “${pwish?.name}” in your wishlist?`} visible={pwish !== null} />

      <ConfirmationModal onConfirm={onConfirmPurchase} onCancel={() => setBWish(null)} title={"Buy Wish"} description={`Are you sure to buy “${bwish?.name}”? It will cost you ${bwish?.price} ${currency}`} visible={bwish !== null} />

      {!loading && wishes && wishes.length > 0 ? (
        <View
          style={ {
            marginHorizontal: 20,
            marginBottom: 120
          }}
          >
          <FlatList
            data={wishes}
            refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.primary.default]}
              tintColor={colors.primary.default}
              />
            }
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
                onLongPress={() => handleWishAction(item)}
                onPress={() => toggleBought(item)}
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

          <Text style={ {
            marginTop: 5
          }}>You don't have any wishes yet.</Text>
          <Text style={ {
            color: colors.textSecondary,
            fontFamily: 'PoppinsItalic'
          }}>Tap plus <Text style={ {
              color: colors.primary.default,
              fontFamily: 'PoppinsBold'
            }}>(+)</Text> to create a new wish.</Text>
        </View>
      )}

      <FloatingButtonPlus
        onPress={() => bottomSheetRef.current?.expand()}
        />

      <MakeWishSheet ref={bottomSheetRef} />

    </SafeAreaView>
  );
}