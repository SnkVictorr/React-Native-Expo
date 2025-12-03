import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Card } from "../../ui/card";
import { QuicheMedium } from "../../Quiche/quiche-medium";
import { useRouter } from "expo-router";

type RootStackParamList = {
  ProdutosFiltradosPage: { title: string; idPrincipal: number };
};

interface CategoryCardProps {
  name: string;
  icon: any; // pode ser um require ou { uri: 'url' }
  image: any; // pode ser um require ou { uri: 'url' }
  productCount: number;
  id_principal?: number;
}

export const CategoryItem = ({
  name,
  icon,
  image,
  productCount,
  id_principal,
}: CategoryCardProps) => {
  const router = useRouter();
  return (
    <Card style={styles.card}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          router.push({
            pathname: "/ProdutosFiltradosPage",
            params: { id_principal: id_principal || "", title: name || "" },
          })
        }
      >
        <View style={styles.imageContainer}>
          {/* Background Image */}
          <Image source={image} style={styles.image} />

          <LinearGradient
            colors={["rgba(0, 0, 0, 0.9)", "rgba(0, 0, 0, 0.4)", "transparent"]}
            start={{ x: 0.5, y: 1 }} // começa embaixo
            end={{ x: 0.5, y: 0 }} // termina em cima
            style={StyleSheet.absoluteFillObject}
          />
          {/* Content */}
          <View style={styles.content}>
            <View style={styles.iconWrapper}>
              <Image
                source={icon}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: "rgba(238, 189, 43, 0.9)", // muda a cor do PNG
                }}
                resizeMode="contain"
              />

              {/* <Icon size={20} color="rgba(238, 189, 43, 0.9)" /> */}
            </View>
            <View>
              <QuicheMedium style={styles.title}>{name}</QuicheMedium>
              <QuicheMedium style={styles.subtitle}>
                {productCount} produtos
              </QuicheMedium>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 300,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#222", // ajuste conforme seu tema
    marginRight: 12,
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
    backgroundColor: "rgba(238, 189, 43, 0.116)",
  },
  title: {
    fontSize: 16,
    // fontWeight: "600",
    color: "#fff",
  },
  subtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
  },
});
