import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import AppTitle from "@/components/AppTitle";
import { WishlistCard } from "@/components/WishlistCard";
import { FlatList } from "react-native";
import { useState, useEffect } from "react";
import { FloatingButtonPlus } from "@/components/FloatingButtonPlus";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert } from "react-native";
import { useCoinStore } from "@/store/useCoinStore";

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

    const rawWish = [
        {
            id: "1",
            name: "Lolipop",
            description: "",
            price: 5
        },
        {
            id: "2",
            name: "Laptop",
            description: "",
            price: 30000
        },
        {
            id: "3",
            name: "Watch",
            description: "",
            price: 3000
        },
        {
            id: "4",
            name: "Bahay at Lupa",
            description: "",
            price: 2500000
        },
        {
            id: "5",
            name: "Short Hair na chinita",
            description: "",
            price: 1
        },
        {
            id: "6",
            name: "Pet",
            description: "",
            price: 5000
        },
        {
            id: "7",
            name: "Car",
            description: "",
            price: 50
        }
    ];

    const [wishes, setWishes] = useState([]);

    useEffect(() => {
        const w = rawWish.map(item => {
            return {
                id: item.id,
                name: item.name,
                price: item.price,
                progress: Math.min((coins / item.price) * 100, 100)
            };
        });
        setWishes(w);
    }, [coins]);

    return (
        <SafeAreaView
            style={{
                flex: 1
            }}
        >
            <AppTitle />

            <View
                style={{
                    marginHorizontal: 20,
                    marginBottom: 120
                }}
            >
                <FlatList
                    data={wishes}
                    ListHeaderComponent={
                        <Text
                            style={{
                                fontFamily: "PoppinsBold",
                                fontSize: 23,
                                marginLeft: 5,
                                marginTop: 20
                            }}
                        >
                            My Wishes
                        </Text>
                    }
                    renderItem={({ item }) => (
                        <WishlistCard
                            onPress={id =>
                                Alert.alert("Debug", "Preesed:" + id)
                            }
                            id={item.id}
                            name={item.name}
                            color={handleColor(item.progress)}
                            price={item.price}
                            progress={item.progress}
                        />
                    )}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        flexDirection: "column",
                        gap: 15,
                        paddingBottom: 40
                    }}
                    numColumns={1}
                />
            </View>
            <FloatingButtonPlus
                onPress={() =>
                    Alert.alert("Debug Plus", "Plus button clicked!")
                }
            />
        </SafeAreaView>
    );
}
