import { ScrollView, Text, View } from "react-native";
import React, { Component } from "react";
import HeaderProduct from "../../components/productDetail/headerProduct";
import MainProduct from "../../components/productDetail/mainProduct";
import { Scroll } from "lucide-react-native";
import colors from "../styles/colors";

export default function productDetail() {
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderProduct />
        <MainProduct />
      </ScrollView>
    </View>
  );
}
