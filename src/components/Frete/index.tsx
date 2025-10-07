import { Text, View } from "react-native";
import React, { Component, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { TextInputMask } from "react-native-masked-text";
import colors from "@/src/app/styles/colors";

export default function Frete() {
  const [cep, setCep] = useState("");
  return (
    <View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          marginTop: 12,
          color: colors.white,
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
          backgroundColor: "#333",
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
    </View>
  );
}
