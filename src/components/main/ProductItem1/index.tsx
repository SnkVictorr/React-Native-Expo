import { Text, TouchableOpacity, View, Image, Pressable } from "react-native";
import React from "react";
import { styles } from "./style";
import { router } from "expo-router";

export default function ProductItem1({
  id,
  nome,
  preco,
  precoComDesconto,
  imagem,
}: {
  id: number;
  nome: string;
  preco: number;
  precoComDesconto: number;
  imagem: string;
}) {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.ProductItem}
        onPress={() => router.push(`/productDetail/${id}`)}
      >
        <View style={styles.content}>
          {" "}
          {/* <- AGORA COM flex: 1 */}
          <Image
            // source={{
            //   uri: `http://192.168.1.2:8080/produtos/imagens/${imagem}`,
            // }}
            source={require("../../../../assets/images/violãoGewa.png")}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.title} numberOfLines={2}>
            {nome}
          </Text>
          <View style={styles.infoContainer}>
            <Text style={styles.price}>{`R$ ${preco}`}</Text>
            <Text
              style={styles.precoComDesconto}
            >{`R$ ${precoComDesconto}`}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}
