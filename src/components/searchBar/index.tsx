import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Component, useEffect, useState } from "react";
import styles from "./style";
import { Ionicons } from "@expo/vector-icons";
import buscarProdutos from "@/src/app/services/Search/get";
import { Produto } from "@/src/app/types/produto";
export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      if (query.trim().length === 0) {
        setResults([]);
        return;
      }

      setLoading(true);
      const data = await buscarProdutos(query);
      setResults(data || []);
      setLoading(false);
    }

    fetchData();
  }, [query]);
  return (
    <View>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <TextInput
            placeholder="Buscar produtos..."
            placeholderTextColor="#888"
            style={styles.searchInput}
            onChange={(e) => setQuery(e.nativeEvent.text)}
          />
          <Ionicons name="search" size={20} color="#888" />
        </View>
      </View>
      {/* LISTA DE RESULTADOS */}
      {query.length > 0 && (
        <View
          style={{ marginTop: 10, backgroundColor: "#fff", borderRadius: 8 }}
        >
          {loading ? (
            <Text style={{ padding: 10 }}>Carregando...</Text>
          ) : (
            <FlatList
            // nestedScrollEnabled={true}
              data={results}
              keyExtractor={(item) => item.id_produto.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={{ padding: 12 }}>
                  <Text style={{ fontSize: 16 }}>{item.produto}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      )}
    </View>
  );
}
