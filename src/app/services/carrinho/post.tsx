import { Produto } from "../../types/produto";
import { BASE_URL, AUTH_TOKEN } from "../../config/api";
export const addToCart = async (
  product: Produto,
  cliente_id: number,
  quantidade: number,
): Promise<boolean> => {
  const response = await fetch(
    `${BASE_URL}/carrinho/?cliente_id=${cliente_id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: AUTH_TOKEN,
      },
      credentials: "include",
      body: JSON.stringify({
        cliente_id,
        id_produto: product.id_produto,
        quantidade,
      }),
    },
  );

  return response.ok;
};
