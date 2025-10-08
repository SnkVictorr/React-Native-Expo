import { Text, TouchableHighlight, View } from "react-native";
import React, { Component } from "react";
import { Ionicons } from "@expo/vector-icons";
import colors from "@/src/app/styles/colors";
import { router } from "expo-router";


export default function BackButton({ style }: { style?: object }) {
  function handlePress() {
    // Logic to go back
    router.back();
  }
  return (
    <TouchableHighlight onPress={handlePress}>
      <Ionicons
        name="arrow-back-sharp"
        size={24}
        color={colors.principal}
        style={[{ position: "absolute",  zIndex: 20 }, style]}
      />
    </TouchableHighlight>
  );
}
