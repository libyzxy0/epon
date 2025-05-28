import {
  Text,
  View
} from '@/components/Themed';
import {
  useColorScheme
} from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import {
  Pressable
} from 'react-native'
import {
  Feather
} from "@expo/vector-icons"

export function FloatingButtonPlus({ onPress }: { onPress: () => {}}) {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  return (
      <Pressable onPress={onPress} style={ {
        height: 50,
        width: 50,
        backgroundColor: colors.primary[100],
        borderColor: colors.primary[200],
        borderWidth: 3,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 100,
        right: 10,
        zIndex: 30
      }}>
        <Feather name="plus" size={26} color={colors.text} />
      </Pressable>
  )
}