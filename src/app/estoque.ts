import { Produto } from "./produto"

export interface Estoque {
    id: number;
    quantidade: number;
    valido: boolean;
    data_validade: Date;
    data_chegada: Date;
    produto: Produto;
}

export const nullEstoque: Estoque = {
    id: null,
    quantidade: null,
    valido: null,
    data_validade: null,
    data_chegada: null,
    produto: null,
};