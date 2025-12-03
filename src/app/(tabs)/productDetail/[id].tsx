import { Pressable, ScrollView, Text, View } from "react-native";
import React, { Component } from "react";
import HeaderProduct from "@/src/components/productDetail/headerProduct";
import MainProduct from "@/src/components/productDetail/mainProduct";
import { Scroll } from "lucide-react-native";
import colors from "../../styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";

export default function productDetail() {
  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable />
        {/* <HeaderProduct /> */}
        <MainProduct />
      </ScrollView>
    </SafeAreaView>
  );
}
