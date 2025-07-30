import { Pressable, View, Text } from "react-native";
import React from "react";
import { styles } from "./style";
import { router } from "expo-router";

export default function Headers() {
  const handleNext = () => {
    router.navigate("/login/page");
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
        onPress={handleNext}
        style={({ pressed }) => [styles.header, pressed ? styles.header : null]}
      >
        <Text style={styles.text}>Login</Text>
      </Pressable>
      <Pressable
        onPress={handleNext}
        style={({ pressed }) => [styles.header, pressed ? styles.header : null]}
      >
        <Text style={styles.text}>Cadastre-se</Text>
      </Pressable>
    </View>
  );
}
