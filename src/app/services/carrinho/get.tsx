export const fetchCarrinho = async (cliente_id: number) => {
  const url = `http://localhost:8080/carrinho/?cliente_id=${cliente_id}`;

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      authorization: "DAenvhY03Rm2xspRZUmmKrj4PyzUNT4QjjVgK9XChTOe2yntmo9Rqbna7NcAVn2oPrZXoK8oRox6btrCuq59bdoXYaYBX8QVFcJj",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  console.log("Carrinho fetched:", result);

  return Array.isArray(result.carrinho) ? result.carrinho : [];
};
