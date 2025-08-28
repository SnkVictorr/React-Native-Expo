import { Tabs } from "expo-router";

import Feather from "@expo/vector-icons/Feather";
import colors from "@/src/app/styles/colors";
import { Image } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, //Esconde o cabeçalho padrão
        tabBarActiveTintColor: colors.principal, //cor de icone ativo
        tabBarShowLabel: false, // esconde rótulo do icone

        tabBarInactiveTintColor: colors.gray[400], // cor de icone inativo

        tabBarStyle: {
          // estilo da barra de navegação
          backgroundColor: colors.gray[700], // cor de fundo
          borderTopColor: colors.principal, // cor da borda superior
          paddingTop: 10, // espaçamento superior
          height: 80,
        },
      }}
    >
      {/* Define a ordem da tela */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("@/assets/images/icones/icone-casa.png")}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favoritos"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("@/assets/images/icones/icone-favorito.png")}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="shopping-bag" color={color} size={size} />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="perfil"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("@/assets/images/icones/icone-perfil.png")}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
