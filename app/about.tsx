import {
  Text,
  View
} from "@/components/Themed";
import {
  useColorScheme
} from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import {
  Image
} from 'expo-image';
import {
  ScrollView
} from 'react-native'
import {
  TouchableOpacity,
  Linking
} from 'react-native';
import logo from "@/assets/images/logo.png";
import * as Application from 'expo-application';
import Feather from '@expo/vector-icons/Feather';

export default function About() {
  const theme = useColorScheme() ?? "light";
  const colors = Colors[theme];

  const socialLinks = [
    {
      name: 'GitHub',
      icon: 'github',
      url: 'https://github.com/libyzxy0',
      color: colors.text
    },
    {
      name: 'Twitter',
      icon: 'twitter',
      url: 'https://twitter.com/libyzxy0',
      color: colors.blue.default
    },
    {
      name: 'Facebook',
      icon: 'facebook',
      url: 'https://facebook.com/libyzxy0',
      color: colors.blue.default
    },
    {
      name: 'Website',
      icon: 'globe',
      url: 'https://janlibydelacosta.vercel.app',
      color: colors.primary.default
    }
  ];

  const handleSocialPress = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20
        }}>
          <Image 
            style={{
              height: 130,
              width: 130,
              borderRadius: 20
            }} 
            contentFit="contain" 
            source={logo} 
          />
          <Text style={{
            color: colors.text,
            fontSize: 16,
            fontFamily: 'PoppinsBold',
            marginTop: 5
          }}>
            {Application.applicationName}
          </Text>
          <Text style={{
            color: colors.textSecondary,
            fontSize: 14,
            marginTop: 5
          }}>
            Version {Application.nativeApplicationVersion}
          </Text>
        </View>

        <View style={{
          height: 1,
          marginHorizontal: 30,
          marginTop: 30,
          backgroundColor: theme === "dark" ? colors.card : colors.border
        }} />

        <View style={{
          marginHorizontal: 30,
          marginTop: 30
        }}>
          <Text style={{
            color: colors.text,
            fontSize: 16,
            fontFamily: 'PoppinsBold',
            marginBottom: 15
          }}>
            What is Epon?
          </Text>
          <Text style={{
            color: colors.text,
            fontSize: 14,
            lineHeight: 24,
            marginBottom: 20
          }}>
            Epon is a personal finance app designed to make saving for your wishes easier. It features detailed statistics to analyze your savings patterns, calendar tracking to monitor your daily progress, and percentage trackers that show exactly how close you are to achieving each item on your wishlist.
          </Text>

          <Text style={{
            color: colors.text,
            fontSize: 16,
            fontFamily: 'PoppinsBold',
            marginBottom: 15
          }}>
            Key Features
          </Text>
          <View style={{ marginBottom: 20 }}>
            {[
              'Track savings progress with detailed statistics',
              'Calendar view to monitor daily saving habits',
              'Wishlist percentage tracker for each goal',
              'Visual insights into your financial journey'
            ].map((feature, index) => (
              <View key={index} style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 8
              }}>
                <Feather 
                  name="check-circle" 
                  size={16} 
                  color={colors.primary.default} 
                  style={{ marginRight: 10 }}
                />
                <Text style={{
                  color: colors.text,
                  fontSize: 15,
                  flex: 1
                }}>
                  {feature}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{
          marginHorizontal: 30,
          marginTop: 20
        }}>
          <Text style={{
            color: colors.text,
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 15
          }}>
            Developer
          </Text>
          <Text style={{
            color: colors.textSecondary,
            fontSize: 16,
            marginBottom: 20
          }}>
            Developed with ❤️ by{' '}
            <Text style={{
              color: colors.primary.default,
              fontWeight: '600'
            }}>
              @libyzxy0
            </Text>
          </Text>

          <Text style={{
            color: colors.text,
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 15
          }}>
            Connect with the developer
          </Text>
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 15
          }}>
            {socialLinks.map((social, index) => (
              <TouchableOpacity
              activeOpacity={0.7}
                key={index}
                onPress={() => handleSocialPress(social.url)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: colors.card,
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  borderRadius: 25,
                  borderWidth: 1,
                  borderColor: colors.border
                }}
              >
                <Feather
                  name={social.icon as any}
                  size={18}
                  color={social.color}
                  style={{ marginRight: 8 }}
                />
                <Text style={{
                  color: colors.text,
                  fontSize: 14,
                  fontWeight: '500'
                }}>
                  {social.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{
          marginHorizontal: 30,
          marginTop: 40,
          paddingTop: 20,
          paddingBottom: 40,
          borderTopWidth: 1,
          borderTopColor: theme === "dark" ? colors.card : colors.border,
          alignItems: 'center'
        }}>
          <Text style={{
            color: colors.textSecondary,
            fontSize: 12,
            textAlign: 'center'
          }}>
            Thank you for using Epon!{'\n'}
            Your financial goals are within reach.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}