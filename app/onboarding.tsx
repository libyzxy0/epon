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
import image0 from "@/assets/images/Piggy_bank-amico.svg"
import image1 from "@/assets/images/Piggy_bank-pana.svg"
import image2 from "@/assets/images/Savings-pana.svg"
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
  const [currentPage, setPage] = useState(0);
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
      style={{
        flex: 1,
        backgroundColor: colors.background
      }}>
      
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {currentPage === 0 ? (
          <FirstPage />
        ) : currentPage === 1 ? (
          <SecondPage />
        ) : (
          <ThirdPage />
        )}
      </View>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        gap: 8
      }}>
        {[0, 1, 2].map((index) => (
          <View
            key={index}
            style={{
              width: currentPage === index ? 20 : 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: currentPage === index 
                ? colors.primary.default 
                : colors.primary.default + '30'
            }}
          />
        ))}
      </View>

      <View style={{
        width: '100%',
        paddingBottom: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: currentPage !== 2 ? 'space-between' : 'center',
      }}>
        {currentPage !== 2 && (
          <TouchableOpacity 
            onPress={() => router.push('/')} 
            style={{
              marginHorizontal: 40
            }} 
            activeOpacity={0.8}
          >
            <Text style={{
              color: colors.primary.default,
              fontFamily: 'PoppinsBold'
            }}>Skip</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          onPress={changePage} 
          style={{
            marginHorizontal: 25,
            paddingVertical: 12,
            paddingLeft: 24,
            paddingRight: 20,
            borderRadius: 50,
            backgroundColor: colors.primary.default,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8
          }} 
          activeOpacity={0.8}
        >
          <Text style={{
            fontFamily: 'PoppinsBold',
            color: colors.background,
            fontSize: 16
          }}>
            {currentPage === 2 ? "Get Started" : "Next"}
          </Text>
          <Feather name="arrow-right" size={18} color={colors.background} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

function FirstPage() {
  const colors = Colors[(useColorScheme() ?? "light")];
  return (
    <View style={{
      alignItems: 'center',
      marginHorizontal: 30,
      paddingVertical: 20
    }}>
      <Image
        style={{
          width: 280,
          height: 280,
          marginBottom: 40
        }}
        source={image0}
        contentFit="contain"
      />
      <Text style={{
        color: colors.text,
        fontFamily: 'PoppinsBold',
        fontSize: 32,
        textAlign: 'center',
        marginBottom: 16
      }}>
        Welcome to Epon!
      </Text>
      <Text style={{
        color: colors.text + 'AA',
        fontFamily: 'PoppinsRegular',
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 20
      }}>
        Start your journey to financial freedom with smart saving habits and goal tracking.
      </Text>
    </View>
  )
}

function SecondPage() {
  const colors = Colors[(useColorScheme() ?? "light")];
  return (
    <View style={{
      alignItems: 'center',
      marginHorizontal: 30,
      paddingVertical: 20
    }}>
      <Image
        style={{
          width: 280,
          height: 280,
          marginBottom: 40
        }}
        source={image1}
        contentFit="contain"
      />
      <Text style={{
        color: colors.text,
        fontFamily: 'PoppinsBold',
        fontSize: 32,
        textAlign: 'center',
        marginBottom: 16
      }}>
        Track Your Goals
      </Text>
      <Text style={{
        color: colors.text + 'AA',
        fontFamily: 'PoppinsRegular',
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 20
      }}>
        Set personalized savings goals and watch your progress grow with visual tracking and insights.
      </Text>
    </View>
  )
}

function ThirdPage() {
  const colors = Colors[(useColorScheme() ?? "light")];
  return (
    <View style={{
      alignItems: 'center',
      marginHorizontal: 30,
      paddingVertical: 20
    }}>
      <Image
        style={{
          width: 280,
          height: 280,
          marginBottom: 40
        }}
        source={image2}
        contentFit="contain"
      />
      <Text style={{
        color: colors.text,
        fontFamily: 'PoppinsBold',
        fontSize: 32,
        textAlign: 'center',
        marginBottom: 16
      }}>
        Build Wealth
      </Text>
      <Text style={{
        color: colors.text + 'AA',
        fontFamily: 'PoppinsRegular',
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 20
      }}>
        Develop consistent saving habits and make informed financial decisions for a secure future.
      </Text>
    </View>
  )
}