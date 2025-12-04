import { BASE_URL, AUTH_TOKEN } from "../../config/api";

interface GetProductsParams {
  idProduto?: number; // /produtos?idProduto=10
  id_principal?: string | string[]; // /produtos?id_principal=3
  id_marca?: string | string[]; // /produtos?id_marca=5
}

export default async function getProducts(params?: GetProductsParams) {
  try {
    const query = new URLSearchParams();
    console.log("getProducts params:", params);
    if (params?.idProduto) query.append("id", String(params.idProduto));
    if (params?.id_principal)
      query.append("id_principal", String(params.id_principal));
    if (params?.id_marca) query.append("id_marca", String(params.id_marca));
    let url: string;

    if (Array.from(query).length === 0) {
      // Se não houver parâmetros, retorna todos os produtos
      url = `${BASE_URL}/produtos/`;
    } else {
      url = `${BASE_URL}/produtos?${query.toString()}`;
    }
    console.log("Fetching products from URL:", url);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `${AUTH_TOKEN}`,
      },
    });

    const res = await response.json();
    return res.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return null;
  }
}
