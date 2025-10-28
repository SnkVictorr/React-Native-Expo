export default interface ItemCarrinho {
  id_produto: number;
  id_carrinho: number;
  cliente_id: number;
  produto: string;
  preco: number;
  desconto: number;
  quantidade: number;
  imagem: string;
}