import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Input from "../components/input";

import { makeCadastro } from "./services/clientes/cadastro/post";

export default function Cadastro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCadastro = async () => {
    if (!email || !password || !name || !confirmPassword) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem!");
      return;
    }

    setIsLoading(true);

    try {
      const data = await makeCadastro({ name, email, password });
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      router.push("./login");
    } catch (error: any) {
      console.log("Erro no cadastro => ", error);
      const errorMessage =
        error?.response?.data?.message || // Caso use Axios
        error?.message || // Caso seja um erro simples
        "Erro ao cadastrar. Verifique os dados e tente novamente."; // Fallback

      Alert.alert("Erro", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!confirmPassword) return; // se o campo estiver vazio, não faz nada

    const timer = setTimeout(() => {
      if (password !== confirmPassword) {
        Alert.alert("Erro", "As senhas não coincidem");
      }
    }, 1000); //esperar até que o usuário termine de digitar

    return () => clearTimeout(timer);
  }, [password, confirmPassword]); // só roda quando password OU confirmPassword mudarem

  const handleGoogleLogin = () => {
    Alert.alert("Google Login", "Função não implementada");
  };

  const handleFacebookLogin = () => {
    Alert.alert("Facebook Login", "Função não implementada");
  };

  const handleBackPress = () => {
    router.navigate("./dashboard");
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require("@/assets/images/fundocadastro.jpeg")}
          style={styles.fundocadastrese}
          resizeMode="cover"
        >
          {/* Overlay para escurecer a imagem e melhorar contraste */}
          <View style={styles.overlay} />

          <View style={styles.content}>
            {/* Header com botão voltar */}
            <View style={styles.headerContainer}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={handleBackPress}
              >
                <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <Image
                source={require("../../assets/images/logo-gold.png")}
                style={styles.imagem}
              />
            </View>

            {/* Form */}
            <View style={styles.form}>
              {/* Campo Nome */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Nome</Text>
                <Input
                  placeholder="Nome"
                  value={name}
                  onChangeText={(text) => setName(text)}
                  keyboardType="default"
                  autoCapitalize="words"
                  autoCorrect={false}
                />
                {/* Campo Email */}
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <Input
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              {/* Campo Password */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Senha</Text>
                <Input
                  placeholder="Senha"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
              {/* Campo confirmar Password */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirmar Senha</Text>
                <Input
                  placeholder="Senha"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
              </View>

              {/* Botão Sign In */}
              <TouchableOpacity
                style={[
                  styles.signInButton,
                  isLoading && styles.buttonDisabled,
                ]}
                onPress={handleCadastro}
                disabled={isLoading}
              >
                <Text style={styles.signInButtonText}>
                  {isLoading ? "Carregando..." : "Cadastrar"}
                </Text>
              </TouchableOpacity>

              {/* Texto "Or sign in with" */}
              <Text style={styles.orText}>- Ou entre com -</Text>

              {/* Botões de redes sociais */}
              <View style={styles.socialContainer}>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={handleGoogleLogin}
                >
                  <View style={styles.googleIcon}>
                    <Image
                      source={require("../../assets/images/google.png")}
                      style={styles.googleImage}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={handleFacebookLogin}
                >
                  <View style={styles.facebookIcon}>
                    <Image
                      source={require("@/assets/images/facebook.png")}
                      style={styles.facebookImage}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
    zIndex: 2,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // escurece só a imagem
    zIndex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    zIndex: 2, // garante que fique acima do overlay
  },
  headerContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    marginTop: 30,
    justifyContent: "center",
  },
  imagem: {
    width: 90,
    height: 90,
    alignSelf: "center",
  },
  fundocadastrese: {
    flex: 1,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#d4af37",
    textAlign: "center",
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#ececec",
    marginBottom: 8,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.85)", // translúcido
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    color: "#333",
  },
  signInButton: {
    backgroundColor: "#D4AF37",
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  signInButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  orText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
    marginBottom: 30,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  googleIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 100,
    paddingBottom: 20,
  },
  googleImage: {
    width: 50,
    height: 50,
  },
  facebookIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 100,
    paddingBottom: 20,
  },
  facebookImage: {
    width: 50,
    height: 50,
  },
});
