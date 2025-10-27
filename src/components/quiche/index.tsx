// components/AppText.tsx
import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";

export function TextQuiche({ style, ...props }: TextProps) {
  return <Text {...props} style={[styles.text, style]} />;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Quiche",
  },
});
