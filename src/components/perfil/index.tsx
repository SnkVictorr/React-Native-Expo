import React, { useState, useEffect, JSX } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useAuth } from "../../app/context/AuthContext";
import { router } from "expo-router";
import { AUTH_TOKEN, BASE_URL } from "@/src/app/config/api";

// --------------------------------------------------
// Máscaras simples (não dependem de libs externas)
// --------------------------------------------------
const maskCPF = (v: string) => {
  const nums = v.replace(/\D/g, "").slice(0, 11);
  return nums
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

const maskPhone = (v: string) => {
  const nums = v.replace(/\D/g, "").slice(0, 11);
  // (##) #####-####
  if (nums.length <= 10) {
    return nums.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").trim().replace(/-$/, "");
  }
  return nums.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
};

const maskCEP = (v: string) => {
  const nums = v.replace(/\D/g, "").slice(0, 8);
  return nums.replace(/(\d{5})(\d{1,3})/, "$1-$2");
};

const maskDate = (v: string) => {
  const nums = v.replace(/\D/g, "").slice(0, 8);
  return nums.replace(/(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3");
};

// --------------------------------------------------
// MAIN COMPONENT
// --------------------------------------------------
export default function Profile(): JSX.Element {
  const { user, login, logout } = useAuth();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);

  // campos do formulário
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [cep, setCep] = useState<string>("");
  const [endereco, setEndereco] = useState<string>("");
  const [numero, setNumero] = useState<string>("");
  const [complemento, setComplemento] = useState<string>("");
  const [bairro, setBairro] = useState<string>("");
  const [cidade, setCidade] = useState<string>("");
  const [estado, setEstado] = useState<string>("");
  const [dataNascimento, setDataNascimento] = useState<string>("");

  // preencher campos iniciais quando user carregar
  useEffect(() => {
    if (user) {
      console.log("Dados do usuário carregados:", {
        cliente_id: user.cliente_id,
        nome: user.nome,
        email: user.email,
        telefone: user.telefone,
        endereco: user.endereco
      });
      
      setNome(user.nome ?? "");
      setEmail(user.email ?? "");
      setTelefone(user.telefone ?? "");
      setCpf(user.cpf ?? "");
      setEndereco(user.endereco?.endereco ?? "");
      setNumero(user.endereco?.numero ?? "");
      setComplemento(user.endereco?.complemento ?? "");
      setBairro(user.endereco?.bairro ?? "");
      setCidade(user.endereco?.cidade ?? "");
      setEstado(user.endereco?.estado ?? "");
      setCep(user.endereco?.cep ?? "");
      setDataNascimento(user.data_nascimento ?? "");
      setSelectedImageUri(user.imagem ?? null);
    }
  }, [user]);

  // ----------------------------------------------------
  // Escolher imagem da galeria e converter pra base64
  // ----------------------------------------------------
  const pickImageAndConvert = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão negada", "Permita o acesso às fotos nas configurações.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (result.canceled) return;

      const uri = result.assets[0].uri;
      setSelectedImageUri(uri);

      const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
      const extMatch = uri.match(/\.(\w+)$/);
      const ext = extMatch ? extMatch[1].toLowerCase() : "jpg";
      const mime = ext === "png" ? "image/png" : "image/jpeg";
      setImageBase64(`data:${mime};base64,${base64}`);
    } catch (error) {
      console.error("Erro imagem:", error);
      Alert.alert("Erro", "Não foi possível selecionar/convertar a imagem.");
    }
  };

  // ----------------------------------------------------
  // Função para salvar (PUT)
  // ----------------------------------------------------
  const handleSave = async () => {
    console.log("DEBUG - user object:", user);
    console.log("DEBUG - cliente_id:", user?.cliente_id);
    
    if (!user?.cliente_id) {
      Alert.alert("Erro", `Cliente não identificado. ID: ${user?.cliente_id}`);
      return;
    }

    setSaving(true);

    try {
      const payload = {
        id: user.cliente_id,
        nome: nome || "",
        cpf: cpf || "",
        telefone: telefone || "",
        email: email || "",
        endereco: {
          endereco: endereco || "",
          numero: numero || "",
          complemento: complemento || "",
          bairro: bairro || "",
          cidade: cidade || "",
          estado: estado || "",
          cep: cep || "",
        }
      };

      console.log("ENVIANDO PAYLOAD:", JSON.stringify(payload, null, 2));
      console.log("ID do cliente sendo enviado:", user.cliente_id);

      const response = await fetch(`${BASE_URL}/clientes/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: AUTH_TOKEN,
        },
        body: JSON.stringify(payload),
      });

      console.log("STATUS DA RESPOSTA:", response.status);
      
      const textResponse = await response.text();
      console.log("RESPOSTA BRUTA:", textResponse);

      let data;
      try {
        data = JSON.parse(textResponse);
      } catch (parseError) {
        console.error("Erro ao parsear JSON:", parseError);
        throw new Error("Resposta inválida do servidor");
      }

      console.log("RESPOSTA BACKEND:", data);

      if (!response.ok || data.status !== "success") {
        throw new Error(data.message || `Erro HTTP: ${response.status}`);
      }

      // Atualiza user localmente
      const updatedUser = {
        ...user,
        nome: payload.nome,
        cpf: payload.cpf,
        telefone: payload.telefone,
        email: payload.email,
        endereco: payload.endereco,
      };

      await login(updatedUser);

      Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
      setIsEditing(false);

    } catch (err: any) {
      console.log("ERRO DETALHADO:", err);
      Alert.alert("Erro", err.message || "Não foi possível conectar ao servidor.");
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#D4AF37" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.header}>
          {/* <Image
            source={
              selectedImageUri
                ? { uri: selectedImageUri }
                : user.imagem
                ? { uri: user.imagem }
                : require("../../assets/images/avatar-default.png")
            }
            style={styles.avatar}
          /> */}

          {isEditing && (
            <TouchableOpacity style={styles.changePhotoBtn} onPress={pickImageAndConvert}>
              <Text style={styles.changePhotoText}>Alterar foto</Text>
            </TouchableOpacity>
          )}

          <Text style={styles.name}>{nome || "—"}</Text>
          <Text style={styles.email}>{email || "—"}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Informações do Cliente</Text>

          <View style={styles.card}>
            {/* Nome */}
            <Text style={styles.label}>Nome completo</Text>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
              placeholder="Digite seu nome"
              placeholderTextColor="#666"
              editable={isEditing}
            />

            {/* Email */}
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Digite seu email"
              keyboardType="email-address"
              placeholderTextColor="#666"
              editable={isEditing}
              autoCapitalize="none"
            />

            {/* Telefone */}
            <Text style={styles.label}>Telefone</Text>
            <TextInput
              style={styles.input}
              value={telefone}
              onChangeText={(t) => setTelefone(maskPhone(t))}
              placeholder="(00) 00000-0000"
              keyboardType="phone-pad"
              placeholderTextColor="#666"
              editable={isEditing}
            />

            {/* CPF */}
            <Text style={styles.label}>CPF</Text>
            <TextInput
              style={styles.input}
              value={cpf}
              onChangeText={(t) => setCpf(maskCPF(t))}
              placeholder="000.000.000-00"
              keyboardType="numeric"
              placeholderTextColor="#666"
              editable={isEditing}
            />

            {/* Nascimento */}
            <Text style={styles.label}>Data de nascimento</Text>
            <TextInput
              style={styles.input}
              value={dataNascimento}
              onChangeText={(t) => setDataNascimento(maskDate(t))}
              placeholder="DD/MM/AAAA"
              keyboardType="numeric"
              placeholderTextColor="#666"
              editable={isEditing}
            />

            {/* CEP */}
            <Text style={styles.label}>CEP</Text>
            <TextInput
              style={styles.input}
              value={cep}
              onChangeText={(t) => setCep(maskCEP(t))}
              placeholder="00000-000"
              keyboardType="numeric"
              placeholderTextColor="#666"
              editable={isEditing}
            />

            {/* Logradouro / endereço */}
            <Text style={styles.label}>Endereço (logradouro)</Text>
            <TextInput
              style={styles.input}
              value={endereco}
              onChangeText={setEndereco}
              placeholder="Rua / Avenida"
              placeholderTextColor="#666"
              editable={isEditing}
            />

            <Text style={styles.label}>Número</Text>
            <TextInput
              style={styles.input}
              value={numero}
              onChangeText={setNumero}
              placeholder="Número"
              keyboardType="numeric"
              placeholderTextColor="#666"
              editable={isEditing}
            />

            <Text style={styles.label}>Complemento</Text>
            <TextInput
              style={styles.input}
              value={complemento}
              onChangeText={setComplemento}
              placeholder="Apartamento, bloco, etc."
              placeholderTextColor="#666"
              editable={isEditing}
            />

            <Text style={styles.label}>Bairro</Text>
            <TextInput
              style={styles.input}
              value={bairro}
              onChangeText={setBairro}
              placeholder="Bairro"
              placeholderTextColor="#666"
              editable={isEditing}
            />

            <Text style={styles.label}>Cidade</Text>
            <TextInput
              style={styles.input}
              value={cidade}
              onChangeText={setCidade}
              placeholder="Cidade"
              placeholderTextColor="#666"
              editable={isEditing}
            />

            <Text style={styles.label}>Estado</Text>
            <TextInput
              style={styles.input}
              value={estado}
              onChangeText={setEstado}
              placeholder="Estado (UF)"
              placeholderTextColor="#666"
              editable={isEditing}
            />
          </View>
        </View>

        {/* Botões */}
        {!isEditing ? (
          <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
            <Text style={styles.editText}>Editar Perfil</Text>
          </TouchableOpacity>
        ) : (
          <View>
            <TouchableOpacity
              style={[styles.saveButton, saving && { opacity: 0.8 }]}
              onPress={handleSave}
              disabled={saving}
            >
              {saving ? <ActivityIndicator color="#000" /> : <Text style={styles.saveText}>Salvar Alterações</Text>}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.cancelButton]}
              onPress={() => {
                setIsEditing(false);
                setNome(user.nome ?? "");
                setEmail(user.email ?? "");
                setTelefone(user.telefone ?? "");
                setCpf(user.cpf ?? "");
                setCep(user.endereco?.cep ?? "");
                setEndereco(user.endereco?.endereco ?? "");
                setNumero(user.endereco?.numero ?? "");
                setComplemento(user.endereco?.complemento ?? "");
                setBairro(user.endereco?.bairro ?? "");
                setCidade(user.endereco?.cidade ?? "");
                setEstado(user.endereco?.estado ?? "");
                setDataNascimento(user.data_nascimento ?? "");
                setSelectedImageUri(user.imagem ?? null);
                setImageBase64(null);
              }}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            logout();
            router.replace("/login");
          }}
        >
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// --------------------------------------------------
// Styles
// --------------------------------------------------
const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
  },

  header: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#D4AF37",
    backgroundColor: "#222",
  },

  changePhotoBtn: {
    marginTop: 10,
    backgroundColor: "rgba(255,255,255,0.10)",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#444",
  },
  changePhotoText: {
    color: "#fff",
    fontSize: 14,
  },

  name: {
    fontSize: 22,
    color: "#D4AF37",
    fontWeight: "700",
    marginTop: 12,
  },
  email: {
    fontSize: 14,
    color: "#ffffff",
    marginTop: 4,
  },

  section: {
    marginTop: 20,
  },
  title: {
    color: "#D4AF37",
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#222",
  },

  label: {
    color: "#888",
    fontSize: 13,
    marginTop: 12,
  },

  value: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  input: {
    backgroundColor: "#222",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    marginTop: 6,
  },

  editButton: {
    backgroundColor: "#444",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
  },
  editText: {
    color: "#fff",
    fontSize: 16,
  },

  saveButton: {
    backgroundColor: "#D4AF37",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
  },
  saveText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700",
  },

  cancelButton: {
    backgroundColor: "#333",
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 12,
    alignItems: "center",
  },
  cancelText: {
    color: "#fff",
    fontSize: 15,
  },

  logoutButton: {
    backgroundColor: "#9e0000",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 18,
    marginBottom: 30,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});