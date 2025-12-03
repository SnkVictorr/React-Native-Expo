import { Text, View } from "react-native";
import React, { Component } from "react";

import Login from "./login";
import Dashboard from "./dashboard";
import HomeScreen from "./(tabs)/main";
import CartScreen from "./(tabs)/carrinho";

export default function Index() {
  return (
    <>
      <Dashboard />
      {/* <CartScreen /> */}
      {/* <HomeScreen/> */}
    </>
  );
}
