import React from "react";
import { View, Text, Modal, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";

type SaveMoneyModalType = {
  visible: boolean;
  amount: number;
  isCustom: boolean;
  onConfirm: (inputAmount: number) => void;
  onCancel: () => void;
}

export function SaveMoneyModal({
    visible = false,
    isCustom,
    amount,
    onConfirm,
    onCancel
}: SaveMoneyModalType) {
    const [inputAmmount, onChangeAmmount] = useState<number | null>(0);
    const handleConfirm = () => {
        onConfirm?.(Number(inputAmmount));
        onChangeAmmount(0)
    };

    const handleCancel = () => {
        onCancel?.();
    };
    const colors = Colors[(useColorScheme() ?? "light")];

    return (
        <Modal
            animationType="fade"
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
                        backgroundColor: colors.card,
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
                            textAlign: "left",
                            color: colors.text
                        }}
                    >
                        Save A Coin
                    </Text>

                    {!isCustom ? (
                        <Text
                            style={{
                                fontSize: 16,
                                color: colors.textSecondary,
                                marginBottom: 20,
                                textAlign: "left",
                                fontSize: 14
                            }}
                        >
                            {`You are able to save `}
                            <Text
                                style={{
                                    fontFamily: "PoppinsBold",
                                    fontSize: 14,
                                    color: colors.primary['default']
                                }}
                            >{`${amount} coins`}</Text>
                            {` Are you sure?`}
                        </Text>
                    ) : (
                        <Text
                            style={{
                                fontSize: 14,
                                color: colors.textSecondary,
                                marginBottom: 20,
                                textAlign: "left"
                            }}
                        >
                            Enter amount of money you want to save.
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
                                placeholderTextColor={colors.textSecondary}
                                style={{
                                    backgroundColor: colors.cardSecondary,
                       borderWidth: 1,
                       borderColor: colors.border,
                                    borderRadius: 8,
                                    paddingHorizontal: 15,
                                    color: colors.text
                                }}
                                placeholder="1000"
                                cursorColor={colors.primary['default']}
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
                        <TouchableOpacity activeOpacity={0.7}
                            style={{
                                flex: 1,
                               borderWidth: 1,
                                    borderColor: colors.border, paddingVertical: 8,
                                borderRadius: 8,
                                alignItems: "center",
                                backgroundColor: colors.cardSecondary
                            }}
                            onPress={handleCancel}
                        >
                            <Text
                                style={{
                                    color: colors.text,
                                    fontSize: 14,
                                    fontFamily: "PoppinsBold",
                                    
                                }}
                            >
                                Cancel
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.7}
                            style={{
                                flex: 1,
                                paddingVertical: 9,
                                borderRadius: 8,
                                alignItems: "center",
                                backgroundColor: colors.primary['default']
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
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
