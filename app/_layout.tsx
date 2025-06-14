import "react-native-reanimated";
import Colors from "@/constants/Colors";
import Storage from "expo-sqlite/kv-store";
import * as Application from 'expo-application';
import * as SystemUI from "expo-system-ui";
import {
  useFonts
} from "expo-font";
import {
  Stack
} from "expo-router";
import {
  useEffect,
  Suspense
} from "react";
import {
  Appearance
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  CustomLoading
} from "@/components/CustomLoading";
import {
  useColorScheme
} from "@/hooks/useColorScheme";
import {
  GestureHandlerRootView
} from "react-native-gesture-handler";
import {
  useCoinActions
} from "@/hooks/useCoinsActions";
import {
  migrateDB
} from '@/database/migrateDatabase'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import {
  SQLiteProvider,
  useSQLiteContext
} from "expo-sqlite";
import {
  DATABASE_NAME
} from "@/database/config";
import Toast, {
  BaseToast,
  ErrorToast
} from 'react-native-toast-message'

export {
  ErrorBoundary
} from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)"
};



SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded,
    error] = useFonts( {
      Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
      PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
      PoppinsItalic: require("../assets/fonts/Poppins-Italic.ttf"),
      ...FontAwesome.font
    });

  const colors = Colors[useColorScheme() ?? "light"];

  SystemUI.setBackgroundColorAsync(colors.background);

  useEffect(() => {
    if (error) throw error;
  },
    [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  },
    [loaded]);

  useEffect(() => {
    const setupTheme = () => {
      const apptheme = Storage.getItemSync("apptheme");
      if (apptheme !== null) {
        Appearance.setColorScheme(apptheme);
      }
    };
    setupTheme();
  },
    []);

  if (!loaded) {
    return <CustomLoading text="Loading fonts..." />;
  }

  return (
    <Suspense fallback={<CustomLoading text={`${Application.applicationName} (${Application.nativeApplicationVersion})`} />}>
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
    const colors = Colors[colorScheme ?? "light"];
    const {
      fetchCoins
    } = useCoinActions();

    useEffect(() => {
      fetchCoins();
    }, []);


    const toastConfig = {
      success: (props) => (
        <BaseToast
          {...props}
          style={ { borderLeftColor: colors.primary.default, backgroundColor: colors.card }}
          contentContainerStyle={ { paddingHorizontal: 15 }}
          text1Style={ {
            fontSize: 15,
            fontFamily: 'PoppinsBold',
            color: colors.primary.default
          }}
          text2Style={ {
            fontSize: 13,
            color: colors.text
          }}
          />
      ),
      error: (props) => (
        <BaseToast
          {...props}
          style={ { borderLeftColor: colors.red.default, backgroundColor: colors.card }}
          contentContainerStyle={ { paddingHorizontal: 15 }}
          text1Style={ {
            fontSize: 15,
            fontFamily: 'PoppinsBold',
            color: colors.red.default
          }}
          text2Style={ {
            fontSize: 13,
            color: colors.text
          }}
          />
      ),
      warning: (props) => (
        <BaseToast
          {...props}
          style={ { borderLeftColor: colors.yellow.default, backgroundColor: colors.card }}
          contentContainerStyle={ { paddingHorizontal: 15 }}
          text1Style={ {
            fontSize: 15,
            fontFamily: 'PoppinsBold',
            color: colors.yellow.default
          }}
          text2Style={ {
            fontSize: 13,
            color: colors.text
          }}
          />
      ),
    };

    return (
      <ThemeProvider
        value={colorScheme === "dark" ? DarkTheme: DefaultTheme}
        >
        <GestureHandlerRootView>
          <Stack>
            <Stack.Screen
              name="(tabs)"
              options={ { headerShown: false }}
              />
            <Stack.Screen
              name="settings"
              options={ {
                headerShown: true,
                title: "Settings",
                animation: "fade",
                headerStyle: {
                  backgroundColor: colors.background
                }
              }}
              />
            <Stack.Screen
              name="about"
              options={ {
                headerShown: true,
                title: "About",
                animation: "fade",
                headerStyle: {
                  backgroundColor: colors.background
                }
              }}
              />
            <Stack.Screen
              name="backuprestore"
              options={ {
                headerShown: true,
                title: "Backup & Restore",
                animation: "fade",
                headerStyle: {
                  backgroundColor: colors.background
                }
              }}
              />
            <Stack.Screen
              name="onboarding"
              options={ {
                headerShown: false
              }}
              />
            <Stack.Screen
              name="transactions"
              options={ {
                headerShown: false
              }}
              />
            <Stack.Screen
              name="helpsupport"options={ {
                headerShown: true,
                title: "Help & Support",
                animation: "fade",
                headerStyle: {
                  backgroundColor: colors.background
                }
              }}
              />
          </Stack>
          <Toast
            position='top'
            topOffset={45}
            swipeable
            config={toastConfig}
            />
        </GestureHandlerRootView>
      </ThemeProvider>
    );
  }