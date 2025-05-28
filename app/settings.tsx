import {
  Text,
  View
} from '@/components/Themed';
import {
  Pressable
} from 'react-native'
import {
  useColorScheme
} from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import {
  useRouter
} from "expo-router";
import {
  Feather
} from "@expo/vector-icons";

export default function Settings() {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];
  const router = useRouter();
  return (
    <View style={ {
      paddingTop: 20,
      margin: 15,
      flex: 1,
    }}>
      <View style={ {
        paddingVertical: 8,
        gap: 15,
        borderRadius: 9,
        flexDirection: 'column',
        paddingHorizontal: 15,
        backgroundColor: colors.secondary[50],
      }}>

        <Pressable onPress={() => router.push('/about')} style={ {
          borderBottomWidth: 2,
          borderColor: colors.secondary[100],
          paddingVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Text>About</Text>
          <View transparent>
            <Feather name="chevron-right" size={20} color={colors.secondary[300]} />
          </View>
        </Pressable>
        <View transparent style={ {
          borderBottomWidth: 2,
          borderColor: colors.secondary[100],
          paddingBottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Text>Currency</Text>
          <View transparent>
            <Feather name="chevron-down" size={20} color={colors.secondary[300]} />
          </View>
        </View>


        <View transparent style={ {
          borderBottomWidth: 2,
          borderColor: colors.secondary[100],
          paddingBottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Text>Help & Support</Text>
          <View transparent>
            <Feather name="heart" size={20} color={colors.secondary[300]} />
          </View>
        </View>

        <View transparent style={ {
          borderBottomWidth: 2,
          borderColor: colors.secondary[100],
          paddingBottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Text>Notifications</Text>
          <View transparent>
            <Feather name="bell" size={20} color={colors.secondary[300]} />
          </View>
        </View>

        <View transparent style={ {
          paddingBottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Text>Dark Mode</Text>
          <View transparent>
            <Feather name="moon" size={20} color={colors.secondary[300]} />
          </View>
        </View>
      </View>

      <Text style={ {
        marginTop: 60,
        color: colors.red[300],
        marginLeft: 5,
        fontFamily: 'PoppinsBold',
        fontSize: 12
      }}>Danger Zone</Text>

      <View style={ {
        paddingVertical: 8,
        marginTop: 10,
        gap: 15,
        borderRadius: 9,
        flexDirection: 'column',
        paddingHorizontal: 15,
        backgroundColor: colors.secondary[50],
      }}>

        <View transparent style={ {
          paddingVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Text style={ { color: colors.red[400]}}>Erase All Data</Text>
          <View transparent>
            <Feather name="trash" size={20} color={colors.red[300]} />
          </View>
        </View>
      </View>
    </View>
  )
}