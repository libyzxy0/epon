import React, {
  forwardRef
} from "react";
import BottomSheet, {
  BottomSheetView,
  BottomSheetTextInput
} from "@gorhom/bottom-sheet";
import {
  useColorScheme
} from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";

type Props = {
  children: React.ReactNode;
  containerStyle?: string;
}
type Ref = BottomSheet;

export const BottomShit = forwardRef < Ref, Props > ((props, ref) => {
  const colors = Colors[(useColorScheme() ?? "light")];

  return (
    <BottomSheet
      ref={ref}
      keyboardBehavior="extend"
      index={-1}
      snapPoints={props.snapPoints}
      enablePanDownToClose
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      backgroundStyle={ {
        backgroundColor: colors.card
      }}
      handleIndicatorStyle={ {
        backgroundColor: colors.primary['default']
      }}
      {...props}
      >
      <BottomSheetView style={props?.containerStyle}>{props.children}</BottomSheetView>
    </BottomSheet>
  );
});