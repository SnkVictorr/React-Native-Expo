import React from "react";
import { View, StyleSheet } from "react-native";
import { AirbnbRating } from "react-native-ratings";

export default function Avaliacoes() {
  return (
    <View style={styles.container}>
      <AirbnbRating
        count={5} // número de estrelas
        defaultRating={3} // avaliação inicial
        size={40} // tamanho das estrelas
        showRating={false} // exibe texto "Ótimo", "Bom", etc
        onFinishRating={(rating) => console.log("Avaliação:", rating)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // fundo branco pra não "sumir"
  },
});
