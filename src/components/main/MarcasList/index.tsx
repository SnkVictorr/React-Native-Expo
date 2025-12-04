import React from "react";
import { View, FlatList, Image, TouchableOpacity } from "react-native";
import { styles } from "./style";
import { OutfitText } from "../../OutfitText";
import VerTudo from "../VerTudo";
import { useRouter } from "expo-router";
import { marcas } from "@/src/app/data/marcas";


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
