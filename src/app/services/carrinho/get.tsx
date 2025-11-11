import { BASE_URL, AUTH_TOKEN } from "../../config/api";

export const fetchCarrinho = async (cliente_id: number) => {
  const url = `${BASE_URL}/carrinho/?cliente_id=${cliente_id}`;

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      authorization: AUTH_TOKEN,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  console.log("Carrinho fetched:", result);

  return Array.isArray(result.carrinho) ? result.carrinho : [];
};
