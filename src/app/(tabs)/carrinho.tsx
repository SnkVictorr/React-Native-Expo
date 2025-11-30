import { SafeAreaView, Text, View } from "react-native";
import React, { Component } from "react";
import Cart from "@/src/components/cart";
import colors from "../styles/colors";

export default function CartScreen() {
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        height: "100%",
        paddingTop: 30,
      }}
    >
      {/* <Image source={require('@/assets/images/logo-gold.png')} style={styles.image}/> */}
      <Cart />
    </SafeAreaView>
  );
}
