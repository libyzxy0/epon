import {
  useColorScheme
} from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import {
  Text,
  View
} from "@/components/Themed";

export default function BackupRestore() {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  return (
    <View>
      <Text>ToDo: Backup restore page</Text>
    </View>
  )
}