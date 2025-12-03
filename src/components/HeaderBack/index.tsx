import { View } from "react-native";
import React, { Component } from "react";
import colors from "@/src/app/styles/colors";
import { OutfitText } from "../OutfitText";
import BackButton from "../backButton";

type HeaderBackProps = {
  text: string;
};

export default class HeaderBack extends Component<HeaderBackProps> {
  render() {
    return (
      <View
        style={{
          backgroundColor: colors.background,
          paddingHorizontal: 15,
          paddingTop: 8,
          paddingBottom: 8,
          flexDirection: "row",
          alignItems: "center",
          borderBottomColor: "#c7a31516",
          borderBottomWidth: 1,
        }}
      >
        <BackButton />
        <OutfitText
          style={{
            color: colors.gray[300],
            fontSize: 18,
            flex: 1,
            textAlign: "center",

            marginRight: 45, // ← Compensa o espaço do BackButton
          }}
        >
          {this.props.text}
        </OutfitText>
      </View>
    );
  }
}
