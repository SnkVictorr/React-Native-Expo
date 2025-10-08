// type Produto = {
//   idProduto: number;
//   idCategoria: number;
//   idMarca: number;
//   produto: string;
//   especificacoes: string;
//   descricao: string;
//   quantidade: number;
//   preco: number;
//   desconto: number;
//   imagem: string;
//   createdAt: Date;
//   updatedAt: Date;
// };

import { Produto } from "@/src/app/types/produto";
export const produtos: Produto[] = [
  {
    id_produto: 1,
    id_categoria: 1,
    id_marca: 1,
    produto: "Violão Fera demais VC-200 Casio Muito Bom Mesmo Quezy",
    especificacoes:
      "Tampo: Spruce | Laterais e fundo: Nato | Braço: Okoume | Trastes: 19",
    descricao:
      "O Violão Casio VC-200 é perfeito para iniciantes que buscam qualidade sonora com preço acessível. Seu design clássico e acabamento natural proporcionam ótima tocabilidade.",
    quantidade: 25,
    preco: 699.9,
    desconto: 50.0,
    imagem: "vc-200-casio.jpg",
    marca: "",
  },
  {
    id_produto: 2,
    id_categoria: 2,
    id_marca: 3,
    produto: "Guitarra Fender Stratocaster Standard",
    especificacoes:
      "Corpo: Alder | Braço: Maple | Captadores: 3x Single Coil | Ponte: Tremolo",
    descricao:
      "Ícone entre guitarristas, a Stratocaster Standard oferece timbres versáteis e construção robusta. Ideal para blues, rock e pop.",
    quantidade: 10,
    preco: 5499.9,
    desconto: 200.0,
    imagem: "stratocaster-fender.jpg",
    marca: "",
  },
  {
    id_produto: 3,
    id_categoria: 4,
    id_marca: 5,
    produto: "Teclado Korg B2SP com Pedaleira",
    especificacoes:
      "Teclas: 88 | Polifonia: 120 | Timbres: 12 | Saídas: USB/MIDI | Pedais: Inclusos",
    descricao:
      "Com timbres realistas e sensação de piano acústico, o Korg B2SP é perfeito para estudo e apresentações. Inclui pedaleira e estante.",
    quantidade: 12,
    preco: 3899.0,
    desconto: 150.0,
    imagem: "korg-b2sp.jpg",
    marca: "",
  },
  {
    id_produto: 4,
    id_categoria: 6,
    id_marca: 7,
    produto: "Saxofone Alto Selmer Paris Série II",
    especificacoes:
      "Afinação: Eb | Corpo: Latão | Acabamento: Dourado | Estojo: Incluso",
    descricao:
      "Considerado um dos melhores saxofones do mundo, o Série II é ideal para músicos avançados e profissionais. Timbre encorpado e projeção incrível.",
    quantidade: 5,
    preco: 19999.0,
    desconto: 500.0,
    imagem: "selmer-sax-serie2.jpg",
    marca: "",
  },
  {
    id_produto: 5,
    id_categoria: 9,
    id_marca: 8,
    produto: "Clarinete Yamaha YCL-255",
    especificacoes:
      "Afinação: Bb | Material: Resina ABS | Chaves: Níquel | Estojo: Incluso",
    descricao:
      "O YCL-255 é a escolha ideal para estudantes. Leve, resistente e com sonoridade clara, proporciona ótima ergonomia.",
    quantidade: 8,
    preco: 3890.0,
    desconto: 200.0,
    imagem: "yamaha-ycl-255.jpg",
    marca: "",
  },
  {
    id_produto: 6,
    id_categoria: 5,
    id_marca: 15,
    produto: "Bateria Pearl Export EXX725S",
    especificacoes:
      "Cascos: Poplar | Tom holders: Opti-Loc | Ferragens: Incluídas | Pratos: Não inclusos",
    descricao:
      "Uma das baterias mais vendidas no mundo, a Pearl Export oferece robustez e excelente custo-benefício para quem está começando.",
    quantidade: 6,
    preco: 4999.0,
    desconto: 300.0,
    imagem: "pearl-export.jpg",
    marca: "",
  },
  {
    id_produto: 7,
    id_categoria: 10,
    id_marca: 14,
    produto: "Trombone King 606",
    especificacoes:
      "Afinação: Bb | Material: Latão Dourado | Estojo: Incluso | Bocal: Prateado",
    descricao:
      "Projetado para estudantes, o trombone King 606 é leve e fácil de tocar, com timbre brilhante e projeção satisfatória.",
    quantidade: 9,
    preco: 4590.0,
    desconto: 250.0,
    imagem: "king-606.jpg",
    marca: "",
  },
  {
    id_produto: 8,
    id_categoria: 3,
    id_marca: 4,
    produto: "Baixo Gibson Thunderbird IV",
    especificacoes:
      "Corpo: Mahogany | Escala: Rosewood | Captadores: Dual Humbucker",
    descricao:
      "Com visual arrojado e som potente, o Thunderbird é ideal para baixistas que buscam presença sonora e estilo.",
    quantidade: 4,
    preco: 8790.0,
    desconto: 500.0,
    imagem: "gibson-thunderbird.jpg",
    marca: "",
  },
  {
    id_produto: 9,
    id_categoria: 12,
    id_marca: 11,
    produto: "Tuba Weril BCF440L",
    especificacoes:
      "Afinação: Bb | Válvulas: 4 | Acabamento: Laqueado | Estojo: Incluso",
    descricao:
      "A Weril BCF440L é uma excelente escolha para bandas e escolas de música. Som encorpado e durabilidade garantida.",
    quantidade: 3,
    preco: 13990.0,
    desconto: 800.0,
    imagem: "tuba-weril.jpg",
    marca: "",
  },
  {
    id_produto: 10,
    id_categoria: 7,
    id_marca: 10,
    produto: "Trompete Jupiter JTR700",
    especificacoes:
      "Afinação: Bb | Acabamento: Laqueado | Pistões: Aço inox | Estojo: Incluso",
    descricao:
      "Compacto e eficiente, o JTR700 é ideal para estudantes que buscam um instrumento de qualidade com excelente resposta.",
    quantidade: 7,
    preco: 3190.0,
    desconto: 150.0,
    imagem: "jupiter-jtr700.jpg",
    marca: "",
  },
];
