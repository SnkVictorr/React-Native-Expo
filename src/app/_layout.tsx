import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import {
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
} from "@expo-google-fonts/outfit";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import { AuthProvider } from "./context/AuthContext";
// import {
//   PlayfairDisplay_400Regular,
//   PlayfairDisplay_700Bold,
// } from "@expo-google-fonts/playfair-display";
export default function Layout() {
  const [fontsLoaded] = useFonts({
    Quiche: require("@/assets/fonts/quiche-sans.ttf"),
    // "MinhaFonte-Bold": require("../assets/fonts/MinhaFonte-Bold.ttf"),
    // PlayfairRegular: PlayfairDisplay_400Regular,
    // PlayfairBold: PlayfairDisplay_700Bold,
    Quiche_Medium: require("@/assets/fonts/quiche-medium.ttf"),
    Quiche_Bold: require("@/assets/fonts/quiche-bold.ttf"),
    Quiche_ExtraBold: require("@/assets/fonts/quiche-extraBold.ttf"),
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
    Outfit_700Bold,
  });

  if (!fontsLoaded) {
    return null; // ou <AppLoading /> em versões antigas
  }

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
