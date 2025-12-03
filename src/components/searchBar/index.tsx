import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Component, useEffect, useState } from "react";
import styles from "./style";
import { Ionicons } from "@expo/vector-icons";
import { buscarProdutos } from "@/src/app/services/Search/get";
import { Produto } from "@/src/app/types/produto";
import colors from "@/src/app/styles/colors";
import { Image } from "react-native";
import { BASE_URL } from "@/src/app/config/api";
import { router } from "expo-router";
export default function SearchBar() {
  return (
    <>
      <View style={[styles.searchContainer, { paddingLeft: 20 }]}>
        <Pressable
          style={styles.searchBar}
          onPress={() => router.push("/SearchScreen")}
        >
          <TextInput
            placeholder="Buscar produtos..."
            placeholderTextColor="#888"
            style={styles.searchInput}
            editable={false}
            pointerEvents="none"
          />
          <Ionicons name="search" size={20} color="#888" />
        </Pressable>
      </View>
    </>
  );
}
