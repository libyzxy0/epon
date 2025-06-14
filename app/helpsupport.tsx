import { useColorScheme } from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import { Text, View } from "@/components/Themed";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    ScrollView,
    TouchableOpacity,
    Linking,
    Alert,
    Dimensions
} from "react-native";
import { useState } from "react";
import { WebView } from "react-native-webview";
import Collapsible from "react-native-collapsible";
import { Feather } from "@expo/vector-icons";

export default function HelpSupport() {
    const theme = useColorScheme() ?? "light";
    const colors = Colors[theme];

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colors.background
            }}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        marginHorizontal: 25,
                        paddingBottom: 30
                    }}
                >
                    <Text
                        style={{
                            fontFamily: "PoppinsBold",
                            fontSize: 23,
                            marginBottom: 10
                        }}
                    >
                        Help & Support
                    </Text>

                    <GettingStarted />
                    <FAQs />
                    <ContactSupport />
                    <Feedback />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

function GettingStarted() {
    const theme = useColorScheme() ?? "light";
    const colors = Colors[theme];
    const screenWidth = Dimensions.get("window").width;
    const videoHeight = (screenWidth - 50) * 0.56;

    const guides = [
        {
            title: "Quick Start Video",
            description: "A minute overview of Epon's essential features.",
            type: "video",
            videoId: "Fbm4ZUgqrzI"
        },
        {
          title: "Create your first Wish",
          description: "To create a new wish, go to the Wishlist page, tap the Create button (+), enter the name, description, and price of your wish, and then tap Create Wish."
        },
        {
          title: "Save your Coins",
          description: "To save a coin, go to the Home page, tap the Save Coin button and enter the amount you want to save. Alternatively you can just click the button with amounts already for easy saving."
        }
    ];

    return (
        <View
            style={{
                marginTop: 25
            }}
        >
            <Text
                style={{
                    fontFamily: "PoppinsBold",
                    fontSize: 18,
                    marginBottom: 15
                }}
            >
                Getting Started
            </Text>

            {guides.map((guide, index) => (
                <View key={index} style={{ marginBottom: 15 }}>
                    {guide.type === "video" ? (
                        <View>
                            <Text
                                style={{
                                    fontFamily: "PoppinsBold",
                                    fontSize: 14,
                                    marginBottom: 8
                                }}
                            >
                                {guide.title}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: colors.textSecondary,
                                    marginBottom: 10
                                }}
                            >
                                {guide.description}
                            </Text>
                            <View
                                style={{
                                    height: videoHeight,
                                    overflow: "hidden",
                                    backgroundColor: colors.card
                                }}
                            >
                                <WebView
                                    source={{
                                        uri: `https://www.youtube.com/embed/${guide.videoId}?rel=0&showinfo=0&controls=1&modestbranding=1`
                                    }}
                                    style={{ flex: 1 }}
                                    allowsFullscreenVideo={true}
                                    mediaPlaybackRequiresUserAction={false}
                                    javaScriptEnabled={true}
                                    domStorageEnabled={true}
                                />
                            </View>
                        </View>
                    ) : (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={{
                                backgroundColor:
                                    colors.card,
                                padding: 15,
                                borderRadius: 12,
                                borderWidth: 1,
                                borderColor:
                                    colors.border,
                                flexDirection: "row",
                                alignItems: "center"
                            }}
                        >
                            <View transparent style={{ flex: 1 }}>
                                <Text
                                    style={{
                                        fontFamily: "PoppinsBold",
                                        fontSize: 14,
                                        marginBottom: 4
                                    }}
                                >
                                    {guide.title}
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: "PoppinsRegular",
                                        fontSize: 14,
                                        color: colors.textSecondary,
                                        lineHeight: 20
                                    }}
                                >
                                    {guide.description}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
            ))}
        </View>
    );
}

function FAQs() {
    const theme = useColorScheme() ?? "light";
    const colors = Colors[theme];
    const [expandedIndex, setExpandedIndex] = useState(null);

    const faqs = [
        {
            question: "How do I reset my progress?",
            answer: "Go to Settings > Danger Zone > Erase All Data, then tap 'Delete'."
        },
        {
            question: "Can I use the app offline?",
            answer: "Yes, you can use Epon fully offline."
        },
        {
            question: "Why isn't the app working properly?",
            answer: "Try restarting the app first. If issues persist, check for updates posted by the developer."
        }
    ];

    return (
        <View
            style={{
                marginTop: 25
            }}
        >
            <Text
                style={{
                    fontFamily: "PoppinsBold",
                    fontSize: 18,
                    marginBottom: 15
                }}
            >
                Frequently Asked Questions (FAQs)
            </Text>

            {faqs.map((faq, index) => (
                <View
                    key={index}
                    style={{
                        backgroundColor: colors.card,
                        borderRadius: 12,
                        marginBottom: 10,
                        borderWidth: 1,
                        borderColor: colors.cardSecondary,
                        overflow: "hidden"
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={{
                            padding: 15
                        }}
                        onPress={() => {
                            setExpandedIndex(
                                expandedIndex === index ? null : index
                            );
                        }}
                    >
                        <View
                            transparent
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    flex: 1,
                                    marginRight: 10
                                }}
                            >
                                {faq.question}
                            </Text>

                            <Feather
                                name={
                                    expandedIndex !== index
                                        ? "chevron-down"
                                        : "chevron-up"
                                }
                                size={16}
                                color={colors.textSecondary}
                            />
                        </View>
                    </TouchableOpacity>

                    <Collapsible collapsed={expandedIndex !== index}>
                        <View
                            transparent
                            style={{ paddingHorizontal: 15, paddingBottom: 15 }}
                        >
                            <Text
                                style={{
                                    fontFamily: "PoppinsRegular",
                                    fontSize: 14,
                                    color: colors.textSecondary,
                                    lineHeight: 20
                                }}
                            >
                                {faq.answer}
                            </Text>
                        </View>
                    </Collapsible>
                </View>
            ))}
        </View>
    );
}

function ContactSupport() {
    const theme = useColorScheme() ?? "light";
    const colors = Colors[theme];

    const contactOptions = [
        {
            title: "Email Support",
            description: "Get help via email within 24 hours",
            icon: "mail",
            action: () => {
                Linking.openURL("mailto: janlibydelacosta@gmail.com");
            }
        },
        {
            title: "Chat in Facebook",
            description: "Chat with developer in messenger.",
            icon: "facebook",
            action: () => {
                Linking.openURL("https://facebook.com/libyzxy0");
            }
        }
    ];

    return (
        <View
            style={{
                marginTop: 25
            }}
        >
            <Text
                style={{
                    fontFamily: "PoppinsBold",
                    fontSize: 18,
                    marginBottom: 15
                }}
            >
                Contact Support
            </Text>

            {contactOptions.map((option, index) => (
                <TouchableOpacity
                    activeOpacity={0.7}
                    key={index}
                    style={{
                        backgroundColor: colors.card,
                        padding: 15,
                        borderRadius: 12,
                        marginBottom: 10,
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                    onPress={option.action}
                >
                    <View
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 50,
                            backgroundColor: colors.cardSecondary,
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: 15
                        }}
                    >
                        <Feather
                            name={option.icon}
                            size={22}
                            color={colors.text}
                        />
                    </View>
                    <View transparent style={{ flex: 1 }}>
                        <Text
                            style={{
                                fontFamily: "PoppinsBold",
                                fontSize: 16,
                                marginBottom: 2
                            }}
                        >
                            {option.title}
                        </Text>
                        <Text
                            style={{
                                fontFamily: "PoppinsRegular",
                                fontSize: 14,
                                color: colors.textSecondary
                            }}
                        >
                            {option.description}
                        </Text>
                    </View>
                    <Feather
                        name="chevron-right"
                        size={16}
                        color={colors.textSecondary}
                    />
                </TouchableOpacity>
            ))}
        </View>
    );
}

function Feedback() {
    const theme = useColorScheme() ?? "light";
    const colors = Colors[theme];

    const feedbackOptions = [
        {
            title: "Star it on Github",
            description:
                "Star it on Github to help us improved more the Epon app.",
            icon: "star",
            action: () => {
                Linking.openURL("https://github.com/libyzxy0/epon");
            }
        },
        {
            title: "Send Feedback",
            description: "Tell us what you think and suggest improvements",
            icon: "chatbubble-ellipses",
            action: () => {
                Linking.openURL(
                    "mailto: janlibydelacosta@gmail.com?subject=App Feedback"
                );
            }
        },
        {
            title: "Report a Bug",
            description: "Help us fix issues by reporting bugs",
            icon: "bug",
            action: () => {
                Linking.openURL("mailto: janlibydelacosta@gmail.com?subject=Bug Report");
            }
        },
        {
            title: "Feature Request",
            description: "Suggest new features you'd like to see",
            icon: "bulb",
            action: () => {
                Linking.openURL(
                    "https://github.com/libyzxy0/epon"
                );
            }
        }
    ];

    return (
        <View
            style={{
                marginTop: 25
            }}
        >
            <Text
                style={{
                    fontFamily: "PoppinsBold",
                    fontSize: 18,
                    marginBottom: 15
                }}
            >
                Feedback
            </Text>

            {feedbackOptions.map((option, index) => (
                <TouchableOpacity
                    activeOpacity={0.7}
                    key={index}
                    style={{
                        backgroundColor: colors.card,
                        padding: 15,
                        borderRadius: 12,
                        marginBottom: 10,
                        flexDirection: "row",
                        alignItems: "center"
                    }}
                    onPress={option.action}
                >
                    <View
                        style={{
                            width: 40,
                            height: 40,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: colors.cardSecondary,
                            borderRadius: 50,
                            marginRight: 15
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                color: colors.tint
                            }}
                        >
                            {option.icon === "star" && "⭐"}
                            {option.icon === "chatbubble-ellipses" && "💭"}
                            {option.icon === "bug" && "🐛"}
                            {option.icon === "bulb" && "💡"}
                        </Text>
                    </View>
                    <View transparent style={{ flex: 1 }}>
                        <Text
                            style={{
                                fontFamily: "PoppinsBold",
                                fontSize: 16,
                                marginBottom: 2
                            }}
                        >
                            {option.title}
                        </Text>
                        <Text
                            style={{
                                fontFamily: "PoppinsRegular",
                                fontSize: 14,
                                color: colors.textSecondary
                            }}
                        >
                            {option.description}
                        </Text>
                    </View>
                    <Feather
                        name="chevron-right"
                        size={16}
                        color={colors.textSecondary}
                    />
                </TouchableOpacity>
            ))}
        </View>
    );
}
