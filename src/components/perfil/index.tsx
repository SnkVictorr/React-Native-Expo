import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { getClienteId } from "../../app/services/clientes/get";
import { getClienteById } from "../../app/services/clientes/perfil/getClienteById";

export default function PerfilTabs() {
  const [cliente, setCliente] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarPerfil();
  }, []);

  const carregarPerfil = async () => {
    try {
      const id = await getClienteId();

      if (!id) {
        Alert.alert("Erro", "Não foi possível carregar seu perfil");
        return;
      }

      const dados = await getClienteById(id);
      setCliente(dados);

    } catch (error) {
      console.log("Erro ao carregar perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("biometriaAtivada");
    router.push("/login");
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#D4AF37" />
      </View>
    );
  }

  if (!cliente) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "#fff" }}>Nenhum dado encontrado.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
    <View style={styles.container}>
      {/* FOTO
      <Image
        source={require("")}
        style={styles.profileImage}
      /> */}

      {/* NOME */}
      <Text style={styles.name}>{cliente.nome}</Text>

      {/* EMAIL */}
      <Text style={styles.email}>{cliente.email}</Text>

      {/* LINHAS DE INFO */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>ID do Cliente:</Text>
        <Text style={styles.infoValue}>{cliente.id}</Text>
      </View>

      {/* BOTÃO EDITAR PERFIL */}
      <TouchableOpacity style={styles.editButton}>
        <Ionicons name="create-outline" size={20} color="#fff" />
        <Text style={styles.editText}>Editar Perfil</Text>
      </TouchableOpacity>

      {/* BOTÃO LOGOUT */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
    alignItems: "center",
    paddingTop: 50,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0F0F0F",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#D4AF37",
    marginBottom: 20,
  },
  name: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  email: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 30,
  },
  infoBox: {
    width: "85%",
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  infoTitle: {
    color: "#D4AF37",
    fontSize: 16,
    fontWeight: "bold",
  },
  infoValue: {
    color: "#fff",
    fontSize: 16,
  },
  editButton: {
    flexDirection: "row",
    backgroundColor: "#D4AF37",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
    alignItems: "center",
  },
  editText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#B22222",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
});
