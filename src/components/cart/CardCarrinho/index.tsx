import { Text, View } from "react-native";
import React, { Component } from "react";
import { Image } from "react-native";
import { QuicheMedium } from "../../quiche/quiche-medium";
import { OutfitText } from "../../OutfitText";
import MaxMinus from "../MaxMinus";

export default class CardCarrinho extends Component {
  render() {
    return (
      <View style={{ paddingTop: 16 }}>
        <View
          style={{
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#333333",
            padding: 16,
            backgroundColor: "#111111",
          }}
        >
          <View style={{ flexDirection: "row", gap: 16 }}>
            <Image
              source={require("@/assets/images/violãoGewa.png")}
              style={{ width: 100, height: 100, borderRadius: 8 }}
            />
            <View style={{ flex: 1, flexDirection: "column", gap: 8 }}>
              <OutfitText
                style={{ flex: 1, flexWrap: "wrap" }}
                numberOfLines={2}
              >
                Violão Fera demais VC-200 Casio Muito Bom Mesmo Quezy
              </OutfitText>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <QuicheMedium style={{ fontSize: 16, color: "#c7a315" }}>
                  R$ 1.200,00
                </QuicheMedium>
                <MaxMinus />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
