import React from "react";
import { View, FlatList, Image, TouchableOpacity } from "react-native";
import { styles } from "./style";
import { OutfitText } from "../../OutfitText";
import VerTudo from "../VerTudo";
import { useRouter } from "expo-router";

const marcas = [
  {
    id_marca: "1",
    src: require("@/assets/images/marcas/casio-logo.png"),
    name: "Casio",
  },
  {
    id_marca: "2",
    src: require("@/assets/images/marcas/crafter-logo.png"),
    name: "Crafter",
  },
  {
    id_marca: "3",
    src: require("@/assets/images/marcas/DW-logo.png"),
    name: "DW",
  },
  {
    id_marca: "4",
    src: require("@/assets/images/marcas/Eagle-logo.png"),
    name: "Eagle",
  },
  {
    id_marca: "5",
    src: require("@/assets/images/marcas/Fender_logo.png"),
    name: "Fender",
  },
  {
    id_marca: "6",
    src: require("@/assets/images/marcas/Gibson_Guitar_logo.svg.png"),
    name: "Gibson",
  },
  {
    id_marca: "7",
    src: require("@/assets/images/marcas/henri-selmer-paris-logo.png"),
    name: "Henri Selmer Paris",
  },
  {
    id_marca: "8",
    src: require("@/assets/images/marcas/Jupiter-logo.webp"),
    name: "Jupiter",
  },
  {
    id_marca: "9",
    src: require("@/assets/images/marcas/King-logo.png"),
    name: "King",
  },
  {
    id_marca: "10",
    src: require("@/assets/images/marcas/Korg_logo.png"),
    name: "Korg",
  },
  {
    id_marca: "11",
    src: require("@/assets/images/marcas/logo_yamaha.png"),
    name: "Yamaha",
  },
  {
    id_marca: "12",
    src: require("@/assets/images/marcas/Michael-logo.png"),
    name: "Michael",
  },
  {
    id_marca: "13",
    src: require("@/assets/images/marcas/Pearl-logo.png"),
    name: "Pearl",
  },
  {
    id_marca: "14",
    src: require("@/assets/images/marcas/roland-logo.png"),
    name: "Roland",
  },
  {
    id_marca: "15",
    src: require("@/assets/images/marcas/Steinway_and_Sons_logo.svg.png"),
    name: "Steinway and Sons",
  },
  {
    id_marca: "16",
    src: require("@/assets/images/marcas/tagima-logo.png"),
    name: "Tagima",
  },
  {
    id_marca: "17",
    src: require("@/assets/images/marcas/Takamine_guitar_logo.png"),
    name: "Takamine",
  },
  {
    id_marca: "18",
    src: require("@/assets/images/marcas/Weril-logo.png"),
    name: "Weril",
  },
];

export default function MarcasList() {
  const router = useRouter();
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
        keyExtractor={(item) => item.id_marca}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/ProdutosFiltradosPage",
                params: {
                  id_marca: item.id_marca || "",
                  title: item.name || "",
                },
              })
            }
          >
            <Image source={item.src} style={styles.logo} resizeMode="contain" />
          </TouchableOpacity>
        )}
        style={{ marginRight: 16, marginLeft: 16 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
