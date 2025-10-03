import React from "react";
import { View, FlatList, Image, StyleSheet, Text } from "react-native";
import { styles } from "./style";
import { OutfitText } from "../../outfitText";
import VerTudo from "../verTudo";

const marcas = [
  { id: "1", src: require("@/assets/images/marcas/casio-logo.png") },
  { id: "2", src: require("@/assets/images/marcas/crafter-logo.png") },
  { id: "3", src: require("@/assets/images/marcas/DW-logo.png") },
  { id: "4", src: require("@/assets/images/marcas/Eagle-logo.png") },
  { id: "5", src: require("@/assets/images/marcas/Fender_logo.png") },
  {
    id: "6",
    src: require("@/assets/images/marcas/Gibson_Guitar_logo.svg.png"),
  },
  {
    id: "7",
    src: require("@/assets/images/marcas/henri-selmer-paris-logo.png"),
  },
  { id: "8", src: require("@/assets/images/marcas/Jupiter-logo.webp") },
  { id: "9", src: require("@/assets/images/marcas/King-logo.png") },
  { id: "10", src: require("@/assets/images/marcas/Korg_logo.png") },
  { id: "11", src: require("@/assets/images/marcas/logo_yamaha.png") },
  { id: "12", src: require("@/assets/images/marcas/Michael-logo.png") },
  { id: "13", src: require("@/assets/images/marcas/Pearl-logo.png") },
  { id: "14", src: require("@/assets/images/marcas/roland-logo.png") },
  {
    id: "15",
    src: require("@/assets/images/marcas/Steinway_and_Sons_logo.svg.png"),
  },
  { id: "16", src: require("@/assets/images/marcas/tagima-logo.png") },
  { id: "17", src: require("@/assets/images/marcas/Takamine_guitar_logo.png") },
  { id: "18", src: require("@/assets/images/marcas/Weril-logo.png") },
];

export default function MarcasList() {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <OutfitText
          style={{
            fontSize: 20,
            paddingLeft: 20,
            marginBottom: 18,

            textAlign: "left",
            color: "#e9e9e9",
          }}
        >
          Marcas de Qualidade
        </OutfitText>
        <VerTudo text="Ver todas" />
      </View>

      <FlatList
        data={marcas}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.src} style={styles.logo} resizeMode="contain" />
          </View>
        )}
        style={{ marginRight: 16, marginLeft: 16 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
