import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { Observable, of, BehaviorSubject } from 'rxjs';

import {Produto} from '../produto'

export class ProdutoDataSource implements DataSource<Produto> {

    public data: BehaviorSubject<Produto[]> = new BehaviorSubject<Produto[]>([]);
    constructor() {}

    connect(collectionViewer: CollectionViewer): Observable<Produto[]> {
      return this.data.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
    }

    addProduto(novo: Produto): void {
        var data = this.data.getValue();
        var prod = data.find(arrayval => arrayval.id == novo.id);
        if ( typeof(novo.quantidade) == "string")
                novo.quantidade = parseInt(novo.quantidade)

        if ( prod == undefined )
            data.push(Object.assign({}, novo));
        else {            
            prod.quantidade = prod.quantidade + novo.quantidade;
        }
        
        this.data.next(data);
    }

    clear(): void {
        this.data.next([]);
    }

    removeProdutos(produtos: Produto[]): void {
        var data = this.data.getValue();
        produtos.forEach(prod => {
            var index = data.findIndex( (val: Produto) =>{ return val.id == prod.id });

            if (index != -1) {
                data.splice(index, 1)
            }
        });

        this.data.next(data);
    }
}