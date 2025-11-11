import colors from "@/src/app/styles/colors";
import { Produto } from "@/src/app/types/produto";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function ProductTabs({produtosObj}: {produtosObj: Produto}) {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <View style={styles.container}>
      {/* Botões das Tabs */}
      <View style={styles.tabList}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "description" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("description")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "description" && styles.activeText,
            ]}
          >
            Descrição
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === "specs" && styles.activeTab]}
          onPress={() => setActiveTab("specs")}
        >
          <Text
            style={[styles.tabText, activeTab === "specs" && styles.activeText]}
          >
            Especificações
          </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "reviews" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("reviews")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "reviews" && styles.activeText,
            ]}
          >
            Avaliações
          </Text>
        </TouchableOpacity> */}
      </View>

      {/* Conteúdo das Tabs */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          backgroundColor: "#202020",
          padding: 12,
          borderBottomLeftRadius: 6,
          borderBottomRightRadius: 6,
        }}
      >
        {activeTab === "description" && (
          <Text style={styles.description}>
            {produtosObj.descricao}
          </Text>
        )}

        {activeTab === "specs" && (
          <Text style={styles.description}>
            {produtosObj.especificacoes?.replace(/\s\|\s/g, '\n')}
          </Text>
        )}

        {activeTab === "reviews" && (
          <Text style={{ color: "#aaa" }}>Aqui viriam as avaliações 😄</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
  tabList: {
    padding: 4,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,

    flexDirection: "row",

    backgroundColor: "#202020",
  },
  tabButton: {
    borderRadius: 6,
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: colors.background, // cor de destaque
  },
  tabText: {
    color: "#bbbbbb",
    fontWeight: "500",
  },
  activeText: {
    color: colors.principal,
    fontWeight: "700",
  },
  description: {
    color: "#ddd",
    lineHeight: 20,
    fontWeight: "500",
  },
  specRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#333",
  },
  specLabel: {
    fontWeight: "600",
    color: "#fff",
  },
  specValue: {
    color: "#aaa",
  },
});
