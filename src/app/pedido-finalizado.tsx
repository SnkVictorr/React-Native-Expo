import { View, Text, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";
import { BackHandler } from "react-native";
import { OutfitText } from "../components/OutfitText";
import colors from "./styles/colors";
export default function PedidoFinalizado() {
  useEffect(() => {
    const backAction = () => {
      router.replace("/(tabs)/main"); // 👈 Redireciona para a tela inicial
      return true; // 👈 Impede o comportamento padrão (voltar)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#0d0d0d",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <LottieView
        source={require("@/assets/animations/success.json")}
        autoPlay
        loop={false}
        style={{ width: 200, height: 200, marginBottom: 20 }}
      />
      OutfitText
      <OutfitText
        style={{
          fontSize: 24,
          color: "#fff",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Pedido Confirmado! 🎉
      </OutfitText>
      <OutfitText
        style={{
          fontSize: 16,
          color: "#ccc",
          textAlign: "center",
          marginTop: 10,
          marginBottom: 30,
          lineHeight: 22,
        }}
      >
        Obrigado pela compra! Seu pedido está sendo preparado e em breve você
        receberá atualizações.
      </OutfitText>
      <TouchableOpacity
        onPress={() => router.replace("/(tabs)/main")}
        style={{
          backgroundColor: "#c7a315",
          paddingVertical: 14,
          paddingHorizontal: 30,
          borderRadius: 10,
        }}
      >
        <OutfitText
          style={{ fontSize: 16, color: colors.gray[100], fontWeight: "bold" }}
        >
          Voltar ao Início
        </OutfitText>
      </TouchableOpacity>
    </View>
  );
}
