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
            name: "Smartphone (Mid-range)",
            description:
                "A reliable phone with a good camera, battery life, and performance for everyday tasks.",
            price: 18000
        },
        {
            id: "2",
            name: "Laptop for Work/Study",
            description:
                "A lightweight and efficient laptop for coding, online classes, and productivity.",
            price: 40000
        },
        {
            id: "3",
            name: "Noise-Cancelling Headphones",
            description:
                "Ideal for focusing while studying or working in noisy environments.",
            price: 7000
        },
        {
            id: "4",
            name: "Travel Backpack",
            description:
                "A durable and spacious backpack for daily use or weekend trips.",
            price: 2500
        },
        {
            id: "5",
            name: "Digital Drawing Tablet",
            description:
                "For practicing digital art and graphic design projects.",
            price: 6000
        },
        {
            id: "6",
            name: "Bookshelf with Books",
            description:
                "A set of must-read books and a minimalist shelf to organize them.",
            price: 3500
        },
        {
            id: "7",
            name: "Fitness Tracker",
            description:
                "To monitor daily activity, heart rate, and sleep patterns.",
            price: 2500
        },
        {
            id: "8",
            name: "Gaming Console",
            description: "For playing games and relaxing during free time.",
            price: 25000
        },
        {
            id: "9",
            name: "Weekend Beach Trip",
            description:
                "A 2-day getaway with friends or family to relax and unwind.",
            price: 5000
        },
        {
            id: "10",
            name: "Desk Setup Upgrade",
            description:
                "Includes an ergonomic chair, desk lamp, and monitor stand for better productivity.",
            price: 8500
        }
    ];

    const [wishes, setWishes] = useState([]);

    useEffect(() => {
        const w = rawWish.map(item => {
            return {
                id: item.id,
                name: item.name,
                description: item.description,
                price: item.price,
                progress: Math.round(Math.min((coins / item.price) * 100, 100))
            };
        });
        setWishes(w);
    }, [coins]);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colors.background
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
                            description={item.description}
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
