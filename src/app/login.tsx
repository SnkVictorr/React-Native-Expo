import { Image, Text, View } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import Label from "../components/label";
import Input from "../components/input";
import Botao from "../components/button";

export default function Login() {
  return (
    <View style={{ backgroundColor: "#131212", flex: 1, padding: 20 }}>
      {/* div */}
      <Image
        source={require("../../assets/images/logo-gold.png")}
        style={Styles.imagem}
      />
      <Text style={styles.title}>Faça o seu login:</Text>
      {/* inputs */}
      <Label name="Nome:" />
      <Input text="Digite seu nome..." />
      <Label name="Email:" />
      <Input text="Digite seu email..." />
      <Label name="Senha:" />
      <Input text="Digite sua senha..." />
      <Botao />
    </View>
  );
}

const Styles = StyleSheet.create({
  imagem: {
    width: 90,
    height: 90,
    alignSelf: "center",
    marginVertical: 20,
  },
});

const styles = StyleSheet.create({
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginLeft: 10,
    marginVertical: 20,
  },
});
