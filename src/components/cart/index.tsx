import { Text, View, Image, SafeAreaView } from "react-native";
import { StyleSheet } from "react-native";
import React from "react";
import Texto from "../texto";

import colors from "@/src/app/styles/colors";
import { Header } from "react-native/Libraries/NewAppScreen";
import HeaderCart from "./HeaderCarrinho/HeaderCarrinho";
import CardCarrinho from "./CardCarrinho";

export default function Cart() {
  return (
    <>
      <HeaderCart />
      <CardCarrinho />
    </>
  );
}
