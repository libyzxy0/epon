import {
  Text,
  View
} from '@/components/Themed';
import {
  useColorScheme
} from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import {
  TouchableOpacity
} from 'react-native'
import {
  Feather
} from "@expo/vector-icons"

export function FloatingButtonPlus({ onPress }: { onPress: () => {}}) {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  return (
      <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={ {
        height: 50,
        width: 50,
        backgroundColor: colors.card,
        borderColor: colors.primary['default'],
        borderWidth: 2,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 100,
        right: 25,
        zIndex: 30
      }}>
        <Feather name="plus" size={26} color={colors.primary['default']} />
      </TouchableOpacity>
  )
}