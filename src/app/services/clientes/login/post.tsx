import { AUTH_TOKEN, BASE_URL } from "../../../config/api";

export async function makeLogin({
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
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    console.log("data do login:", data);

    if (!res.ok) {
      throw new Error(data?.error || data?.message || "Erro no login");
    } else {
    }

    return data; // ✅ já retorna o JSON processado
  } catch (error) {
    throw error;
  }
}
