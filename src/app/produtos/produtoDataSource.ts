import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, of, BehaviorSubject } from 'rxjs';

import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';
import { catchError, finalize } from 'rxjs/operators';

export class ProdutoDataSource implements DataSource<Produto> {

    private produtossub = new BehaviorSubject<Produto[]>([]);
    private loadingsub = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingsub.asObservable();


    private dataLen: number = 0;

    constructor(private produtoService: ProdutoService) { }

    connect(collectionViewer: CollectionViewer): Observable<Produto[]> {
        return this.produtossub.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.produtossub.complete();
        this.loadingsub.complete();
    }

    loadProdutos(faltosos: boolean = false, filter: string = '', pageIndex: number = 1, pageSize: number = 100, 
                len_ob: BehaviorSubject<number> | null = null
        ) {
        this.loadingsub.next(true);
        
        var tags: string = '';
        if ( faltosos == true )
            tags += 'faltas/'

        this.produtoService.getProdutos(tags, filter, pageIndex, pageSize).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingsub.next(false))
        ).subscribe(dados=>{
            this.produtossub.next(dados[0]);
            this.dataLen = dados[1];
            if ( len_ob != null)
                len_ob.next(this.dataLen);
        });
    }

    get length() {
        return this.dataLen;
    }
}