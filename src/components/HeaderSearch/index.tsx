import { Text, TextInput, View } from "react-native";
import React, { Component, useState } from "react";
import BackButton from "../backButton";
import { Ionicons } from "@expo/vector-icons";
import stylesSearch from "../searchBar/style";
import colors from "@/src/app/styles/colors";
export default function HeaderSearch({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (q: string) => void;
}) {
  return (
    <>
      {/* //🔍 SEARCHBAR FIXA NO TOPO */}

      <View style={stylesSearch.searchContainer}>
        <BackButton cor={colors.gray[400]} />
        <View style={stylesSearch.searchBar}>
          <TextInput
            placeholder="Buscar produtos..."
            placeholderTextColor="#888"
            style={stylesSearch.searchInput}
            value={query}
            onChangeText={setQuery}
            autoFocus={true}
            focusable={true}
          />
          <Ionicons name="search" size={20} color="#888" />
        </View>
      </View>
    </>
  );
}
