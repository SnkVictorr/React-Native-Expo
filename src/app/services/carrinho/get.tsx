export const fetchCarrinho = async (cliente_id: number) => {
  const url = `http://localhost:8080/carrinho/?cliente_id=8`;

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      authorization:
        "stNOJvYxgbX3bRg3CEGMTNiqnIO3TMMHPi8K3ehLzk3KqcN3tJbDnBdMwWvAj84r2fiKvaAxQC58i1BsR5iqjBzzscwMudNv8xL6",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  console.log("Carrinho fetched:", result);

  return Array.isArray(result.carrinho) ? result.carrinho : [];
};
