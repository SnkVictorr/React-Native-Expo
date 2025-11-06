import { ApiService } from "./ApiService";
import { Produto } from "../../types/produto";

export class FavoritosService extends ApiService<Produto> {
  constructor() {
    super(
      "http://localhost:8080/favoritos",
      "stNOJvYxgbX3bRg3CEGMTNiqnIO3TMMHPi8K3ehLzk3KqcN3tJbDnBdMwWvAj84r2fiKvaAxQC58i1BsR5iqjBzzscwMudNv8xL6"
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
