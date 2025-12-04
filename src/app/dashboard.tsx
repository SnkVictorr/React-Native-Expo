import { View, Image, StyleSheet } from "react-native";
import React from "react";
import Texto from "../components/texto";
import Botao from "../components/button";
import VideoComponent from "../components/Video";

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require("../../assets/images/logo-gold.png")}
          style={styles.imagem}
        />
        <Texto conteudo="HarmoniX" />
        <View style={styles.botaoContainer}>
          <Botao texto="Entrar" estilo={styles.botao} rota="/login" />
          <Botao texto="Cadastrar" estilo={styles.botao} rota="/cadastreSe" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // ocupa a tela toda
    justifyContent: "center", // centraliza verticalmente
    alignItems: "center", // centraliza horizontalmente
    backgroundColor: "#f5f5f5",
  },
  card: {
    alignItems: "center",
    width: "85%",
    backgroundColor: "#ffffffee",
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    elevation: 5, // sombra Android
    shadowColor: "#000", // sombra iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  imagem: {
    height: 90,
    width: 90,
    marginBottom: 15,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#d4a017", // tom dourado
    marginBottom: 25,
  },
  botaoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  botao: {
    backgroundColor: "#d4a017",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 8,
    minWidth: 120, // <-- AQUI
    alignItems: "center",
  },
});
