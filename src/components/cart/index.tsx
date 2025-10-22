import { Pressable, ScrollView, View, Text } from "react-native";
import { StyleSheet } from "react-native";
import React from "react";

import HeaderCart from "../HeaderBack";
import CardCarrinho from "./CardCarrinho";
import Footer from "./Footer";
import Frete from "../Frete";
import colors from "@/src/app/styles/colors";
import { OutfitText } from "../Outfittext";
import ProductList from "../main/ProductList1";

export default function Cart() {
  return (
    <>
      <HeaderCart text="Carrinho" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginBottom: 10 }}
      >
        <CardCarrinho />
        <CardCarrinho />
        <CardCarrinho />
        <CardCarrinho />

        <View
          style={{
            backgroundColor: "#111111",
            paddingHorizontal: 20,
            marginTop: 10,
            paddingBottom: 20,
            borderRadius: 8,

            // borderTopWidth: 1,
            // borderTopColor: colors.gray[600],
          }}
        >
          <Frete />
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: colors.gray[600],
            marginTop: 10,
          }}
        ></View>
        <ProductList title="Você também pode gostar" />
      </ScrollView>

      <Footer />
    </>
  );
}
