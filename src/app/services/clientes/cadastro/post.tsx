import { AUTH_TOKEN, BASE_URL } from "../../../config/api";

export async function makeCadastro({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  try {
    const res = await fetch(`${BASE_URL}/cadastro/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${AUTH_TOKEN}`,
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error || data?.message || "Erro no cadastro");
    }

    return data; // ✅ já retorna o JSON processado
  } catch (error) {
    console.error("Erro no makeCadastro:", error);
    throw error;
  }
}
