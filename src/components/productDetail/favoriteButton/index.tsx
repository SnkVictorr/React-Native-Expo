import React, { useState, useRef } from "react";
import { TouchableOpacity, Animated, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "@/src/app/styles/colors";

export default function FavoriteButton() {
  const [favorited, setFavorited] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const toggleFavorite = () => {
    // Animated.sequence([
    //   Animated.timing(scaleAnim, {
    //     toValue: 1.3,
    //     duration: 200, // aumenta suavemente
    //     useNativeDriver: true,
    //   }),
    //   Animated.timing(scaleAnim, {
    //     toValue: 1,
    //     duration: 200, // volta suavemente
    //     useNativeDriver: true,
    //   }),
    // ]).start();

    setFavorited(!favorited);
  };

  return (
    <TouchableOpacity onPress={toggleFavorite} activeOpacity={0.8}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Ionicons
          name={favorited ? "heart" : "heart-outline"}
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
