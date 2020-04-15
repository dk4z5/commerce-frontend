import { VendaProduto } from './produto';

export interface Venda{
    data: Date,
    cliente: string,
    preco_total: number,
    id: number,
    produtos: VendaProduto[];
    desconto: number,
    recebido: number,
    pagamento: string;
}