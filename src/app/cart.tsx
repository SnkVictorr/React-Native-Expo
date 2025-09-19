import { Text, View, Image, SafeAreaView } from "react-native";
import { StyleSheet } from "react-native";
import React from "react";
import Texto from "../components/texto";
import Carrrinho from "../components/cart";

export default function CarrinhoScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* <Image source={require('@/assets/images/logo-gold.png')} style={styles.image}/> */}
      <Carrrinho />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 50,
  },
});
