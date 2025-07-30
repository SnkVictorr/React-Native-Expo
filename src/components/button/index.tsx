import { View, Text, Pressable } from "react-native";
import React from "react";
import { styles } from "./style";
import { router } from "expo-router";

export default function Botao(props: { rota?: string, estilo?: object }) {
  const handleNext = () => {
    alert("Formulário enviado com sucesso!");
    router.navigate(props.rota);
  };
  return (
    <View>
      <Pressable
        onPress={handleNext}
        style={({ pressed }) => [
          styles.button,
          props.estilo,
          pressed ? styles.pressed : null,
        ]}
      >
        <Text style={styles.text}>Enviar</Text>
      </Pressable>
    </View>
  );
}
