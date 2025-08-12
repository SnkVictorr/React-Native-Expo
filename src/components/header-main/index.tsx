import { Text, TouchableOpacity, View, Image } from "react-native";
import React, { Component } from "react";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./style";

export default function HeaderMain() {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.menuButton}>
        <Ionicons name="menu" size={24} color="#f5c842" />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../../assets/images/logo-gold.png")}
          width={50}
          height={50}
        />
      </View>

      <TouchableOpacity style={styles.cartButton}>
        <Image
          source={require("@/assets/images/icone-bag-compra.png")}
          width={24}
          style={styles.cartButton}
        />
      </TouchableOpacity>
    </View>
  );
}
