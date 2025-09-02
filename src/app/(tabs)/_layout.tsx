import { Tabs } from "expo-router";
import { View, Image, Text, StyleSheet, Animated } from "react-native";
import { useEffect, useRef } from "react";
import colors from "@/src/app/styles/colors";

function TabIcon({
  src,
  label,
  focused,
  color,
  size,
}: {
  src: any;
  label: string;
  focused: boolean;
  color: string;
  size: number;
}) {
  // Animated value para o underline
  const underlineAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(underlineAnim, {
      toValue: focused ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeAnim, {
      toValue: focused ? 1 : 0, // aparece quando selecionado
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  return (
    <View style={styles.item}>
      <Animated.View
        style={[
          styles.itemFocused, // fundo arredondado no selecionado
          {
            opacity: fadeAnim,
          },
        ]}
      />
      <Image
        source={src}
        style={{ width: size, height: size, tintColor: color }}
      />
      <Text style={[styles.label, { color }]}>{label}</Text>

      {/* Underline animado */}
      <Animated.View
        style={[
          styles.underline,
          {
            opacity: underlineAnim, // fade
            transform: [
              {
                scaleX: underlineAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1], // anima o "crescimento" lateral
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.principal,
        tabBarInactiveTintColor: colors.gray[400],
        tabBarStyle: {
          backgroundColor: "#1a1a1a",
          borderTopColor: colors.principal,
          paddingTop: 25,
          height: 95,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon
              src={require("@/assets/images/icones/icone-casa.png")}
              label="Início"
              color={color}
              size={24}
              focused={focused}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="favoritos"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon
              src={require("@/assets/images/icones/icone-favorito.png")}
              label="Favoritos"
              color={color}
              size={24}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="pedidos"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon
              src={require("@/assets/images/icones/carrinho.png")}
              label="Pedidos"
              color={color}
              size={24}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon
              src={require("@/assets/images/icones/icone-perfil.png")}
              label="Perfil"
              color={color}
              size={24}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  item: {
    marginTop: -20,
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    paddingVertical: 8,
    position: "relative",
  },
  itemFocused: {
    ...StyleSheet.absoluteFillObject, // ocupa todo espaço do container
    backgroundColor: "#c7a3151f", // cor de fundo no selecionado
    borderRadius: 17, // mais arredondado
  },
  label: {
    fontSize: 12,
  },
  underline: {
    position: "absolute",
    bottom: 0,
    height: 3,
    width: "35%",
    borderRadius: 2,
    backgroundColor: colors.principal,
  },
});
