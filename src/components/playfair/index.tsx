// components/AppText.tsx
import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";

type AppTextProps = TextProps & {
  weight?: "regular" | "bold";
};

export default function AppText({
  style,
  children,
  weight = "regular",
  ...props
}: AppTextProps) {
  return (
    <Text
      {...props}
      style={[
        styles.base,
        weight === "regular" ? styles.regular : styles.bold,
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontSize: 16,
    color: "#222",
  },
  regular: {
    fontFamily: "PlayfairRegular",
  },
  bold: {
    fontFamily: "PlayfairBold",
  },
});
