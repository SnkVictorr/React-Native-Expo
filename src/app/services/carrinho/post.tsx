import { Produto } from "../../types/produto";

export const addToCart = async (
  product: Produto,
  cliente_id: number,
  quantidade: number,
): Promise<boolean> => {
  const response = await fetch(
    `http://localhost:8080/carrinho/?cliente_id=${cliente_id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "DAenvhY03Rm2xspRZUmmKrj4PyzUNT4QjjVgK9XChTOe2yntmo9Rqbna7NcAVn2oPrZXoK8oRox6btrCuq59bdoXYaYBX8QVFcJj",
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
