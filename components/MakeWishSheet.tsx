import {
  Text,
  View
} from "@/components/Themed";
import {
  useColorScheme
} from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";
import {
  BottomShit
} from "@/components/BottomShit";
import BottomSheet, {
  BottomSheetTextInput
} from "@gorhom/bottom-sheet";
import React, {
  forwardRef,
  useState
} from "react";
import {
  TouchableOpacity
} from "react-native";
import {
  useWishlistActions
} from "@/hooks/useWishlistActions";
import Toast from 'react-native-toast-message'

export const MakeWishSheet = forwardRef < BottomSheet, any > ((props, ref) => {
  const colors = Colors[(useColorScheme() ?? "light")];

  const [name, setName] = useState < string | null > (null);
  const [description, setDescription] = useState < string | null > (null);
  const [price, setPrice] = useState < string | null > (null);

  const {
    makeAWish
  } = useWishlistActions();

  const handleCreateWish = async () => {
    if(name === null || name === "") {
      Toast.show({
        type: 'warning',
        text1: 'Missing name!',
        text2: "Please enter the name of your wish!"
      })
      return;
    }
    if(price === null || price === "") {
      Toast.show({
        type: 'warning',
        text1: 'Missing price!',
        text2: "Please enter the price of your wish!"
      })
      return;
    }
    
    const {
      success, error
    } = await makeAWish( {
        name,
        description: description === null || description === "" ? "No description." : description,
        price: Number(price) /* Convert to number type, baka mag 1+1=11 */
      });

    if (success) {
      Toast.show({
        type: 'success',
        text1: 'Success!',
        text2: "Wish created! You can achieve it!"
      })
      ref.current?.close();
      setName(null);
      setDescription(null);
      setPrice(null);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Failed to create wish!',
        text2: error?.message || "Wag kana mag wish tarantado!"
      })
    }


    /*console.log("OUTPUT NG INA MO:", success, error);*/
  };

  return (
    <BottomShit
      containerStyle={ {
        paddingHorizontal: 20,
        zIndex: 40
      }}
      snapPoints={["60%"]}
      ref={ref}
      >
      <Text
        style={ {
          fontFamily: "PoppinsBold",
          fontSize: 20,
          marginTop: 10
        }}
        >
        Make A Wish 🌠
      </Text>
      <View
        transparent
        style={ {
          marginTop: 20,
          gap: 20
        }}
        >
        <View
          transparent
          style={ {
            gap: 5
          }}
          >
          <Text
            style={ {
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
            style={ {
              backgroundColor: colors.cardSecondary,
              color: colors.text,
              paddingHorizontal: 15,
              borderRadius: 7,
              borderWidth: 1,
              borderColor: colors.border
            }}
            placeholder="Laptop"
            placeholderTextColor={colors.textSecondary}
            />
        </View>

        <View
          transparent
          style={ {
            gap: 5
          }}
          >
          <Text
            style={ {
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
            style={ {
              backgroundColor: colors.cardSecondary,
              color: colors.text,
              paddingHorizontal: 15,
              borderRadius: 7,
              borderWidth: 1,
              borderColor: colors.border
            }}
            placeholder="I will use this Laptop for my school and work."
            placeholderTextColor={colors.textSecondary}
            />
        </View>
        <View
          transparent
          style={ {
            gap: 5
          }}
          >
          <Text
            style={ {
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
            style={ {
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
          style={ {
            backgroundColor: colors.primary['default'],
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
            borderRadius: 8
          }}
          >
          <Text
            style={ {
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