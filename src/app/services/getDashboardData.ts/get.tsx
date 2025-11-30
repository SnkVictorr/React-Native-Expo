import { BASE_URL } from "../../config/api";

export async function getDashboardData(clienteId: number) {
  try {
    const res = await fetch(`${BASE_URL}/clientes/?id=${clienteId}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Erro ao carregar dashboard:", err);
    return null;
  }
}
