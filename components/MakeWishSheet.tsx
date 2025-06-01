import { Text, View } from "@/components/Themed";
import { useColorScheme } from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import { BottomShit } from "@/components/BottomShit";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React, { forwardRef, useState } from "react";
import { TouchableOpacity } from "react-native";
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
            price: Number(price) /* Convert to number type, baka mag 1+1=11 */
        });
        
        /* I clear ang putang inang form nayan */
        ref.current?.close();
        setName(null);
        setDescription(null);
        setPrice(null);
        
        /*console.log("OUTPUT NG INA MO:", success, error);*/
    };

    return (
        <BottomShit
            containerStyle={{
                paddingHorizontal: 20,
                zIndex: 40
            }}
            snapPoints={["60%"]}
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
                            color: colors.textSecondary,
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
                            backgroundColor: colors.cardSecondary,
                            color: colors.text,
                            paddingHorizontal: 15,
                            borderRadius: 7,
                            borderWidth: 1,
                            borderColor: colors.border
                        }}
                        placeholder="Si Crush"
                        placeholderTextColor={colors.textSecondary}
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
                            color: colors.textSecondary,
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
                            backgroundColor: colors.cardSecondary,
                            color: colors.text,
                            paddingHorizontal: 15,
                            borderRadius: 7,
                            borderWidth: 1,
                            borderColor: colors.border
                        }}
                        placeholder="Si Jan Liby ay napakapogi."
                        placeholderTextColor={colors.textSecondary}
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
                            color: colors.textSecondary,
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
                            backgroundColor: colors.cardSecondary,
                            color: colors.text,
                            paddingHorizontal: 15,
                            borderRadius: 7,
                            borderWidth: 1,
                            borderColor: colors.border
                        }}
                        placeholder="30000"
                        placeholderTextColor={colors.textSecondary}
                    />
                </View>

                <TouchableOpacity activeOpacity={0.7}
                    onPress={() => handleCreateWish()}
                    style={{
                        backgroundColor: colors.primary['default'],
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
                </TouchableOpacity>
            </View>
        </BottomShit>
    );
});
