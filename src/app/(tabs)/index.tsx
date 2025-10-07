import { Text, View } from "react-native";
import React, { Component } from "react";
import HomeScreen from "../main";
import Login from "../login";
import Dashboard from "../dashboard";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductDetail from "../productDetail/[id]";
import { Home } from "lucide-react-native";
import colors from "../styles/colors";
import ProductsMarcas from "../products/[filtro]";
import CartScreen from "./carrinho";

export default function Index() {
  return (
    <>
      <View>
        {/* <Dashboard /> */}k{/* <HomeScreen /> */}
        <ProductsMarcas />
      </View>
    </>
  );
}
