import { Text, TouchableOpacity, View, Image, Pressable } from "react-native";
import React from "react";
import { styles } from "./style";
import { router } from "expo-router";
import RatingReadOnly from "../../productDetail/avaliacoes";
import colors from "@/src/app/styles/colors";
import { TextQuiche } from "../../Quiche";
import { QuicheBold } from "../../Quiche/quiche-bold";
import formatter from "@/src/app/utils/formatadorDeMoeda";
import { BASE_URL } from "@/src/app/config/api";
export default function ProductItem1({
  id,
  nome,
  preco,
  precoComDesconto,
  imagem,
  newStyles,
  productItemStyle,
}: {
  id: number;
  nome: string;
  preco: number;
  precoComDesconto: number;
  imagem: string;
  newStyles?: object;
  productItemStyle?: object;
}) {
  return (
    <View style={styles.container && newStyles}>
      <Pressable
        style={[styles.ProductItem, productItemStyle]}
        onPress={() => router.push(`/productDetail/${id}`)}
      >
        <View style={styles.content}>
          {/* <- AGORA COM flex: 1 */}
          <Image
            source={{ uri: `${BASE_URL}/produtos/imagens/${imagem}` }}
            style={styles.image}
            resizeMode="contain"
          />

          <RatingReadOnly value={5} size={10} />

          <QuicheBold style={styles.title} numberOfLines={2}>
            {" "}
            {nome}
          </QuicheBold>
          <View style={styles.infoContainer}>
            <TextQuiche style={styles.price}>{`${formatter.format(
              preco
            )}`}</TextQuiche>
            <QuicheBold style={styles.precoComDesconto}>{`${formatter.format(
              precoComDesconto
            )}`}</QuicheBold>
          </View>
        </View>
      </Pressable>
    </View>
  );
}
