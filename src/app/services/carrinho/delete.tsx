export const deleteItemCart = async (
  id_produto: number,
  cliente_id: number,
): Promise<boolean> => {
  const response = await fetch(
    `http://localhost:8080/carrinho/delete.php?cliente_id=${cliente_id}&id_produto=${id_produto}`,
    {
      method: "DELETE",
      headers: {
        authorization: "DAenvhY03Rm2xspRZUmmKrj4PyzUNT4QjjVgK9XChTOe2yntmo9Rqbna7NcAVn2oPrZXoK8oRox6btrCuq59bdoXYaYBX8QVFcJj",
      },
    },
  );
  console.log("Response from delete:", response);
  return response.ok;
};
