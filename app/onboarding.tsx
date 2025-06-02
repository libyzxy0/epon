import {
  Text,
  View
} from '@/components/Themed'
import {
  useColorScheme
} from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import {
  SafeAreaView
} from "react-native-safe-area-context";
import {
  Image
} from "expo-image";
import eponLogo from "@/assets/images/logo.png"
import {
  TouchableOpacity
} from 'react-native'
import {
  Feather
} from "@expo/vector-icons";
import {
  useState
} from 'react'
import {
  useRouter
} from 'expo-router'

export default function Onboarding() {
  const colors = Colors[(useColorScheme() ?? "light")];
  const [currentPage,
    setPage] = useState(0);
  const router = useRouter();

  const changePage = () => {
    if (currentPage !== 2) {
      setPage(currentPage + 1);
    } else {
      router.push('/');
    }
  }

  return (
    <SafeAreaView
      style={ {
        flex: 1,
        backgroundColor: colors.background
      }}>
      {currentPage === 0 ? (
        <FirstPage />
      ): currentPage === 1 ? (
        <SecondPage />
      ): (
        <ThirdPage />
      )}
      <View style={ {
        width: '100%',
        position: 'absolute',
        bottom: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: currentPage !== 2 ? 'space-between' : 'center',
      }}>
        {currentPage !== 2 && (
          <TouchableOpacity onPress={() => router.push('/')} style={ {
            marginHorizontal: 40
          }} activeOpacity={0.8}>
            <Text style={ {
              color: colors.primary.default,
              fontFamily: 'PoppinsBold'
            }}>Skip</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={changePage} style={ {
          marginHorizontal: 25,
          paddingVertical: 8,
          paddingLeft: 20,
          paddingRight: 16,
          borderRadius: 50,
          alignItems: "center",
          backgroundColor: colors.primary.default,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5
        }} activeOpacity={0.8}>
          <Text style={ {
            fontFamily: 'PoppinsBold'
          }}>{currentPage === 2 ? "Get Started": "Next"}</Text>
          <Feather name="arrow-right" size={17} color={colors.text} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

  function FirstPage() {
    const colors = Colors[(useColorScheme() ?? "light")];
    return (
      <View>
        <Text>First Page</Text>
      </View>
    )
  }

  function SecondPage() {
    const colors = Colors[(useColorScheme() ?? "light")];
    return (
      <View>
        <Text>Second Page</Text>
      </View>
    )
  }

  function ThirdPage() {
    const colors = Colors[(useColorScheme() ?? "light")];
    return (
      <View>
        <Text>Third Page</Text>
      </View>
    )
  }