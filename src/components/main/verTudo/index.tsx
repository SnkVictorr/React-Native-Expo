import { Text, View } from "react-native";
import React, { Children, Component } from "react";
import colors from "@/src/app/styles/colors";

interface VerTudoProps {
  text: string;
}

export default function VerTudo({ text }: VerTudoProps) {
  return (
    <View>
      <Text
        style={{
          color: colors.principal,
          paddingHorizontal: 10,
          marginRight: 10,
          marginTop: 4,
          fontFamily: "Quiche",
        }}
      >
        {text}
      </Text>
    </View>
  );
}
