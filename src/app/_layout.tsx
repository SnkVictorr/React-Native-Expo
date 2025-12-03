import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import {
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
} from "@expo-google-fonts/outfit";
// ... suas importações de fontes
import { View, ActivityIndicator, Platform } from "react-native";
import React, { useEffect, useCallback } from "react"; // Adicione useCallback
import { AuthProvider } from "./context/AuthContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import * as SystemUI from "expo-system-ui"; // <--- IMPORTANTE

// Tente definir isso FORA do componente também para executar o mais cedo possível
if (Platform.OS === "android") {
  NavigationBar.setBackgroundColorAsync("#1a1a1a");
}

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Quiche: require("@/assets/fonts/quiche-sans.ttf"),
    Quiche_Medium: require("@/assets/fonts/quiche-medium.ttf"),
    Quiche_Bold: require("@/assets/fonts/quiche-bold.ttf"),
    Quiche_ExtraBold: require("@/assets/fonts/quiche-extraBold.ttf"),
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
    Outfit_700Bold,
  });

  useEffect(() => {
    async function configureSystemBars() {
      if (Platform.OS === "android") {
        // 1. Pinta o fundo "atrás" do app (System UI)
        await SystemUI.setBackgroundColorAsync("#1a1a1a");

        // 2. Força a barra de navegação novamente
        await NavigationBar.setBackgroundColorAsync("#1a1a1a");
        await NavigationBar.setButtonStyleAsync("light");
      }
    }
    configureSystemBars();
  }, []);

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1a1a1a",
        }}
      >
        <ActivityIndicator size="large" color="#c7a315" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        {/* backgroundColor no StatusBar ajuda a pintar o topo.
            translucent={false} garante que ele ocupe o espaço e pinte o fundo
        */}
        <StatusBar style="light" translucent={false} />

        {/* contentStyle aqui garante que o container da Stack também seja preto 
            evitando piscadas brancas na transição 
        */}
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#1a1a1a", flex: 1 },
          }}
        >
          <Stack.Screen name="(tabs)/" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
