import { ApiService } from "./ApiService";
import { Produto } from "../../types/produto";
import { BASE_URL, AUTH_TOKEN } from "../../config/api";
export class FavoritosService extends ApiService<Produto> {
  constructor() {
    super(
      `${BASE_URL}/favoritos`,
      AUTH_TOKEN  
    );
  }
  async getByClienteId(clienteId: number): Promise<Produto[]> {
    const response = await fetch(`${this._baseUrl}?cliente_id=${clienteId}`, {
      method: "GET",
      headers: this._headers,
    });
    if (!response.ok) {
      throw new Error("Erro ao buscar cliente");
    }
    const favoritos = await response.json();
    return favoritos.data;
  }

  async switchFavorite(data: {
    cliente_id: number | string;
    id_produto: number | string;
  }): Promise<any> {
    const res = await fetch(this._baseUrl, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  }
}
