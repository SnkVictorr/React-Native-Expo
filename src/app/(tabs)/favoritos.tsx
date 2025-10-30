import { FlatList, Text, View } from "react-native";
import React, { Component, use, useEffect } from "react";
import colors from "../styles/colors";
import HeaderBack from "@/src/components/HeaderBack";
import ProductList from "@/src/components/main/ProductList1";
import { styles } from "../products/style";
// import { produtos } from "@/src/components/ProductData/data";
import ProductItem1 from "@/src/components/main/ProductItem1";
import { SafeAreaView } from "react-native-safe-area-context";

import { FavoritosService } from "../services/models/FavoritosService";
import { Produto } from "../types/produto";

export default function Favoritos({}) {
  const [produtos, setProdutos] = React.useState<Produto[]>([]);

  const _favoritosService = new FavoritosService();
  const clienteId = 8; // ID do cliente
  // logado (exemplo estático)
  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        const data = await _favoritosService.getByClienteId(clienteId);
        setProdutos(data);
        console.log(data);
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
