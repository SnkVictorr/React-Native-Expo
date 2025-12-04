import { ScrollView, View } from "react-native";
import React from "react";
import HeaderCart from "../HeaderBack";
import CardCarrinho from "./CardCarrinho";
import colors from "@/src/app/styles/colors";
import ProductList from "../main/ProductList1";

export default function Cart() {
  return (
    <>
      <HeaderCart text="Carrinho" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, paddingBottom: 20 }}
      >
        <CardCarrinho />

        <View
          style={{
            marginTop: 10,
          }}
        />

        <ProductList title="Você também pode gostar" />
      </ScrollView>
    </>
  );
}
