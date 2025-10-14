import { FlatList, Text, View } from "react-native";
import React, { Component } from "react";
import colors from "../styles/colors";
import HeaderBack from "@/src/components/HeaderBack";
import ProductList from "@/src/components/main/ProductList1";
import { styles } from "../products/style";
import { produtos } from "@/src/components/ProductData/data";
import ProductItem1 from "@/src/components/main/ProductItem1";

export default function Favoritos({}) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <HeaderBack text="Favoritos" />

      <FlatList
        style={styles.list} // Estilo da lista
        data={produtos} // Onde os dados são passados como array na props data
        showsHorizontalScrollIndicator={false} // para esconder a barra de rolagem
        keyExtractor={(item) => item.id_produto.toString()} // para extrair a chave de cada item
        numColumns={2}
        renderItem={({ item }) => (
          <ProductItem1
            id={item.id_produto}
            nome={item.produto}
            preco={item.preco}
            imagem={item.imagem}
            precoComDesconto={item.preco - item.desconto}
            newStyles={{
              marginBottom: 10,
              alignItems: "center",
              flex: 1,
            }}
            productItemStyle={{ width: "95%", marginRight: 0 }}
          />
        )} // para renderizar cada item da lista
      />
    </View>
  );
}
