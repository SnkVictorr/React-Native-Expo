import { Text, View, Image, FlatList } from "react-native";
import React from "react";
import { styles } from "./style";
import ProductItem1 from "../ProductItem1";
// import { produtos } from "../../ProductData/data";

interface Produto {
  id_produto: number;
  produto: string;
  preco: number;
  desconto: number;
  imagem: string;
}

export default function ProductList() {
  const [produtos, setProdutos] = React.useState([]);
  React.useEffect(() => {
<<<<<<< HEAD
    fetch("http://10.63.45.59:8080/produtos", {
=======
    fetch("http://10.63.45.25:8080/produtos", {
>>>>>>> 9ad5877d7ae266594af179aa4e07a062dd2dfb68
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "stNOJvYxgbX3bRg3CEGMTNiqnIO3TMMHPi8K3ehLzk3KqcN3tJbDnBdMwWvAj84r2fiKvaAxQC58i1BsR5iqjBzzscwMudNv8xL6",
      },
    })
<<<<<<< HEAD
      .then((response) => response.json())
      .then((data) => setProdutos(data.data))
      .catch((error) => console.error(error));
=======
      .then((response) => response.json()) //converte a resposta para json
      .then((data) => setProdutos(data)) //pega o objeto DATA do JSON
      .catch((error) => console.error("Erro ao buscar dados:", error));
>>>>>>> 9ad5877d7ae266594af179aa4e07a062dd2dfb68
  }, []);

  // teste pra ver se os produtos estão sendo carregados

  console.log(produtos);
  return (
    <View>
      <Text style={styles.title}>Produtos em Destaque</Text>
      <FlatList
        style={styles.list} // Estilo da lista
        data={produtos} // Onde os dados são passados como array na props data
        horizontal // para deixar a lista na posição horizontal
        showsHorizontalScrollIndicator={false} // para esconder a barra de rolagem
        keyExtractor={(item) => item.id_produto.toString()} // para extrair a chave de cada item
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
