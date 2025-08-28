import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// import { Card } from "@/components/ui/card"; // seu componente Card já no RN
import { LucideIcon } from "lucide-react-native";

interface CategoryCardProps {
  name: string;
  icon: LucideIcon;
  image: string;
  productCount: number;
  onPress?: () => void;
}

export const CategoryItem = ({
  name,
  icon: Icon,
  image,
  productCount,
  onPress,
}) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <View style={styles.imageContainer}>
          {/* Background Image */}
          <Image source={image} style={styles.image} />

          {/* Gradient Overlay */}
          <LinearGradient
            colors={[
              "rgba(100,100,200,0.9)",
              "rgba(100,100,200,0.4)",
              "transparent",
            ]}
            style={StyleSheet.absoluteFill}
          />

          {/* Content */}
          <View style={styles.content}>
            <View style={styles.iconWrapper}>
              <Icon size={20} color="#00f" />
            </View>
            <View>
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.subtitle}>{productCount} produtos</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#222", // ajuste conforme seu tema
    margin: 8,
    elevation: 3, // sombra Android
    shadowColor: "#000", // sombra iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  imageContainer: {
    aspectRatio: 4 / 3,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  content: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconWrapper: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,255,0.2)",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  subtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
  },
});
