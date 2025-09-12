import { Text, View } from "react-native";
import React, { Component } from "react";
import styles from "./style";
import FavoriteButton from "../favoriteButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import colors from "@/src/app/styles/colors";
import { TextQuiche } from "../../quiche";

export default function HeaderProduct() {
  return (
    <View style={styles.header}>
      <Ionicons name="arrow-back-sharp" size={24} color={colors.white} />
      <Text style={styles.title}>Header</Text>
    </View>
  );
}
