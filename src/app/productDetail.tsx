import { Text, View } from "react-native";
import React, { Component } from "react";
import HeaderProduct from "../components/productDetail/headerProduct";
import MainProduct from "../components/productDetail/mainProduct";

export default function productDetail() {
  return (
    <View>
      <HeaderProduct />
      <MainProduct />
    </View>
  );
}
