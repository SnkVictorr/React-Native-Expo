import { FlatList, Text, View, StyleSheet } from "react-native";
import React, { Component } from "react";
import { CategoryItem } from "../categoryItem";
import Title from "../title";
import colors from "@/src/app/styles/colors";
import VerTudo from "../verTudo";

export default function CategoryList() {
  const categories = [
    {
      name: "Cordas",
      icon: require("@/assets/images/icones/icone-instrumento-corda.png"),
      image: require("@/assets/images/categorias/cordas.png"),
      productCount: 120,
    },
    {
      name: "Sopro",
      icon: require("@/assets/images/icones/icone-sopro.png"),
      image: require("@/assets/images/categorias/sopro.png"),
      productCount: 85,
    },
    {
      name: "Percussão",
      icon: require("@/assets/images/icones/icone-instrumento-percussao.png"),
      image: require("@/assets/images/categorias/percurssao.png"),
      productCount: 45,
    },
    // { name: "Microfones", icon: Mic, image: require("@/assets/images/categorias/microfone.png"), productCount: 67 },
    // { name: "Fones", icon: Headphones, image: pianoImage, productCount: 93 },
    // {
    //   name: "Acessórios",
    //   icon: Music2,
    //   image: drumsImage,
    //   productCount: 234,
    // },
  ];
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 20,
          paddingLeft: 20,
        }}
      >
        {" "}
        <Title conteudo="Categorias"></Title>
        <VerTudo text="Ver todas" />
      </View>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <CategoryItem
            name={item.name}
            icon={item.icon}
            image={item.image}
            productCount={item.productCount}
            onPress={() => {}}
          />
        )}
        horizontal
        // numColumns={3} // equivalente a grid-cols-2
        // columnWrapperStyle={styles.row} // para espaçamento entre colunas
        // contentContainerStyle={styles.container}
        style={{ marginRight: 16, marginLeft: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  row: {
    justifyContent: "space-between",
    marginBottom: 8, // espaçamento entre linhas
  },
});
