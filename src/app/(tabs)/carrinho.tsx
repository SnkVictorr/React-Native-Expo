import { Text, View } from "react-native";
import React, { Component } from "react";
import Cart from "@/src/components/cart";
import colors from "../styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen() {
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        height: "100%",
      }}
      edges={["top"]}
    >
      {/* <Image source={require('@/assets/images/logo-gold.png')} style={styles.image}/> */}
      <Cart />
    </SafeAreaView>
  );
}
