import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, of, BehaviorSubject } from 'rxjs';

import { Estoque } from '../estoque';
import { EstoqueService } from '../estoque.service';
import { catchError, finalize } from 'rxjs/operators';

export class EstoqueDataSource implements DataSource<Estoque> {

    private estoquessub = new BehaviorSubject<Estoque[]>([]);
    private loadingsub = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingsub.asObservable();


    private dataLen: number = 0;

    constructor(private estoqueService: EstoqueService) { }

    connect(collectionViewer: CollectionViewer): Observable<Estoque[]> {
        return this.estoquessub.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.estoquessub.complete();
        this.loadingsub.complete();
    }

    loadEstoques(faltosos: boolean = false, filter: string = '', pageIndex: number = 1, pageSize: number = 100, 
                len_ob: BehaviorSubject<number> | null = null
        ) {
        this.loadingsub.next(true);
        
        var tags: string = 'depth/';
        //if ( faltosos == true )
            //tags += 'faltas/'

        this.estoqueService.getEstoques(tags, filter, pageIndex, pageSize).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingsub.next(false))
        ).subscribe(dados=>{
            this.estoquessub.next(dados[0]);
            this.dataLen = dados[1];
            if ( len_ob != null)
                len_ob.next(this.dataLen);
        });
    }

    get length() {
        return this.dataLen;
    }
}