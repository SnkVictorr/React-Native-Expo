import { BASE_URL, AUTH_TOKEN } from "../../config/api";

export async function buscarProdutos(query: string) {
  try {
    const response = await fetch(
      `${BASE_URL}/produtos/?q=${encodeURIComponent(query)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: AUTH_TOKEN,
        },
      }
    );
    const json = await response.json();

    if (json.status === "success") {
      return json.data;
    } else {
      console.error("Erro na resposta da API:", json.message);
      return [];
    }
  } catch (error) {
    console.error("Erro na busca:", error);
  } finally {
    console.log("Busca finalizada.");
  }
}
