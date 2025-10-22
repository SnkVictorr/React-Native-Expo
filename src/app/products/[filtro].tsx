import { FlatList, ScrollView, Text, View } from "react-native";
import React, { Component } from "react";
import SearchBar from "@/src/components/searchBar";
import getProducts from "../services/products/get";
import { Produto } from "../types/produto";
import { styles as styles2 } from "@/src/components/main/ProductList1/style";
import { styles } from "./style";
import ProductItem1 from "@/src/components/main/ProductItem1";
import { Scroll } from "lucide-react-native";
import { produtos as produtosData } from "@/src/components/ProductData/data";
import { useLocalSearchParams } from "expo-router";
import colors from "../styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductsMarcas: React.FC = () => {
  const { param } = useLocalSearchParams();

  const [produtos, setProdutos] = React.useState<Produto[]>(produtosData);

  // React.useEffect(() => {
  //   const fetchProdutos = async () => {
  //     // Importe ou defina getProducts conforme necessário
  //     const produtos = await getProducts();
  //     setProdutos(produtos);
  //   };
  //   fetchProdutos();
  // }, []);
  // console.log(produtos);

  return (
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    <View style={{ backgroundColor: colors.background, paddingTop: 40 }}>
      <ScrollView>
        <SearchBar />
        <Text
          style={[styles2.title, { paddingBottom: 5, alignSelf: "center" }]}
        >
          Produtos
        </Text>
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
      </ScrollView>
    </View>
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    <ScrollView style={{ backgroundColor: colors.background, paddingTop: 50 }}>
      <SearchBar />
      <Text style={[styles2.title, { paddingBottom: 10, paddingLeft: 15 }]}>
        Produtos
      </Text>
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
            productItemStyle={{ width: 190 }}
          />
        )} // para renderizar cada item da lista
      />
    </ScrollView>
>>>>>>> Stashed changes
  );
};

export default ProductsMarcas;
