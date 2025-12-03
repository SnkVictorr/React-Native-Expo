import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
} from "react-native";
import React, { use, useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { buscarProdutos } from "@/src/app/services/Search/get";
import { Produto } from "@/src/app/types/produto";
import { BASE_URL } from "@/src/app/config/api";
import colors from "@/src/app/styles/colors";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import stylesSearch from "../components/searchBar/style";
import BackButton from "../components/backButton";
import { OutfitText } from "../components/OutfitText";
import { QuicheMedium } from "../components/Quiche/quiche-medium";
import HeaderSearch from "../components/HeaderSearch";
export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  // ANIMAÇÃO DE APARIÇÃO
  function animateList() {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }

  useEffect(() => {
    async function fetchData() {
      if (query.trim().length === 0) {
        setResults([]);
        return;
      }

      setLoading(true);
      const data = await buscarProdutos(query);
      if (!data || !Array.isArray(data)) {
        setResults([]);
        return;
      }

      setResults(data || []);
      setLoading(false);

      animateList();
    }

    fetchData();
  }, [query]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* //🔍 SEARCHBAR FIXA NO TOPO */}

      <HeaderSearch query={query} setQuery={setQuery} />
      {/* LISTA DE RESULTADOS ANIMADA */}
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        {loading ? (
          <Text style={{ padding: 10 }}>Carregando...</Text>
        ) : (
          <FlatList
            // nestedScrollEnabled={true}
            data={results}
            keyExtractor={(item) => item.id_produto.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  padding: 12,
                  flexDirection: "row",

                  borderBottomWidth: 0.2,
                  borderBottomColor: colors.gray[700],
                }}
                onPress={() => router.push(`/productDetail/${item.id_produto}`)}
              >
                <View
                  style={{
                    padding: 3,
                    backgroundColor: "#fff",
                    borderRadius: 8,
                    marginRight: 10,
                  }}
                >
                  {" "}
                  <Image
                    source={{
                      uri: `${BASE_URL}/produtos/imagens/${item.imagem}`,
                    }}
                    style={{
                      width: 50,
                      height: 50,
                    }}
                  />
                </View>
                <View>
                  <OutfitText style={{ fontSize: 16, color: colors.gray[300] }}>
                    {item.produto}
                  </OutfitText>
                  <OutfitText
                    style={{
                      fontSize: 12,
                      color: colors.gray[500],
                      marginTop: 4,
                    }}
                  >
                    {item.marca}
                  </OutfitText>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </Animated.View>
    </SafeAreaView>
  );
}
