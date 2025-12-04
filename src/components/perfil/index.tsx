import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../app/context/AuthContext";
import { BASE_URL, AUTH_TOKEN } from "../../app/config/api";
import { Ionicons } from "@expo/vector-icons";
import { TextInputMask } from "react-native-masked-text";
import { router } from "expo-router";

export default function Perfil() {
  const { user, setUser } = useAuth();

  const [section, setSection] = useState<"menu" | "perfil" | "endereco">(
    "menu"
  );
  const [loading, setLoading] = useState(false);

  // ------------ CAMPOS DO PERFIL ------------
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // campo para comparar senha atual (vindo do user)
  const [origSenha, setOrigSenha] = useState<string | null>(null);

  // mostrar / ocultar senha
  const [showPassword, setShowPassword] = useState(false);

  // ------------ AVATAR ----------
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // ------------ CAMPOS DO ENDEREÇO ------------
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  // -------------------- CARREGAR DADOS DO BANCO --------------------
  useEffect(() => {
    if (!user) return;

    // perfil
    setNome(user.nome || "");
    setCpf(user.cpf || "");
    setSenha(""); // não pré-preencher o input de senha por segurança
    setOrigSenha(user.senha ?? null); // armazena a senha original (você disse que vem sem criptografia)
    setTelefone(user.whatsapp || user.telefone || "");
    setEmail(user.email || "");

    if (user.endereco) {
      setCep(user.endereco.cep || "");
      setEndereco(user.endereco.endereco || "");
      setNumero(user.endereco.numero || "");
      setComplemento(user.endereco.complemento || "");
      setBairro(user.endereco.bairro || "");
      setCidade(user.endereco.cidade || "");
      setEstado(user.endereco.estado || "");
    }
  }, [user]);

  // -------------------- SALVAR PERFIL --------------------
  const handleSaveProfile = async () => {
    // validações simples
    if (!nome.trim()) {
      Alert.alert("Atenção", "Nome não pode ficar vazio.");
      return;
    }
    if (!email.trim()) {
      Alert.alert("Atenção", "Email não pode ficar vazio.");
      return;
    }
    if (!cpf.trim()) {
      Alert.alert("Atenção", "CPF não pode ficar vazio.");
      return;
    }
    if (!telefone.trim()) {
      Alert.alert("Atenção", "Telefone não pode ficar vazio.");
      return;
    }

    setLoading(true);
    try {
      // monta o corpo; só inclui senha se ela foi alterada e não vazia
      const body: any = {
        id: user.cliente_id,
        nome,
        cpf,
        telefone: telefone,
        email,
      };

      // verificar se senha foi alterada (origSenha pode ser null se API não retorna; você disse que retorna)
      // envia somente se for diferente e não vazia
      if (senha && origSenha !== null) {
        if (senha !== origSenha) {
          body.senha = senha;
        }
      } else if (senha && origSenha === null) {
        // caso sua API não retorne senha (segurança) — ainda assim, se desejar enviar a senha se foi preenchida, envie:
        body.senha = senha;
      }

      const res = await fetch(`${BASE_URL}/clientes/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AUTH_TOKEN}`,
        },
        body: JSON.stringify(body),
      });

      // tenta parsear json
      const data = await res.json();

      if (data.status === "success") {
        // atualiza user no context (setUser)
        const newUser = {
          ...user,
          nome,
          cpf,
          telefone: telefone,
          email,
        };

        // se a senha foi alterada, atualiza também no user (pois sua API retorna sem criptografia)
        if (body.senha) newUser.senha = body.senha;

        setUser(newUser);
        Alert.alert("Sucesso", "Perfil atualizado!");
        setSection("menu");
      } else {
        Alert.alert("Erro", data.message || "Erro ao salvar.");
      }
    } catch (err) {
      console.log("Erro salvar perfil:", err);
      Alert.alert("Erro", "Erro na conexão.");
    } finally {
      setLoading(false);
    }
  };

  // -------------------- SALVAR ENDEREÇO --------------------
  const handleSaveAddress = async () => {
    setLoading(true);
    try {
      // aqui usaremos endpoint que você tinha: update_endereco.php
      // adaptado para enviar o objeto endereco
      const res = await fetch(`${BASE_URL}/clientes/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AUTH_TOKEN}`,
        },
        body: JSON.stringify({
          id: user.cliente_id,
          endereco: {
            cep,
            endereco,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
          },
        }),
      });

      const data = await res.json();

      if (data.status === "success") {
        setUser({
          ...user,
          endereco: {
            cep,
            endereco,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
          },
        });

        Alert.alert("Sucesso", "Endereço atualizado!");
        setSection("menu");
      } else {
        Alert.alert("Erro", data.message || "Erro ao salvar endereço");
      }
    } catch (err) {
      console.log("Erro salvar endereco:", err);
      Alert.alert("Erro", "Erro na conexão.");
    }

    setLoading(false);
  };

  const [error, setError] = useState("");
  const handleBuscarCep = async (cepDigitado: string) => {
    const cepLimpo = cepDigitado.replace(/\D/g, "");
    console.log("Buscando CEP:", cepLimpo);
    if (cepLimpo.length !== 8) return;

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`, {
        method: "GET",
      });
      const data = await res.json();
      console.log("Dados do CEP:", data);

      if (data.erro) {
        setError("CEP não encontrado.");
        return;
      }

      setEndereco(data.logradouro || "");
      setBairro(data.bairro || "");
      setCidade(data.localidade || "");
      setEstado(data.uf || "");
    } catch (err) {
      console.error("Erro ao buscar CEP:", err);
      setError("Erro ao buscar o CEP.");
    }
  };

  // ---------------------- MENU ----------------------
  if (section === "menu") {
    return (
      <SafeAreaView edges={["top"]} style={localStyles.container}>
        {/* ----------- AVATAR ----------- */}
        <View style={localStyles.avatarContainer}>
          <Image
            source={
              selectedImageUri
                ? { uri: selectedImageUri }
                : user?.imagem
                ? { uri: `data:image/jpeg;base64,${user.imagem}` }
                : require("../../../assets/images/default-avatar.png")
            }
            style={localStyles.avatar}
          />
          <Text
            style={{
              color: "#ffffff",
              fontSize: 16,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            Olá, {user.nome}
          </Text>

          {uploading && (
            <ActivityIndicator color="#D4AF37" style={{ marginTop: 6 }} />
          )}
        </View>
        <Text style={localStyles.title}>Configurações</Text>

        <TouchableOpacity
          style={localStyles.option}
          onPress={() => setSection("perfil")}
        >
          <Text style={localStyles.optionText}>Editar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={localStyles.option}
          onPress={() => setSection("endereco")}
        >
          <Text style={localStyles.optionText}>Endereço</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={localStyles.option}
          onPress={() => router.push("/(tabs)/favoritos")}
        >
          <Text style={localStyles.optionText}>Favoritos</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // ---------------------- PERFIL ----------------------
  if (section === "perfil") {
    // pegar inicial do usuário
    const inicial = nome?.trim()?.charAt(0)?.toUpperCase() || "?";

    return (
      <SafeAreaView edges={["top"]} style={localStyles.container}>
        <ScrollView>
          <TouchableOpacity onPress={() => setSection("menu")}>
            <Text style={localStyles.back}>
              <Ionicons name="arrow-back" size={24} color="#D4AF37" />
            </Text>
          </TouchableOpacity>

          {/* ----------- AVATAR ----------- */}
          <View style={localStyles.avatarContainer}>
            <Image
              source={
                selectedImageUri
                  ? { uri: selectedImageUri }
                  : user?.imagem
                  ? { uri: `data:image/jpeg;base64,${user.imagem}` }
                  : require("../../../assets/images/default-avatar.png")
              }
              style={localStyles.avatar}
            />

            {uploading && (
              <ActivityIndicator color="#D4AF37" style={{ marginTop: 6 }} />
            )}
          </View>
          <Text style={localStyles.title}>Editar Perfil</Text>

          <View style={localStyles.form}>
            <Text style={localStyles.label}>Nome</Text>
            <TextInput
              style={localStyles.input}
              value={nome}
              onChangeText={setNome}
              placeholder="Seu nome"
              placeholderTextColor="#999"
              maxLength={150}
            />

            <Text style={localStyles.label}>Email</Text>
            <TextInput
              style={localStyles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="email@exemplo.com"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#999"
              maxLength={150}
            />

            <Text style={localStyles.label}>Senha</Text>
            <View style={localStyles.passwordContainer}>
              <TextInput
                style={localStyles.passwordInput}
                value={senha}
                onChangeText={setSenha}
                placeholder="Deixe em branco para manter a atual"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                maxLength={50}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={localStyles.eyeButton}
                accessibilityLabel={
                  showPassword ? "Ocultar senha" : "Mostrar senha"
                }
              >
                {showPassword ? (
                  <Ionicons name="eye-off" size={18} color="#fff" />
                ) : (
                  <Ionicons name="eye" size={18} color="#fff" />
                )}
              </TouchableOpacity>
            </View>

            <Text style={localStyles.label}>CPF</Text>
            <TextInputMask
              type={"cpf"}
              value={cpf}
              onChangeText={(text) => setCpf(text)}
              style={localStyles.input}
              placeholder="000.000.000-00"
              placeholderTextColor="#999"
              maxLength={15}
            />

            <Text style={localStyles.label}>Telefone</Text>
            <TextInputMask
              type={"cel-phone"}
              options={{
                maskType: "BRL",
                withDDD: true,
                dddMask: "(99) ",
              }}
              value={telefone}
              onChangeText={(text) => setTelefone(text)}
              style={localStyles.input}
              placeholder="(00) 00000-0000"
              placeholderTextColor="#999"
              maxLength={15}
            />

            <TouchableOpacity
              style={localStyles.saveBtn}
              onPress={handleSaveProfile}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#000" />
              ) : (
                <Text style={localStyles.saveText}>Salvar</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ---------------------- ENDEREÇO ----------------------
  if (section === "endereco") {
    return (
      <SafeAreaView edges={["top"]} style={localStyles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={() => setSection("menu")}>
            <Text style={localStyles.back}>
              <Ionicons name="arrow-back" size={24} color="#D4AF37" />
            </Text>
          </TouchableOpacity>

          <Text style={localStyles.title}>Endereço</Text>

          <View style={localStyles.form}>
            <Text style={localStyles.label}>CEP</Text>
            <TextInputMask
              type={"zip-code"}
              style={localStyles.input}
              value={cep}
              onChangeText={(t) => {
                setCep(t);
                if (t.length === 9) {
                  handleBuscarCep(t);
                }
              }}
              placeholder="00000-000"
              placeholderTextColor="#999"
            />

            <Text style={localStyles.label}>Endereço</Text>
            <TextInput
              style={localStyles.input}
              value={endereco}
              onChangeText={setEndereco}
              placeholder="Rua / Avenida"
              placeholderTextColor="#999"
              maxLength={200}
            />

            <Text style={localStyles.label}>Número</Text>
            <TextInput
              style={localStyles.input}
              value={numero}
              onChangeText={setNumero}
              placeholder="Número"
              placeholderTextColor="#999"
              maxLength={10}
            />

            <Text style={localStyles.label}>Complemento</Text>
            <TextInput
              style={localStyles.input}
              value={complemento}
              onChangeText={setComplemento}
              placeholder="Apartamento, bloco..."
              placeholderTextColor="#999"
              maxLength={50}
            />

            <Text style={localStyles.label}>Bairro</Text>
            <TextInput
              style={localStyles.input}
              value={bairro}
              onChangeText={setBairro}
              placeholder="Bairro"
              placeholderTextColor="#999"
              maxLength={150}
            />

            <Text style={localStyles.label}>Cidade</Text>
            <TextInput
              style={localStyles.input}
              value={cidade}
              onChangeText={setCidade}
              placeholder="Cidade"
              placeholderTextColor="#999"
              maxLength={50}
            />

            <Text style={localStyles.label}>Estado</Text>
            <TextInput
              style={localStyles.input}
              value={estado}
              onChangeText={setEstado}
              placeholder="UF"
              placeholderTextColor="#999"
              maxLength={50}
            />

            <TouchableOpacity
              style={localStyles.saveBtn}
              onPress={handleSaveAddress}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#000" />
              ) : (
                <Text style={localStyles.saveText}>Salvar Endereço</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return null;
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
  },
  back: {
    color: "#D4AF37",
    marginBottom: 8,
    marginTop: 20,
  },
  title: {
    color: "#D4AF37",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    marginTop: 40,
  },
  option: {
    backgroundColor: "#111",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#222",
    marginBottom: 12,
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
  },
  form: {
    marginTop: 6,
  },
  label: {
    color: "#aaa",
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#111",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#222",
  },
  saveBtn: {
    backgroundColor: "#D4AF37",
    padding: 14,
    borderRadius: 12,
    marginTop: 18,
    alignItems: "center",
    marginBottom: 30,
  },
  saveText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 16,
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
    marginBottom: 6,
  },
  passwordInput: {
    backgroundColor: "#111",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#222",
    paddingRight: 44,
  },
  eyeButton: {
    position: "absolute",
    right: 10,
    top: 10,
    padding: 6,
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 20,
  },

  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#D4AF37",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#000",
    fontSize: 38,
    fontWeight: "700",
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
});
