// components/botao/index.tsx
import { View, Text, Pressable, StyleProp, ViewStyle } from "react-native";
import React from "react";
import { styles } from "./style";
import { router } from "expo-router";

interface BotaoProps {
  rota?: string; // Rota para navegar
  estilo?: StyleProp<ViewStyle>; // Estilo adicional para o botão
  texto?: string; // Texto que aparece no botão
  mensagem?: string; // Mensagem opcional do alerta
}

export default function Botao({ 
  rota , 
  estilo, 
  texto , 
  mensagem 
}: BotaoProps) {
  
  const handleNext = () => {
    if (mensagem) {
      alert(mensagem);
    }
    router.navigate(rota);
  };

  return (
    <View>
      <Pressable
        onPress={handleNext}
        style={({ pressed }) => [
          styles.button,
          estilo,
          pressed ? styles.pressed : null,
        ]}
      >
        <Text style={styles.text}>{texto}</Text>
      </Pressable>
    </View>
  );
}
