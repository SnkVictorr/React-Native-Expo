import React, { useState, useRef, useEffect } from "react";
import { TouchableOpacity, Animated, StyleSheet, Easing } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "@/src/app/styles/colors";
import { FavoritosService } from "@/src/app/services/models/FavoritosService";

export default function FavoriteButton({
  productId,
  clienteId,
}: {
  productId: number | string;
  clienteId: number | string;
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const _favoritosService = new FavoritosService();

  useEffect(() => {
    let isMounted = true; // Para evitar erro de atualização se o componente desmontar
    const checkFavoriteStatus = async () => {
      try {
        const listaFavoritos = await _favoritosService.getByClienteId(
          Number(clienteId)
        );
        if (isMounted && listaFavoritos) {
          const data = listaFavoritos.map((produto) => produto.id_produto);
          console.log("Favoritos carregados:", data);
          setIsFavorite(data.includes(Number(productId)));
        }
      } catch (err) {
        console.error("Erro ao carregar favoritos:", err);
      }
    };
    if (clienteId && productId) {
      checkFavoriteStatus();
    }
    return () => {
      isMounted = false;
    };
  }, [productId, clienteId]);
  console.log("isFavorite:", isFavorite);

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
    // UI Optimistic Update: Muda a cor imediatamente para o usuário não esperar o banco
    const previousState = isFavorite;
    setIsFavorite(!previousState);
    try {
      const result = await _favoritosService.switchFavorite({
        cliente_id: clienteId,
        id_produto: productId,
      });
      // Confirmação do banco (opcional, pois já mudamos visualmente antes)
      if (result.status === "added") setIsFavorite(true);
      if (result.status === "removed") setIsFavorite(false);
    } catch (err) {
      // Se der erro, desfaz a mudança visual
      setIsFavorite(previousState);
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
    right: 15,
    bottom: -10,
  },
});
