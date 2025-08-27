import { Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { styles } from "./style";
import { router } from "expo-router";

export default function ProductItem1({
  nome,
  preco,
  precoComDesconto,
  imagem,
}: {
  nome: string;
  preco: number;
  precoComDesconto: number;
  imagem: string;
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.ProductItem}>
        <View style={styles.content}>
          {" "}
          {/* <- AGORA COM flex: 1 */}
          <Image
            source={require("../../../../assets/images/Saxofone.webp")}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.title} numberOfLines={2}>
            {nome}
          </Text>
          <View style={styles.infoContainer}>
            <Text style={styles.price}>{`R$ ${preco.toFixed(2)}`}</Text>
            <Text
              style={styles.precoComDesconto}
            >{`R$ ${precoComDesconto.toFixed(2)}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
