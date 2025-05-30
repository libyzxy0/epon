import React, { forwardRef } from "react";
import BottomSheet, {
    BottomSheetView,
    BottomSheetTextInput
} from "@gorhom/bottom-sheet";
import { useColorScheme } from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";

type Props = {
 children: React.ReactNode;
 containerStyle?: string;
}
type Ref = BottomSheet;

export const BottomShit = forwardRef<Ref, Props>((props, ref) => {
    const theme = useColorScheme() ?? "light";
    const colors = Colors[theme];

    return (
        <BottomSheet
            ref={ref}
            keyboardBehavior="extend"
            index={-1}
            snapPoints={props.snapPoints}
            enablePanDownToClose
            backgroundStyle={{
                backgroundColor: colors.secondary[50]
            }}
            handleIndicatorStyle={{
             backgroundColor: colors.primary[400]
            }}
        >
            <BottomSheetView style={props?.containerStyle}>{props.children}</BottomSheetView>
        </BottomSheet>
    );
});
