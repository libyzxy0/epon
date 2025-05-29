import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, Suspense } from "react";
import { CustomLoading } from "@/components/CustomLoading";
import "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import * as SystemUI from "expo-system-ui";
import {
    SQLiteProvider,
    useSQLiteContext,
    type SQLiteDatabase
} from "expo-sqlite";
import { migrations } from "@/database/migrations";
import * as SQLite from "expo-sqlite";
import { DATABASE_NAME } from "@/database/config";
import { useCoinActions } from "@/hooks/useCoinsActions";
import { useSQLiteDevTools } from "expo-sqlite-devtools";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary
} from "expo-router";

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: "(tabs)"
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
        PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
        PoppinsItalic: require("../assets/fonts/Poppins-Italic.ttf"),
        ...FontAwesome.font
    });

    const colors = Colors[useColorScheme() ?? "light"];

    /* Fix for white screen flash when navigating, dark mode */
    SystemUI.setBackgroundColorAsync(colors.background);

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return (
            <CustomLoading
                text="Loading fonts..."
            />
        );
    }

    const migrateDB = async (db: SQLiteDatabase) => {
        if (db) {
            const {
                create_coin_table,
                create_transactions_table,
                create_wishlist_table
            } = migrations;
            await db.execAsync(create_coin_table);
            await db.execAsync(create_transactions_table);
            await db.execAsync(create_wishlist_table);

            const coin = await db.getFirstAsync("SELECT * FROM coins;");
            if (coin === null) {
                await db.runAsync(
                    `INSERT INTO coins (amount, currency, short_currency, last_update) VALUES (?, ?, ?, ?)`,
                    0,
                    "PHP",
                    "₱",
                    new Date().toISOString()
                );
                console.log("Coin initialized!");
            } else {
               // console.log(JSON.stringify(coin, null, 2) + "\n");
            }
        }
    };

    return (
        <Suspense
            fallback={
                <CustomLoading
                    text="Loading data..."
                />
            }
        >
            <SQLiteProvider
                databaseName={DATABASE_NAME}
                onInit={migrateDB}
                useSuspense
            >
                <RootLayoutNav />
            </SQLiteProvider>
        </Suspense>
    );
}

function RootLayoutNav() {
    const colorScheme = useColorScheme();
    const { fetchCoins } = useCoinActions();
    
    const db = useSQLiteContext();
    
    useSQLiteDevTools(db);

    useEffect(() => {
        fetchCoins();
    }, []);
    return (
        <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                    name="settings"
                    options={{
                        headerShown: true,
                        title: "Settings",
                        animation: "fade"
                    }}
                />
            </Stack>
        </ThemeProvider>
    );
}
