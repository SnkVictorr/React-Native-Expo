import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "@/src/app/styles/colors";

type RatingReadOnlyProps = {
  value: number; // valor da nota (ex: 3.5)
  max?: number; // número máximo de estrelas (default 5)
  size?: number; // tamanho das estrelas
};

export default function RatingReadOnly({
  value,
  max = 5,
  size = 14,
}: RatingReadOnlyProps) {
  const renderStar = (star: number) => {
    if (value >= star) {
      return "star"; // cheia
    } else if (value + 0.5 >= star) {
      return "star-half"; // meia
    } else {
      return "star-outline"; // vazia
    }
  };

  return (
    <View style={styles.container}>
      {[...Array(max)].map((_, i) => (
        <Ionicons
          key={i}
          name={renderStar(i + 1) as any}
          size={size}
          color={colors.principal}
          style={styles.star}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  star: {
    marginHorizontal: 1.5,
  },
});
