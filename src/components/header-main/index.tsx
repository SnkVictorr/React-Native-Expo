import { Text, TouchableOpacity, View, Image } from "react-native";
import React, { Component } from "react";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./style";

export default function HeaderMain() {
  return (
    <View style={styles.header}>

      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../../../assets/images/logo-gold.png")}
          width={50}
          height={50}
        />
      </View>
    </View>
  );
}
