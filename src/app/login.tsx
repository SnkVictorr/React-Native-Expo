// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
//   Image,
//   ImageBackground,
// } from 'react-native';
// import { router } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Erro', 'Por favor, preencha todos os campos');
//       return;
//     }

//     setIsLoading(true);
    
//     // Simular chamada de API
//     setTimeout(() => {
//       setIsLoading(false);
//       Alert.alert('Sucesso', 'Login realizado com sucesso!');
//     }, 2000);
//   };

//   const handleGoogleLogin = () => {
//     Alert.alert('Google Login', 'Função não implementada');
//   };

//   const handleFacebookLogin = () => {
//     Alert.alert('Facebook Login', 'Função não implementada');
//   };

//   const handleBackPress = () => {
//     router.navigate("/")
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ImageBackground 
//         source={require("../../assets/images/fundo-login.jpeg")} 
//         style={styles.fundologin}
//       >
//         {/* Overlay para opacidade apenas na imagem */}
//         <View style={styles.overlay} />

//         <KeyboardAvoidingView 
//           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//           style={styles.keyboardView}
//         >
//           <View style={styles.content}>
//             {/* Header com botão voltar */}
//             <View style={styles.headerContainer}>
//               <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
//                 <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
//               </TouchableOpacity>
//             </View>

//             <Image source={require("../../assets/images/logo-gold.png")} style={styles.imagem}></Image>

//             {/* Título */}
//             <View style={styles.titleContainer}>
//               <Text style={styles.title}>Login to your Account</Text>
//             </View>

//             {/* Form */}
//             <View style={styles.form}>
//               {/* Campo Email */}
//               <View style={styles.inputContainer}>
//                 <Text style={styles.label}>Email</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Email"
//                   placeholderTextColor="#A0A0A0"
//                   value={email}
//                   onChangeText={setEmail}
//                   keyboardType="email-address"
//                   autoCapitalize="none"
//                   autoCorrect={false}
//                 />
//               </View>

//               {/* Campo Password */}
//               <View style={styles.inputContainer}>
//                 <Text style={styles.label}>Password</Text>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Password"
//                   placeholderTextColor="#A0A0A0"
//                   value={password}
//                   onChangeText={setPassword}
//                   secureTextEntry
//                 />
//               </View>

//               {/* Botão Sign In */}
//               <TouchableOpacity 
//                 style={[styles.signInButton, isLoading && styles.buttonDisabled]}
//                 onPress={handleLogin}
//                 disabled={isLoading}
//               >
//                 <Text style={styles.signInButtonText}>
//                   {isLoading ? 'Carregando...' : 'Sign In'}
//                 </Text>
//               </TouchableOpacity>

//               {/* Texto "Or sign in with" */}
//               <Text style={styles.orText}>- Or sign in with -</Text>

//               {/* Botões de redes sociais */}
//               <View style={styles.socialContainer}>
//                 <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
//                   <View style={styles.googleIcon}>
//                     <Text style={styles.googleText}>G</Text>
//                   </View>
//                 </TouchableOpacity>

//                 <TouchableOpacity style={styles.socialButton} onPress={handleFacebookLogin}>
//                   <View style={styles.facebookIcon}>
//                     <Text style={styles.facebookText}>f</Text>
//                   </View>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </KeyboardAvoidingView>
//       </ImageBackground>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   keyboardView: {
//     flex: 1,
//     zIndex: 2,
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0, 0, 0, 0.377)", // opacidade só na imagem
//     zIndex: 1,
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 30,
//   },
//   headerContainer: {
//     marginTop: 20,
//     marginBottom: 40,
//   },
//   backButton: {
//     width: 40,
//     height: 40,
//     marginTop: 30,
//     justifyContent: 'center',
//   },
//   imagem:{
//     width: 80,
//     height: 80,
//     alignSelf: "center",
//     marginBottom: 60
//   },
//   fundologin:{
//     flex: 1,
    
//   },
//   titleContainer: {
//     alignItems: 'center',
//     marginBottom: 40,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#d4af37',
//     textAlign: 'center',
//   },
//   form: {
//     flex: 1,
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     color: '#ececec',
//     marginBottom: 8,
//     fontWeight: 'bold',
//   },
//   input: {
//     backgroundColor: '#e4dddd',
//     borderRadius: 25,
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     fontSize: 18,
//     color: '#333333',
//   },
//   signInButton: {
//     backgroundColor: '#D4AF37',
//     borderRadius: 25,
//     fontWeight: 'bold',
//     paddingVertical: 15,
//     alignItems: 'center',
//     marginTop: 20,
//     marginBottom: 40,
//   },
//   buttonDisabled: {
//     opacity: 0.6,
//   },
//   signInButtonText: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   orText: {
//     color: '#ffffff',
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginTop: 10,
//     textAlign: 'center',
//     marginBottom: 30,
//   },
//   socialContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     gap: 30,
//   },
//   socialButton: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   googleIcon: {
//     width: 50,
//     height: 50,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   googleText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#4285F4',
//   },
//   facebookIcon: {
//     width: 50,
//     height: 50,
//     backgroundColor: '#1877F2',
//     borderRadius: 25,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   facebookText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//   },
// });
