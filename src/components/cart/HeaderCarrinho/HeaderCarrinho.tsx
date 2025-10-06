import { Text, View } from "react-native";
import React, { Component } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "@/src/app/styles/colors";
import { OutfitText } from "../../OutfitText";
import BackButton from "../../backButton";

export default class HeaderCart extends Component {
  render() {
    return (
      <SafeAreaView
        style={{
          backgroundColor: colors.background,
          paddingHorizontal: 15,
          flexDirection: "row",
          paddingBottom: -16,
          borderBottomColor: "#c7a31516",
          borderBottomWidth: 1,
        }}
      >
        <BackButton style={{}} />
        <OutfitText
          style={{
            color: colors.gray[300],
            fontSize: 18,
            textAlign: "center",
            flex: 1,
          }}
        >
          Carrinho
        </OutfitText>
      </SafeAreaView>
    );
  }
}
