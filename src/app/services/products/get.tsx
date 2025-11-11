import { BASE_URL, AUTH_TOKEN } from "../../config/api";
export default function getProducts(idProduto?: number) {
  // const produtos = fetch("http://192.168.1.2:8080/produtos", {

  // Se idProduto for fornecido, busca o produto específico
  const produtos = fetch(
    `${BASE_URL}/produtos${idProduto ? `/?id=${idProduto}` : ""}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: AUTH_TOKEN,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data.data)
    .catch((error) => console.error(error));

  return produtos;
}
