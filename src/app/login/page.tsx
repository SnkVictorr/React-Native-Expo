import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { styles } from "./styles";

import { FontAwesome, AntDesign } from "@expo/vector-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Logic for login
    console.log("Login with:", email, password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require("../../../assets/images/logo-gold.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Login to your account</Text>
        <Text style={styles.label}>Your number & email address</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="email@domain.com"
        />
        <Text style={styles.label}>Enter your password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="********"
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>

        <Text style={styles.linkText}>Forgot password?</Text>

        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="facebook" size={32} color="#1877F2" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <AntDesign name="google" size={32} />
        </TouchableOpacity>
        <Text style={styles.linkText}>
          Don't have an account? Create an account
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;
