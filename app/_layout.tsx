import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from '@react-navigation/native';
import {
  useFonts
} from 'expo-font';
import {
  Stack
} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {
  useEffect
} from 'react';
import 'react-native-reanimated';

import {
  useColorScheme
} from '@/hooks/useColorScheme';
import Colors from "@/constants/Colors";
import * as SystemUI from "expo-system-ui";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded,
    error] = useFonts( {
      SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
      Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
      PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
      PoppinsItalic: require("../assets/fonts/Poppins-Italic.ttf"),
      ...FontAwesome.font,
    });

  const colors = Colors[useColorScheme() ?? "light"];

  /* Fix for white screen flash when navigating, dark mode */
  SystemUI.setBackgroundColorAsync(colors.background);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
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

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

  function RootLayoutNav() {
    const colorScheme = useColorScheme();

    return (
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme: DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={ { headerShown: false }} />
          <Stack.Screen name="settings" options={ { headerShown: true, title: "Settings",
            animation: 'fade' }} />
        </Stack>
      </ThemeProvider>
    );
  }