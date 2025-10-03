import { Text, View, Image, FlatList } from "react-native";
import React from "react";
import { styles } from "./style";
import ProductItem1 from "../ProductItem1";
import getProducts from "../../../app/services/products/get";
import { produtos as produtoData } from "../../ProductData/data";
import VerTudo from "../verTudo";

interface Produto {
  id_produto: number;
  produto: string;
  preco: number;
  desconto: number;
  imagem: string;
}

export default function ProductList() {
  //   const [produtos, setProdutos] = React.useState<Produto[]>([]);
  //   React.useEffect(() => {
  //     const fetchProdutos = async () => {
  //       const produtos = await getProducts();
  //       setProdutos(produtos);
  //     };
  //     fetchProdutos();
  //   }, []);

  //   // teste pra ver se os produtos estão sendo carregados

  //   console.log(produtos);
  const produtos: Produto[] = produtoData;
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 20,
          paddingLeft: 20,
        }}
      >
        <Text style={styles.title}>Produtos em Destaque</Text>
        <VerTudo text="Ver todos" />
      </View>

      <FlatList
        style={styles.list} // Estilo da lista
        data={produtos} // Onde os dados são passados como array na props data
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
