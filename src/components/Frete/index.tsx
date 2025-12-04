import { Text, View } from "react-native";
import React, { Component, useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInputMask } from "react-native-masked-text";
import colors from "@/src/app/styles/colors";
import { OutfitText } from "../OutfitText";

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
    <View style={{ marginTop: 15 }}>
      <OutfitText
        style={{
          fontSize: 16,
          fontWeight: "500",
          marginTop: 2,
          color: colors.gray[300],
          marginLeft: 2,
        }}
      >
        Calcular Frete
      </OutfitText>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",

          borderColor: "#ccc",
          borderRadius: 6,
          backgroundColor: "#363535",
          paddingHorizontal: 8,
          marginTop: 8,
        }}
      >
        <MaterialIcons
          name="location-pin"
          size={22}
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
            paddingVertical: 8,
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
