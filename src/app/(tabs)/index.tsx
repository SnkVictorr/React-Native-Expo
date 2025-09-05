import { Text, View } from "react-native";
import React, { Component } from "react";
import HomeScreen from "../main";
import Login from "../login";
import Dashboard from "../dashboard";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductDetail from "../productDetail";

export default function Index() {
  return (
    <>
      <SafeAreaView>
        {/* <Dashboard /> */}
        <ProductDetail />
      </SafeAreaView>
    </>
  );
}
