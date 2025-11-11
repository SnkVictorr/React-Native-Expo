import { BASE_URL, AUTH_TOKEN } from "../../config/api";
export const deleteItemCart = async (
  id_produto: number,
  cliente_id: number
): Promise<boolean> => {
  const response = await fetch(
    `${BASE_URL}/carrinho/delete.php?cliente_id=${cliente_id}&id_produto=${id_produto}`,
    {
      method: "DELETE",
      headers: {
        authorization: AUTH_TOKEN,
      },
    }
  );
  console.log("Response from delete:", response);
  return response.ok;
};
