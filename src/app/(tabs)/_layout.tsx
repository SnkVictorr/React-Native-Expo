import { Tabs } from "expo-router";
import { View, Image, Text, StyleSheet } from "react-native";
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
  return (
    <View style={styles.item}>
      <Image
        source={src}
        style={{ width: size, height: size, tintColor: color }}
      />
      <Text style={[styles.label, { color }]}>{label}</Text>
      {focused && <View style={styles.underline} />}
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, // usamos nosso label custom
        tabBarActiveTintColor: colors.principal,
        tabBarInactiveTintColor: colors.gray[400],
        tabBarStyle: {
          backgroundColor: colors.gray[700],
          borderTopColor: colors.principal,
          paddingTop: 15,
          height: 90, // um pouquinho mais alto p/ caber o underline
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
    alignItems: "center",
    justifyContent: "center",
    // largura fixa para o underline não “pular”
    width: 70,
    paddingBottom: 6, // espaço pro underline
  },
  label: {
    marginTop: 1,
    fontSize: 12,
  },
  underline: {
    marginTop: 6,
    height: 3,
    width: "30%", // ocupa toda a largura do item
    borderRadius: 2,
    backgroundColor: colors.principal,
  },
});
