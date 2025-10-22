import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import React, { Component } from "react";
import colors from "@/src/app/styles/colors";
import { OutfitText } from "../../Outfittext";

export default class FooterCarrinho extends Component {
  render() {
    return (
      <SafeAreaView
        style={{
          padding: 20,
          borderTopWidth: 1,
          borderTopColor: colors.principal,
          backgroundColor: colors.background,
          zIndex: 50,
          paddingBottom: 45,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingBottom: 20,
          }}
        >
          <OutfitText style={{ fontSize: 16, color: colors.white }}>
            Total
          </OutfitText>
          <OutfitText style={{ fontSize: 16, color: colors.white }}>
            R$ 3.600,00
          </OutfitText>
        </View>
        <TouchableOpacity
          style={{
            alignItems: "center",
            backgroundColor: colors.principal,
            padding: 13,
            borderRadius: 15,
          }}
        >
          <OutfitText style={{ color: colors.white }}>Continuar</OutfitText>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
