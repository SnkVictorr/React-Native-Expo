import { Text, View } from "react-native";
import React from "react";
import { styles } from "./style";

export default function Texto(props: {conteudo?: string}) {
  // Verifica se é string válida
  const conteudo = typeof props.conteudo === 'string' ? props.conteudo : "";
  
  return (
    <View>
      <Text style={styles.title}>{conteudo}</Text>
    </View>
  );
}