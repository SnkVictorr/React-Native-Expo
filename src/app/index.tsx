import { Button, Text, View } from "react-native";
import React, { Component } from "react";

import Label from "../components/label";
import { StyleSheet } from "react-native";
import Input from "../components/input";
import { router } from "expo-router";

export default function Index() {
  const handlePress = () => {
    console.log("Button Pressed");
    alert("Button Pressed");
    router.push("/dashboard");
  };

  {
    return (
      <View>
        {/* div */}
        <Text style={styles.title}>index</Text>
        {/* h1 ou p */}
        <Label name="Nome" />
        <Input text="Digite o seu nome" />
        <Input text="Digite o seu email" />
        <Input text="Digite o seu senha" />

        <Button onPress={handlePress} title={"Enviar"} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 20,
  },
});
