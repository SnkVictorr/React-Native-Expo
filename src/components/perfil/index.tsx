import React from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { useAuth } from "../../app/context/AuthContext";
import { router } from "expo-router";

export default function PerfilHome() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={{ color: "#fff" }}>Carregando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Configurações</Text>
        <Text style={styles.subtitle}>{user.nome}</Text>
      </View>

      {/* BOTÕES */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/perfil")}
      >
        <Text style={styles.buttonText}>Editar Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/perfil")}
      >
        <Text style={styles.buttonText}>Alterar Senha</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/perfil")}
      >
        <Text style={styles.buttonText}>Endereços</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          logout();
          router.replace("/login");
        }}
      >
        <Text style={styles.logoutText}>Sair da Conta</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    color: "#D4AF37",
    fontSize: 26,
    fontWeight: "700",
  },
  subtitle: {
    color: "#fff",
    fontSize: 16,
    marginTop: 6,
  },
  button: {
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
    marginBottom: 14,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 40,
    backgroundColor: "#9E0000",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
