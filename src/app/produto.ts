export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  quantidade: number;
  quantidade_alerta: number;
  desconto: number;
  preco_base: number;
  data_insercao: Date;
};

export const nullProduto: Produto = {
  id: null,
  nome: null,
  descricao: null,
  quantidade: null,
  quantidade_alerta: null,
  desconto: null,
  preco_base: null,
  data_insercao: null
};

export interface VendaProduto {
  produto: number;
  quantidade: number;
  desconto: number;
}