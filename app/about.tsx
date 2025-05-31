import {
  Text,
  View
} from "@/components/Themed";
import {
  useColorScheme
} from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import {
  SafeAreaView
} from "react-native-safe-area-context";
import {
  Image
} from 'expo-image'
import logo from "@/assets/images/logo.png";
import * as Application from 'expo-application';

export default function About() {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];

  return (
    <SafeAreaView
      style={ {
        flex: 1,
        backgroundColor: colors.background
      }}
      >

      <View style={{
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Image style={ {
          height: 150,
          width: 150
        }} contentFit="cover" source={logo} />
        <Text>{Application.applicationName} version: {Application.nativeApplicationVersion}</Text>
      </View>

    </SafeAreaView>
  );
}