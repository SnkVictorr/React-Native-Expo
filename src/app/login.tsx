import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Input from "../components/input";
import { makeLogin } from "./services/clientes/login/post";
import { useAuth } from "./context/AuthContext";
import SignGoogle from "./SignGoogle";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const { login } = useAuth();
  // ----------------------------------------------------------
  // VERIFICA SE O USUÁRIO ATIVOU A BIOMETRIA E FAZ LOGIN AUTO
  // ----------------------------------------------------------
  useEffect(() => {
    (async () => {
      const enabled = await AsyncStorage.getItem("biometriaAtivada");
      if (enabled === "true") {
        checkAndTriggerBiometricLogin();
      }
    })();
  }, []);

  const checkAndTriggerBiometricLogin = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !enrolled) {
      setBiometricAvailable(false);
      return;
    }

    setBiometricAvailable(true);

    const biometric = await LocalAuthentication.authenticateAsync({
      promptMessage: "Use sua digital para entrar",
      cancelLabel: "Cancelar",
    });

    if (biometric.success) {
      const savedToken = await AsyncStorage.getItem("token");
      if (savedToken) {
        router.push("/(tabs)/main");
      }
    }
  };

  // ----------------------------------------------------------
  // LOGIN NORMAL
  // ----------------------------------------------------------
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      setIsLoading(true);

      const data = await makeLogin({ email, password });
      // login com contexto
      await login(data.usuario);
      console.log("DATA DO USUARIO =>", data.usuario);
      // ❗ Ajuste aqui para pegar o token certo do seu backend:
      await AsyncStorage.setItem("token", data?.token || "TOKEN_FAKE");
      await AsyncStorage.setItem("biometriaAtivada", "true");
      if (data.status === "success") {
        router.replace("/(tabs)/main");
      }
    } catch (err) {
      Alert.alert("Erro", "Email ou senha incorretos.");
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------------------------------------------------
  // LOGIN VIA BIOMETRIA MANUAL (botão)
  // ----------------------------------------------------------
  const handleBiometricButton = async () => {
    const biometric = await LocalAuthentication.authenticateAsync({
      promptMessage: "Confirme sua identidade",
      cancelLabel: "Cancelar",
    });

    console.log("RESULTADO DA BIOMETRIA =>", biometric);

    if (biometric.success) {
      const savedToken = await AsyncStorage.getItem("token");
      if (savedToken) {
        router.replace("/(tabs)/main");
      } else {
        Alert.alert("Erro", "Nenhum login salvo. Use email e senha primeiro.");
      }
    }
  };

  const handleBackPress = () => {
    router.navigate("/");
  };

  const handleGoogleLogin = () => {
    Alert.alert("Google Login", "Função não implementada");
  };
  const handleFacebookLogin = () => {
    Alert.alert("Facebook Login", "Função não implementada");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/fundologin.jpeg")}
        style={styles.fundologin}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <View style={styles.content}>
            <View style={styles.headerContainer}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={handleBackPress}
              >
                <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Image
              source={require("../../assets/images/logo-gold.png")}
              style={styles.imagem}
            />

            <View style={styles.form}>
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

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Senha</Text>
                <Input
                  placeholder="Senha"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              {/* BOTÃO SIGN IN */}
              <TouchableOpacity
                style={[
                  styles.signInButton,
                  isLoading && styles.buttonDisabled,
                ]}
                onPress={handleLogin}
                disabled={isLoading}
              >
                <Text style={styles.signInButtonText}>
                  {isLoading ? "Carregando..." : "Entrar"}
                </Text>
              </TouchableOpacity>

              {/* BOTÃO BIOMETRIA */}
              {biometricAvailable && (
                <TouchableOpacity
                  style={styles.fingerprintButton}
                  onPress={handleBiometricButton}
                >
                  <Ionicons name="finger-print" size={32} color="#fff" />
                  <Text style={styles.biometricText}>Entrar com digital</Text>
                </TouchableOpacity>
              )}

              <Text style={styles.orText}>- ou entre com -</Text>

              {/* SOCIAL */}
              <View style={styles.socialContainer}>
                {/* Seus botões existentes */}
                {/* Botões de redes sociais */}{" "}
                <View style={styles.socialContainer}>
                  {" "}
                  <SignGoogle />{" "}
                  <TouchableOpacity
                    style={styles.socialButton}
                    onPress={handleFacebookLogin}
                  >
                    {" "}
                    <View style={styles.facebookIcon}>
                      {" "}
                      <Image
                        source={require("@/assets/images/facebook.png")}
                        style={styles.facebookImage}
                      />{" "}
                    </View>{" "}
                  </TouchableOpacity>{" "}
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
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
    marginBottom: 50,
  },
  fundologin: {
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
    marginBottom: 20,
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
  },
  // googleIcon: {
  //   width: 50,
  //   height: 50,
  //   borderRadius: 25,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginRight: 100,
  // },
  // googleImage: {
  //   width: 50,
  //   height: 50,
  // },
  facebookIcon: {
    width: 50,
    height: 50,
    backgroundColor: "#1877F2",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 100,
  },
  facebookImage: {
    width: 50,
    height: 50,
  },
  fingerprintButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 25,
    paddingVertical: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  biometricText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
  },
});
