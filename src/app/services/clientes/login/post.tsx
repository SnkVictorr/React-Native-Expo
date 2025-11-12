import { router } from "expo-router";
import { AUTH_TOKEN, BASE_URL } from "../../../config/api";

export default async function makeLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const res = await fetch(`${BASE_URL}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${AUTH_TOKEN}`,
      },

      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok && data.status === "success") {
      router.push("/(tabs)");
    } else {
      alert(data.message || "Email ou senha inválidos.");
    }
  } catch (error) {
    console.error("Erro no login:", error);
    alert("Erro na conexão com o servidor.");
  }
}
