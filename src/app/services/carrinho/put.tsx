import { Produto } from "../../types/produto";
import { BASE_URL, AUTH_TOKEN } from "../../config/api";
export const editCart = async (
  id_produto: number,
  cliente_id: number,
  quantidade: number
): Promise<boolean> => {
  const response = await fetch(
    `${BASE_URL}/carrinho/?cliente_id=${cliente_id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: AUTH_TOKEN,
      },
      body: JSON.stringify({
        cliente_id,
        id_produto,
        quantidade,
      }),
    }
  );

  return response.ok;
};
