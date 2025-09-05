import { Text, View } from "react-native";
import React, { Component } from "react";
import { Image } from "react-native";
import styles from "./style";
import FavoriteButton from "../favoriteButton";
import colors from "@/src/app/styles/colors";
import Avaliacoes from "../avaliacoes";

export default function MainProduct() {
  return (
    <View style={styles.container}>
      <Avaliacoes />
      <View style={styles.imgContainer}>
        <FavoriteButton />
        <Image
          style={styles.img}
          source={require("@/assets/images/violãoGewa.png")}
        />
      </View>
      <View style={styles.mainContent}>
        <Text style={{ color: colors.gray[400] }}>Marca</Text>

        <Text style={styles.title}>
          Violão Gewa de Madeira, com 6 cordas, cor madeira natural
        </Text>
      </View>
    </View>
  );
}
