import { Text, View } from "react-native";
import React from "react";
import { styles } from "./style";

import { OutfitText } from "../OutfitText";

export default function Texto(props: { conteudo?: string }) {
  // Verifica se é string válida
  const conteudo = typeof props.conteudo === "string" ? props.conteudo : "";

  return (
    <View>
      <OutfitText style={styles.title}>{conteudo}</OutfitText>
    </View>
  );
}
