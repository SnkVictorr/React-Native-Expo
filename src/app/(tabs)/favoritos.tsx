import { FlatList, Text, View } from "react-native";
import React, { Component, use, useEffect } from "react";
import colors from "../styles/colors";
import HeaderBack from "@/src/components/HeaderBack";
import ProductList from "@/src/components/main/ProductList1";
import { styles } from "../products/style";
// import { produtos } from "@/src/components/ProductData/data";
import ProductItem1 from "@/src/components/main/ProductItem1";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Favoritos({}) {
  const API_URL = "http://localhost:8080/favoritos";
  const [produtos, setProdutos] = React.useState();
  const clienteId = "8"; // ID do cliente logado (exemplo estático)
  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        const response = await fetch(`${API_URL}?cliente_id=${clienteId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "stNOJvYxgbX3bRg3CEGMTNiqnIO3TMMHPi8K3ehLzk3KqcN3tJbDnBdMwWvAj84r2fiKvaAxQC58i1BsR5iqjBzzscwMudNv8xL6",
          },
        });
        const favoritos = await response.json(); // array de produto_id
        setProdutos(favoritos.data);
        console.log(favoritos);
      } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
      }
    };

    fetchFavoritos();
  }, []);
  console.log(produtos);
  return (
    <View
      style={{
        backgroundColor: colors.background,
        flex: 1,
      }}
    >
      <HeaderBack text="Favoritos" />

      <FlatList
        style={[styles.list]} // Estilo da lista
        data={produtos} // Onde os dados são passados como array na props data
        showsHorizontalScrollIndicator={false} // para esconder a barra de rolagem
        keyExtractor={(item) => item.id_produto} // para extrair a chave de cada item
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
            productItemStyle={{
              width: "95%",
              marginRight: 0,
            }}
          />
        )} // para renderizar cada item da lista
      />
    </View>
  );
}
