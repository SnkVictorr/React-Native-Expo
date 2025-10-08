export interface Produto {
  id_produto: number;
  id_categoria: number;
  id_marca: number;
  produto: string;
  especificacoes: string | null;
  descricao: string | null;
  quantidade: number;
  imagem: string;
  preco: number;
  desconto: number;
  marca: string;
}
