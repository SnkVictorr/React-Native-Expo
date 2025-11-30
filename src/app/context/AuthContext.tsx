import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";



type AuthContextType = {
  user: any | null;
  setUser: (user: any | null) => void;
  loading: boolean;
  login: (user: any) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => {},
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  console.log("AuthProvider renderizado. Usuário atual:", user);

  // 🔹 Carregar usuário ao abrir o app
  useEffect(() => {
    async function loadUser() {
      const storedUser = await AsyncStorage.getItem("user");
      console.log("storedUser:", storedUser);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  // 🔹 Login
  async function login(userData: any) {
    console.log("Salvando usuário:", userData);
    await AsyncStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  }

  // 🔹 Logout
  async function logout() {
    await AsyncStorage.removeItem("user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
