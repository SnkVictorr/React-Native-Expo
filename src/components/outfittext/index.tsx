import colors from "@/src/app/styles/colors";
import React from "react";
import { Text, TextProps } from "react-native";

export function OutfitText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[
        { fontFamily: "Outfit_500Medium", color: colors.gray[300] },
        props.style,
      ]}
    />
  );
}
