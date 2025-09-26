import { Text, TouchableOpacity, View, Image, Pressable } from "react-native";
import React from "react";
import { styles } from "./style";
import { router } from "expo-router";
import RatingReadOnly from "../../productDetail/avaliacoes";
import colors from "@/src/app/styles/colors";
import { TextQuiche } from "../../quiche";

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
            // source={{
            //   uri: `http://192.168.1.2:8080/produtos/imagens/${imagem}`,
            // }}
            source={require("../../../../assets/images/violãoGewa.png")}
            style={styles.image}
            resizeMode="contain"
          />

          <RatingReadOnly value={5} size={10} />

          <TextQuiche style={styles.title} numberOfLines={2}>
            {nome}
          </TextQuiche>
          <View style={styles.infoContainer}>
            <TextQuiche style={styles.price}>{`R$${preco.toFixed(
              2
            )}`}</TextQuiche>
            <TextQuiche
              style={styles.precoComDesconto}
            >{`R$${precoComDesconto.toFixed(2)}`}</TextQuiche>
          </View>
        </View>
      </Pressable>
    </View>
  );
}
