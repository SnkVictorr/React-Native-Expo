import { Pressable, View, Text } from "react-native";
import React from "react";
import { styles } from "./style";
import { router } from "expo-router";

export default function Headers() {
  const handleLogin = () => {
    router.navigate("/login");
  };

  const handleCadastre = () => {
    router.navigate("/cadastreSe");
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 10,
        marginRight: 10,
      }}
    >
      <Pressable
        onPress={handleLogin}
        style={({ pressed }) => [styles.header, pressed ? styles.header : null]}
      >
        <Text style={styles.text}>Login</Text>
      </Pressable>
      <Pressable
        onPress={handleCadastre}
        style={({ pressed }) => [styles.header, pressed ? styles.header : null]}
      >
        <Text style={styles.text}>Cadastre-se</Text>
      </Pressable>
    </View>
  );
}
