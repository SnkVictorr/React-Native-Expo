import { Text, View, Image, FlatList } from "react-native";
import React from "react";
import { styles } from "./style";
import ProductItem1 from "../ProductItem1";
import { produtos } from "../../ProductData/data";


export default function ProductList({ title }: { title: string }) {
  // const [produtos, setProdutos] = React.useState<Produto[]>([]);
  // React.useEffect(() => {
  //   fetch("http://10.63.45.25:8080/produtos", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization:
  //         "DAenvhY03Rm2xspRZUmmKrj4PyzUNT4QjjVgK9XChTOe2yntmo9Rqbna7NcAVn2oPrZXoK8oRox6btrCuq59bdoXYaYBX8QVFcJj",
  //     },
  //   })
  //     .then((response) => response.json()) //converte a resposta para json
  //     .then((data) => setProdutos(data.data)) //pega o objeto DATA do JSON
  //     .catch((error) => console.error(error));
  // }, []);

  return (
    <View>
      <Text style={styles.title}>{title ? title : "Produtos em Destaque"}</Text>
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
