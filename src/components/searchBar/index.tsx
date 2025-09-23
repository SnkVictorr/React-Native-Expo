import { Text, TextInput, View } from "react-native";
import React, { Component } from "react";
import styles from "./style";
import { Ionicons } from "@expo/vector-icons";

export default function SearchBar() {
  return (
    <View>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Buscar produtos..."
            placeholderTextColor="#888"
            style={styles.searchInput}
          />
          <Ionicons name="search" size={20} color="#888" />
        </View>
      </View>
    </View>
  );
}
