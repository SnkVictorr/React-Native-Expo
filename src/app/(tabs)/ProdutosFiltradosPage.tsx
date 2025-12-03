import { Text, View } from "react-native";
import React, { Component } from "react";
import ProdutosFiltradosComponente from "@/src/components/produtosFiltro/ProdutosFiltradosComponente";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function ProdutosFiltradosPage() {
  const router = useRouter();
  const { id_principal, id_marca, title } = useLocalSearchParams();
  console.log("Route params:", id_principal);
  return (
    <View style={{ flex: 1, backgroundColor: "#1a1a1a" }}>
      <ProdutosFiltradosComponente
        id_principal={id_principal}
        id_marca={id_marca}
        title={title}
      />
    </View>
  );
}
