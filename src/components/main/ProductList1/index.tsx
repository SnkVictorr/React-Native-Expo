import { Text, View, Image, FlatList } from "react-native";
import React from "react";
import { styles } from "./style";
import ProductItem1 from "../ProductItem1";
// import { produtos } from "../../ProductData/data";

export default function ProductList() {
  const [produtos, setProdutos] = React.useState([]);
  React.useEffect(() => {
    fetch("http://localhost:8080/produtos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "stNOJvYxgbX3bRg3CEGMTNiqnIO3TMMHPi8K3ehLzk3KqcN3tJbDnBdMwWvAj84r2fiKvaAxQC58i1BsR5iqjBzzscwMudNv8xL6",
      },
    })
      .then((response) => response.json())
      .then((data) => setProdutos(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <View>
      <Text style={styles.title}>Produtos em Destaque</Text>
      <FlatList
        style={styles.list} // Estilo da lista
        data={produtos} // Onde os dados são passados como array na props data
        horizontal // para deixar a lista na posição horizontal
        showsHorizontalScrollIndicator={false} // para esconder a barra de rolagem
        keyExtractor={(item) => item.idProduto.toString()} // para extrair a chave de cada item
        renderItem={({ item }) => (
          <ProductItem1
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
