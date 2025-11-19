import colors from "@/src/app/styles/colors";
import { Minus, Plus, Trash } from "lucide-react-native";
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

interface MaxMinusProps{
  incrementar: () => void;
  decrementar: () => void;
  quantidade: number;
}

export default function MaxMinus({ incrementar, decrementar, quantidade }: MaxMinusProps) {
  return (
    <View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.background,
          position: "absolute",
          bottom: 5,
          right: 0,
          padding: 4,
          borderRadius: 8,
        }}
      >
        <TouchableOpacity onPress={decrementar}>
          <Minus color={colors.principal} size={16} />
        </TouchableOpacity>
        <Text style={{ marginHorizontal: 8, color: colors.gray[300] }}>{quantidade}</Text>
        <TouchableOpacity onPress={incrementar}>
          <Plus color={colors.principal} size={16} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
