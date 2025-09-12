import { Text, View } from "react-native";
import React, { Component } from "react";
import HomeScreen from "../main";
import Login from "../login";
import Dashboard from "../dashboard";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductDetail from "../productDetail";
import { Home } from "lucide-react-native";
import colors from "../styles/colors";

export default function Index() {
  return (
    <>
      <View
        style={{ backgroundColor: colors.background, paddingTop: 20, flex: 1 }}
      >
        {/* <Dashboard /> */}
        {/* <ProductDetail /> */}
        <HomeScreen />
      </View>
    </>
  );
}
