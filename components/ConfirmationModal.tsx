import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput
} from "react-native";
import {
  useState
} from "react";
import {
  useColorScheme
} from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";

type ConfirmationModalType = {
  title: string;
  description: string;
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmationModal({
  visible = false,
  title,
  description,
  onConfirm,
  onCancel
}: ConfirmationModalType) {
  const handleConfirm = () => {
    onConfirm?.();
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
        style={ {
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "center",
          alignItems: "center"
        }}
        >
        <View
          style={ {
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
            style={ {
              fontSize: 18,
              fontFamily: "PoppinsBold",
              marginBottom: 10,
              textAlign: "center",
              color: colors.primary.default
            }}
            >
            {title}
          </Text>

          <Text
            style={ {
              fontSize: 16,
              color: colors.textSecondary,
              marginBottom: 20,
              textAlign: "center"
            }}
            >
            {description}
          </Text>

          <View
            style={ {
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 15
            }}
            >
            <TouchableOpacity activeOpacity={0.7}
              style={ {
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
                style={ {
                  color: colors.text,
                  fontSize: 14,
                  fontFamily: "PoppinsBold",

                }}
                >
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7}
              style={ {
                flex: 1,
                paddingVertical: 9,
                borderRadius: 8,
                alignItems: "center",
                backgroundColor: colors.primary['default']
              }}
              onPress={handleConfirm}
              >
              <Text
                style={ {
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