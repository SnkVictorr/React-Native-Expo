import { ScrollView, View } from "react-native";
import React from "react";
import HeaderCart from "../HeaderBack";
import CardCarrinho from "./CardCarrinho";
import Footer from "./Footer";
import colors from "@/src/app/styles/colors";
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
