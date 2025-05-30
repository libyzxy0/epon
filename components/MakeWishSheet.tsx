import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import { BottomShit } from "@/components/BottomShit";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React, { forwardRef, useState } from "react";
import { Pressable } from "react-native";
import { useWishlistActions } from "@/hooks/useWishlistActions";

export const MakeWishSheet = forwardRef<BottomSheet, any>((props, ref) => {
    const theme = useColorScheme() ?? "light";
    const colors = Colors[theme];

    const [name, setName] = useState<string | null>(null);
    const [description, setDescription] = useState<string | null>(null);
    const [price, setPrice] = useState<string | null>(null);

    const { makeAWish } = useWishlistActions();

    const handleCreateWish = async () => {
        const { success, error } = makeAWish({
            name,
            description,
            price: Number(price)
        });
        ref.current?.close();
        setName(null);
        setDescription(null);
        setPrice(null);
        console.log("OUTPUT NG INA MO", success, error);
    };

    return (
        <BottomShit
            containerStyle={{
                paddingHorizontal: 20,
                zIndex: 40
            }}
            snapPoints={["80%"]}
            ref={ref}
        >
            <Text
                style={{
                    fontFamily: "PoppinsBold",
                    fontSize: 20,
                    marginTop: 10
                }}
            >
                Make A Wish 🌠
            </Text>
            <View
                transparent
                style={{
                    marginTop: 20,
                    gap: 20
                }}
            >
                <View
                    transparent
                    style={{
                        gap: 5
                    }}
                >
                    <Text
                        style={{
                            color: colors.secondary[400],
                            fontSize: 12,
                            paddingLeft: 2
                        }}
                    >
                        Thing Name
                    </Text>
                    <BottomSheetTextInput
                        onChangeText={setName}
                        defaultValue={name}
                        style={{
                            backgroundColor: colors.secondary[100],
                            color: colors.text,
                            paddingHorizontal: 15,
                            borderRadius: 7,
                            borderWidth: 1,
                            borderColor: colors.secondary[200]
                        }}
                        placeholder="Si Crush"
                        placeholderTextColor={colors.secondary[400]}
                    />
                </View>

                <View
                    transparent
                    style={{
                        gap: 5
                    }}
                >
                    <Text
                        style={{
                            color: colors.secondary[400],
                            fontSize: 12,
                            paddingLeft: 2
                        }}
                    >
                        Description
                    </Text>
                    <BottomSheetTextInput
                        onChangeText={setDescription}
                        defaultValue={description}
                        multiline
                        numberOfLines={4}
                        style={{
                            backgroundColor: colors.secondary[100],
                            color: colors.text,
                            paddingHorizontal: 15,
                            borderRadius: 7,
                            borderWidth: 1,
                            borderColor: colors.secondary[200]
                        }}
                        placeholder="This is my f*cking description."
                        placeholderTextColor={colors.secondary[400]}
                    />
                </View>
                <View
                    transparent
                    style={{
                        gap: 5
                    }}
                >
                    <Text
                        style={{
                            color: colors.secondary[400],
                            fontSize: 12,
                            paddingLeft: 2
                        }}
                    >
                        Price
                    </Text>
                    <BottomSheetTextInput
                        onChangeText={setPrice}
                        keyboardType={"number-pad"}
                        defaultValue={price}
                        style={{
                            backgroundColor: colors.secondary[100],
                            color: colors.text,
                            paddingHorizontal: 15,
                            borderRadius: 7,
                            borderWidth: 1,
                            borderColor: colors.secondary[200]
                        }}
                        placeholder="30000"
                        placeholderTextColor={colors.secondary[400]}
                    />
                </View>

                <Pressable
                    onPress={handleCreateWish}
                    style={{
                        backgroundColor: colors.primary[500],
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 8,
                        borderRadius: 8
                    }}
                >
                    <Text
                        style={{
                            fontFamily: "PoppinsBold",
                            paddingTop: 2
                        }}
                    >
                        Make Wish
                    </Text>
                </Pressable>
            </View>
        </BottomShit>
    );
});
