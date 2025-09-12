import { Tabs } from "expo-router";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Animated,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import colors from "@/src/app/styles/colors";
import { useRouter } from "expo-router";

function TabIcon({
  src,
  label,
  focused,
  color,
  size,
  onPress,
}: {
  src: any;
  label: string;
  focused: boolean;
  color: string;
  size: number;
  onPress?: () => void;
}) {
  const underlineAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(underlineAnim, {
      toValue: focused ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();

    Animated.timing(fadeAnim, {
      toValue: focused ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Animated.View
        style={[
          styles.itemFocused,
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

      <Animated.View
        style={[
          styles.underline,
          {
            opacity: underlineAnim,
            transform: [
              {
                scaleX: underlineAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1],
                }),
              },
            ],
          },
        ]}
      />
    </TouchableOpacity>
  );
}

export default function TabsLayout() {
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();

  // dados mockados (pode vir da API depois)
  const user = {
    name: "Bruno Lobo",
    email: "brunolobo@email.com",
  };

  return (
    <>
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
                onPress={() => router.push("/(tabs)")}
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
                onPress={() => router.push("/favoritos")}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="carrinho"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <TabIcon
                src={require("@/assets/images/icones/carrinho.png")}
                label="Carrinho"
                color={color}
                size={24}
                focused={focused}
                onPress={() => router.push("/carrinho")}
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
                onPress={() => router.push("/perfil")}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="menu"
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <TabIcon
                src={require("@/assets/images/icones/musicmenu.png")}
                label="Menu"
                color={color}
                size={24}
                focused={focused}
                onPress={() => setMenuVisible(true)}
              />
            ),
          }}
        />
      </Tabs>

      {/* Modal do Menu */}
      <Modal
        visible={menuVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.appTitle}>HarmoniX</Text>

            {/* Perfil do usuário */}
            <View style={styles.profileContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {user.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
              </View>
            </View>

            {/* Itens de navegação */}
            <TouchableOpacity
              onPress={() => {
                setMenuVisible(false);
                router.push("/(tabs)");
              }}
              style={styles.modalItem}
            >
              <Text style={styles.modalText}>🏠 Início</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setMenuVisible(false);
                router.push("/favoritos");
              }}
              style={styles.modalItem}
            >
              <Text style={styles.modalText}>⭐ Favoritos</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setMenuVisible(false);
                router.push("/carrinho");
              }}
              style={styles.modalItem}
            >
              <Text style={styles.modalText}>🛒 Carrinho</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setMenuVisible(false);
                router.push("/perfil");
              }}
              style={styles.modalItem}
            >
              <Text style={styles.modalText}>👤 Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setMenuVisible(false)}
              style={styles.modalItem}
            >
              <Text style={styles.modalText}>❌ Fechar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setMenuVisible(false);
                router.push("/dashboard");
              }}
              style={styles.modalItemLogout}
            >
              <Text style={[styles.modalText, { color: "red" }]}>
                🚪 Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
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
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#c7a3151f",
    borderRadius: 17,
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
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "#1a1a1a",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 500,
  },
  appTitle: {
    color: colors.principal,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: colors.principal,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  avatarText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  userName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  userEmail: {
    color: "#aaa",
    fontSize: 14,
  },
  modalItem: {
    paddingVertical: 12,
  },
  modalItemLogout: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#333",
    marginTop: 25,
  },
  modalText: {
    color: "#fff",
    fontSize: 16,
  },
});
