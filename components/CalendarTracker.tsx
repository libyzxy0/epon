import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import React from "react";
import { Calendar } from "react-native-calendars";

export function CalendarTracker() {
    const theme = useColorScheme() ?? "light";
    const colors = Colors[theme];

    return (
        <View
            style={{
                marginTop: 20,
                paddingVertical: 10,
                borderRadius: 9,
                backgroundColor: colors.secondary[50],
                paddingHorizontal: 4
            }}
        >
            <View
            transparent
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 15,
                    marginTop: 3
                }}
            >
                <Text
                    style={{
                        fontFamily: "PoppinsBold",
                        fontSize: 16,
                        color: colors.text,
                        paddingTop: 3
                    }}
                >
                    {new Date().toLocaleString("default", {
                        month: "long",
                        year: "numeric"
                    })}
                </Text>

                <View
                transparent
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 12
                    }}
                >
                    <View
                    transparent
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 4
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: colors.primary[300],
                                height: 15,
                                width: 15,
                                borderRadius: 20
                            }}
                        />
                        <Text
                            style={{
                                color: colors.primary[300],
                                paddingTop: 2.5
                            }}
                        >
                            Held ✓
                        </Text>
                    </View>

                    <View
                    transparent
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 4
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: colors.secondary[300],
                                height: 15,
                                width: 15,
                                borderRadius: 20
                            }}
                        />
                        <Text
                            style={{
                                color: colors.secondary[300],
                                paddingTop: 2.5
                            }}
                        >
                           Void ✗
                        </Text>
                    </View>
                </View>
            </View>

            <Calendar
                hideArrows={true}
                renderHeader={() => null}
                theme={{
                    monthTextColor: colors.text,
                    backgroundColor: colors.secondary[50],
                    calendarBackground: colors.secondary[50],
                    textSectionTitleColor: colors.primary[400],
                    selectedDayBackgroundColor: colors.secondary[50],
                    selectedDayTextColor: colors.text,
                    todayTextColor: colors.primary[400],
                    dayTextColor: colors.secondary[800],
                    textDisabledColor: colors.secondary[400]
                }}
                markedDates={{
                    "2025-05-15": {
                        selected: true,
                        marked: true,
                        selectedColor: colors.secondary[300]
                    },
                    "2025-05-13": {
                        selected: true,
                        marked: true,
                        selectedColor: colors.secondary[300]
                    },
                    "2025-05-04": {
                        marked: false,
                        selected: true,
                        selectedColor: colors.primary[300]
                    }
                }}
            />
        </View>
    );
}
