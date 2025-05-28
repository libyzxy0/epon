import {
  View,
  Text
} from '@/components/Themed'
import {
  useColorScheme
} from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable } from 'react-native'

export default function AppTitle() {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  const router = useRouter();
  return (
    <View style={ {
      position: 'absolute',
      top: 0,
      zIndex: 40,
      backgroundColor: colors.background,
      paddingHorizontal: 25,
      paddingTop: 20,
      paddingBottom: 10,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <View>
        <Text style={ {
        color: colors.primary[400],
        fontSize: 23,
        fontFamily: 'PoppinsBold',
      }}>Epon</Text>
      <View style={ {
        height: 4,
        width: 40,
        borderRadius: 50,
        position: 'absolute',
        bottom: 5,
        left: 0,
        backgroundColor: colors.primary[400]
      }}></View>
      </View>
      <View>
        <Pressable onPress={() => router.push("/settings")}>
          <Feather name="settings" size={20}  color={colors.text} />
        </Pressable>
      </View>
    </View>
  )
}