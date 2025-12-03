import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import colors from "@/src/app/styles/colors";
import { router } from "expo-router";

export default function BackButton({
  style,
  cor,
}: {
  style?: object;
  cor?: string;
}) {
  function handlePress() {
    router.back();
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        {
          padding: 8, // ← Adiciona área de toque
          marginRight: 8, // ← Espaço entre botão e texto
        },
        style,
      ]}
    >
      <Ionicons
        name="arrow-back-sharp"
        size={24}
        color={cor ? cor : colors.principal}
      />
    </TouchableOpacity>
  );
}
