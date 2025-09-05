import React, { useState } from 'react';
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
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Input from '../components/input';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setIsLoading(true);

    //Aguarda 2 segundos para simular chamada de API
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);

    //Aguarda o clique no botão do alert
    await new Promise((resolve) => {
      Alert.alert(
        'Sucesso',
        'Login realizado com sucesso!',
        [
        {
          text: 'OK',
          onPress: () => resolve(true),
        },
        ],
        { cancelable: false }
      );
    });

    //Navega para a tela principal
    router.push('/(tabs)');
  };

  const handleGoogleLogin = () => {
    Alert.alert('Google Login', 'Função não implementada');
  };

  const handleFacebookLogin = () => {
    Alert.alert('Facebook Login', 'Função não implementada');
  };

  const handleBackPress = () => {
    router.navigate('/dashboard');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/fundologin.jpeg')}
        style={styles.fundologin}
        resizeMode="cover"
      >
        {/* Overlay para escurecer a imagem e melhorar contraste */}
        <View style={styles.overlay} />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.content}>
            {/* Header com botão voltar */}
            <View style={styles.headerContainer}>
              <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Image
              source={require('../../assets/images/logo-gold.png')}
              style={styles.imagem}
            />

            {/* Form */}
            <View style={styles.form}>
              {/* Campo Email */}
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
                <Text style={styles.label}>Password</Text>
                <Input
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />

              </View>

              {/* Botão Sign In */}
              <TouchableOpacity
                style={[styles.signInButton, isLoading && styles.buttonDisabled]}
                onPress={handleLogin}
                disabled={isLoading}
              >
                <Text style={styles.signInButtonText}>
                  {isLoading ? 'Carregando...' : 'Sign In'}
                </Text>
              </TouchableOpacity>

              {/* Texto "Or sign in with" */}
              <Text style={styles.orText}>- Or sign in with -</Text>

              {/* Botões de redes sociais */}
              <View style={styles.socialContainer}>
                <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
                  <View style={styles.googleIcon}>
                    <Image source={require('../../assets/images/google.png')} style={styles.googleImage} />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.socialButton} onPress={handleFacebookLogin}>
                  <View style={styles.facebookIcon}>
                    <Image source={require("@/assets/images/facebook.png")} style={styles.facebookImage} />
                  </View>
                </TouchableOpacity>
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // escurece só a imagem
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
    justifyContent: 'center',
  },
  imagem: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    marginBottom: 50,
  },
  fundologin: {
    flex: 1,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#d4af37',
    textAlign: 'center',
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#ececec',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.85)', // translúcido
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
  },
  signInButton: {
    backgroundColor: '#D4AF37',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  orText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 20,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 100,
  },
  googleImage: {
    width: 50,
    height: 50,
  },
  facebookIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#1877F2',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 100,
  },
  facebookImage: {
    width: 50,
    height: 50 ,
  },
});
