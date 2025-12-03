import { Text, View } from "react-native";
import React, { Component, useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInputMask } from "react-native-masked-text";
import colors from "@/src/app/styles/colors";

export default function Frete() {
  const [cep, setCep] = useState<string>("");
  const [freteData, setFreteData] = useState<any>(null);

  useEffect(() => {
    const fetchFrete = async () => {
      if (cep.length < 8) return; // evita requisições desnecessárias
      try {
        const response = await fetch(
          `http://localhost:8080/frete/frete.php?cep=${cep}`
        );
        const data = await response.json();
        setFreteData(data);
        console.log(data);
      } catch (error) {
        console.error("Erro ao consultar frete:", error);
      }
    };

    fetchFrete();
  }, [cep]);
  console.log(freteData);

  return (
    <View style={{ marginTop: 20 }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          marginTop: 2,
          color: colors.white,
          marginLeft: 2,
        }}
      >
        Consultar Frete
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",

          borderColor: "#ccc",
          borderRadius: 6,
          backgroundColor: "#363535",
          paddingHorizontal: 8,
          marginTop: 12,
        }}
      >
        <MaterialIcons
          name="location-pin"
          size={24}
          color={colors.principal}
          style={{ marginRight: 4 }}
        />
        <TextInputMask
          maxLength={9}
          type="zip-code"
          // type={"custom"}
          // options={{
          //   mask: "99999-999",
          // }}
          keyboardType="numeric"
          value={cep}
          onChangeText={setCep}
          placeholder="Digite seu CEP"
          placeholderTextColor="#aaa"
          style={{
            flex: 1,
            color: "#fff",
            paddingVertical: 10,
          }}
        />
      </View>
      {freteData && (
        <Text style={{ color: "#fff", marginTop: 10 }}>
          Frete: {freteData.valor ? `R$ ${freteData.valor}` : "não encontrado"}
        </Text>
      )}
    </View>
  );
}
