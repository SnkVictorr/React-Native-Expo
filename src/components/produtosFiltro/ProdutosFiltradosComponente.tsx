import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { Component, useEffect, useState } from "react";
import SearchBar from "@/src/components/searchBar";
import getProducts from "@/src/app/services/products/get";
import { Produto } from "@/src/app/types/produto";
import { styles as styles2 } from "@/src/components/main/ProductList1/style";
import { styles } from "./style";
import stylesSearch from "../searchBar/style";
import ProductItem1 from "@/src/components/main/ProductItem1";
import { NonBinary, Scroll } from "lucide-react-native";
import { produtos as produtosData } from "@/src/components/ProductData/data";

import colors from "@/src/app/styles/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { QuicheBold } from "../Quiche/quiche-bold";
import BackButton from "../backButton";
import { Ionicons } from "@expo/vector-icons";
export default function ProdutosFiltradosComponente({
  id_principal,
  id_marca,
  title,
}: {
  id_principal: string | string[];
  id_marca: string | string[];
  title: string | string[];
}) {
  const [loading, setLoading] = useState(true);
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    async function load() {
      setLoading(true);

      try {
        const data = await getProducts({
          id_principal: id_principal as string,
          id_marca: id_marca as string,
        });
        setProdutos(Array.isArray(data) ? data : []);
      } catch (err) {
        console.log("Erro:", err);
      }

      setLoading(false);
    }

    load();
  }, [id_principal, id_marca]);

  const formatData = (data: any, numColumns: number) => {
    if (!Array.isArray(data) || data.length === 0) return [];
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let lastRowElements = data.length - numberOfFullRows * numColumns;

    while (lastRowElements !== numColumns && lastRowElements !== 0) {
      data.push({ id_produto: `blank-${lastRowElements}`, empty: true });
      lastRowElements++;
    }

    return data;
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (produtos.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{ color: colors.gray[200], fontSize: 15, textAlign: "center" }}
        >
          Nenhum produto encontrado nessa opção.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.background, flex: 1 }}
      edges={["top"]}
    >
      {produtos.length > 0 && (
        <FlatList
          style={[styles.list]}
          data={formatData(produtos || [], 2)}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          keyExtractor={(item) => item.id_produto.toString()}
          numColumns={2}
          columnWrapperStyle={{ paddingHorizontal: 15 }}
          ListHeaderComponent={
            <>
              <View style={stylesSearch.searchContainer}>
                <BackButton cor={colors.gray[400]} />
                <Pressable style={stylesSearch.searchBar}>
                  <TextInput
                    placeholder="Buscar produtos..."
                    placeholderTextColor="#888"
                    style={stylesSearch.searchInput}
                    editable={false}
                    pointerEvents="none"
                  />
                  <Ionicons name="search" size={20} color="#888" />
                </Pressable>
              </View>
              <Text
                style={{
                  fontSize: 22,
                  color: colors.gray[200],
                  marginBottom: 15,
                  marginTop: 15,
                  paddingHorizontal: 20,
                  textAlign: "center",
                }}
              >
                {title}
              </Text>
            </>
          }
          renderItem={({ item }) =>
            item.empty ? (
              <View style={{ flex: 1, marginBottom: 10 }} />
            ) : (
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
                productItemStyle={{ width: "95%" }}
              />
            )
          }
        />
      )}
    </SafeAreaView>
  );
}
