import { Text, View, Image, FlatList } from "react-native";
import React from "react";
import { styles } from "./style";
import ProductItem1 from "../ProductItem1";
import { produtos } from "../../ProductData/data";
import getProducts from "@/src/app/services/products/get";

export default function ProductList({
  title,
  produtosObj,
}: {
  title?: string;
  produtosObj?: any;
}) {
  const [produtos, setProdutos] = React.useState([]);
  React.useEffect(() => {
    try {
      getProducts().then((data) => {
        setProdutos(data);
        console.log("Produtos carregados:");
      });
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  }, []);
  

  return (
    <View>
      <Text style={styles.title}>{title ? title : "Produtos em Destaque"}</Text>
      <FlatList
        style={styles.list} // Estilo da lista
        data={produtosObj ? produtosObj : produtos} // Onde os dados são passados como array na props data
        horizontal // para deixar a lista na posição horizontal
        showsHorizontalScrollIndicator={false} // para esconder a barra de rolagem
        keyExtractor={(item) => item.id_produto.toString()} // para extrair a chave de cada item
        renderItem={({ item }) => (
          <ProductItem1
            id={item.id_produto}
            nome={item.produto}
            preco={item.preco}
            imagem={item.imagem}
            precoComDesconto={item.preco - item.desconto}
          />
        )} // para renderizar cada item da lista
      />
    </View>
  );
}
