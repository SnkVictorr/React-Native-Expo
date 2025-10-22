import { Text, View } from "react-native";
import React, { Component } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "@/src/app/styles/colors";
<<<<<<< Updated upstream:src/components/HeaderBack/index.tsx
<<<<<<< Updated upstream:src/components/HeaderBack/index.tsx
import { OutfitText } from "../OutfitText";
import BackButton from "../backButton";
=======
=======
>>>>>>> Stashed changes:src/components/cart/HeaderCarrinho/HeaderCarrinho.tsx
import { OutfitText } from "../../Outfittext";
import BackButton from "../../backButton";
>>>>>>> Stashed changes:src/components/cart/HeaderCarrinho/HeaderCarrinho.tsx

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
          paddingTop: 28,
          paddingBottom: 14,

          justifyContent: "space-between",
          borderBottomColor: "#c7a31516",
          borderBottomWidth: 1,
        }}
      >
        <View style={{}}>
          {" "}
          <BackButton style={{}} />
          <OutfitText
            style={{
              color: colors.gray[300],
              fontSize: 18,
              textAlign: "center",
            }}
          >
            {this.props.text}
          </OutfitText>
        </View>
      </View>
    );
  }
}
