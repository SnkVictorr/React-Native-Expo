import React, { useState, useRef, useEffect } from "react";
import { TouchableOpacity, Animated, StyleSheet, Easing } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "@/src/app/styles/colors";

export default function FavoriteButton({
  productId,
  clienteId,
}: {
  productId: number | string;
  clienteId: number | string;
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const API_URL = "http://localhost:8080/favoritos";

  // const toggleFavorite = () => {
  //   // Animated.sequence([
  //   //   Animated.timing(scaleAnim, {
  //   //     toValue: 1.3,
  //   //     duration: 200, // aumenta suavemente
  //   //     useNativeDriver: true,
  //   //   }),
  //   //   Animated.timing(scaleAnim, {
  //   //     toValue: 1,
  //   //     duration: 200, // volta suavemente
  //   //     useNativeDriver: true,
  //   //   }),
  //   // ]).start();

  //   setFavorited(!favorited);
  // };

  const toggleFavorite = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "stNOJvYxgbX3bRg3CEGMTNiqnIO3TMMHPi8K3ehLzk3KqcN3tJbDnBdMwWvAj84r2fiKvaAxQC58i1BsR5iqjBzzscwMudNv8xL6",
        },
        body: JSON.stringify({ cliente_id: 1, id_produto: 1 }),
      });
      const result = await res.json();

      if (result.status === "added") setIsFavorite(true);
      if (result.status === "removed") setIsFavorite(false);
    } catch (err) {
      console.error("Erro ao atualizar favorito:", err);
    }
  };

  return (
    <TouchableOpacity onPress={toggleFavorite} activeOpacity={0.8}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Ionicons
          name={isFavorite ? "heart" : "heart-outline"}
          size={35}
          color={colors.principal}
          style={styles.icon}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 20,
  },
});
