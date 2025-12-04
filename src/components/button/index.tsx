import { View, Text, Pressable, StyleProp, ViewStyle } from "react-native";
import React from "react";
import { styles } from "./style";
import { router } from "expo-router";
import { OutfitText } from "../OutfitText";

interface BotaoProps {
  rota?: any;
  estilo?: StyleProp<ViewStyle>;
  texto?: string;
  mensagem?: string;
}

export default function Botao({ rota, estilo, texto, mensagem }: BotaoProps) {
  const handleNext = async () => {
    try {
      console.log("Botão pressionado:", { texto, rota, mensagem });

      if (mensagem) {
        alert(mensagem);
        return;
      }

      if (!rota) {
        console.warn("Nenhuma rota definida para o botão");
        return;
      }

      console.log("Tentando navegar para:", rota);

      // Verifica se podemos navegar
      if (router.canGoBack()) {
        router.navigate(rota);
      } else {
        router.replace(rota);
      }
    } catch (error) {
      console.error("Erro ao navegar:", error);
      alert("Erro de navegação. Verifique se a rota existe.");
    }
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
        <OutfitText style={styles.text}>{texto || "Botão"}</OutfitText>
      </Pressable>
    </View>
  );
}
