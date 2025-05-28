import React from "react";
import { View, Text, Modal, Pressable, TextInput } from "react-native";
import { useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";

export function SaveMoneyModal({
    visible = false,
    isCustom,
    amount,
    onConfirm,
    onCancel
}) {
    const [inputAmmount, onChangeAmmount] = useState<number | null>(0);
    const handleConfirm = () => {
        onConfirm?.(Number(inputAmmount));
        onChangeAmmount(0)
    };

    const handleCancel = () => {
        onCancel?.();
    };

    const theme = useColorScheme() ?? "light";
    const colors = Colors[theme];

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}
        >
            <View
                style={{
                    flex: 1,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <View
                    style={{
                        backgroundColor: colors.secondary[50],
                        borderRadius: 12,
                        padding: 20,
                        margin: 20,
                        minWidth: 300,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5
                    }}
                >
                    <Text
                        style={{
                            fontSize: 18,
                            fontFamily: "PoppinsBold",
                            marginBottom: 10,
                            textAlign: "center",
                            color: colors.text
                        }}
                    >
                        Save Money
                    </Text>

                    {!isCustom ? (
                        <Text
                            style={{
                                fontSize: 16,
                                color: colors.secondary[400],
                                marginBottom: 20,
                                textAlign: "center"
                            }}
                        >
                            {`You are able to save `}
                            <Text
                                style={{
                                    fontFamily: "PoppinsBold",
                                    color: colors.primary[400]
                                }}
                            >{`${amount} coins`}</Text>
                            {` Are you sure?`}
                        </Text>
                    ) : (
                        <Text
                            style={{
                                fontSize: 16,
                                color: colors.secondary[400],
                                marginBottom: 20,
                                textAlign: "center"
                            }}
                        >
                            Enter amount of money you want to save for today.
                        </Text>
                    )}
                    {isCustom && (
                        <View
                            style={{
                                marginBottom: 20
                            }}
                        >
                            <TextInput
                                keyboardType={"number-pad"}
                                placeholderTextColor={colors.secondary[400]}
                                style={{
                                    backgroundColor: colors.secondary[50],
                       borderWidth: 1.5,
                       borderColor: colors.secondary[100],
                                    borderRadius: 8,
                                    paddingHorizontal: 15,
                                    color: colors.text
                                }}
                                placeholder="1000"
                                cursorColor={colors.primary[400]}
                                onChangeText={onChangeAmmount}
                                value={inputAmmount}
                            />
                        </View>
                    )}

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            gap: 15
                        }}
                    >
                        <Pressable
                            style={{
                                flex: 1,
                               borderWidth: 1,
                                    borderColor: colors.secondary[300], paddingVertical: 8,
                                borderRadius: 8,
                                alignItems: "center",
                                backgroundColor: colors.secondary[200]
                            }}
                            onPress={handleCancel}
                        >
                            <Text
                                style={{
                                    color: colors.secondary[500],
                                    fontSize: 14,
                                    fontFamily: "PoppinsBold",
                                    
                                }}
                            >
                                Cancel
                            </Text>
                        </Pressable>

                        <Pressable
                            style={{
                                flex: 1,
                                paddingVertical: 7,
                                borderRadius: 8,
                                alignItems: "center",
                                backgroundColor: colors.primary[300]
                            }}
                            onPress={handleConfirm}
                        >
                            <Text
                                style={{
                                    color: "white",
                                    fontSize: 14,
                                    fontFamily: "PoppinsBold"
                                }}
                            >
                                Confirm
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
