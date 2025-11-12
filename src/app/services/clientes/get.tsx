import { BASE_URL, AUTH_TOKEN } from "../../config/api";

export const getClienteId = async (): Promise<number | null> => {
  try {
    const res = await fetch(`${BASE_URL}/login/session.php`, {
      method: "GET",
      credentials: "include", // necessário para enviar cookies da sessão
      headers: {
        "Content-Type": "application/json",
        Authorization: `${AUTH_TOKEN}`,
      },
    });

    const data = await res.json();
    if (data.status === "success") {
      return data.cliente_id;
    }

    return null;
  } catch (error) {
    console.error("Erro ao buscar cliente_id:", error);
    return null;
  }
};
