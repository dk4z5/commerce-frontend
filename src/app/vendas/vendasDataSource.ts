import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, of, BehaviorSubject } from 'rxjs';

import { catchError, finalize } from 'rxjs/operators';

import { Venda } from '../venda';
import { VendaService} from '../venda.service';

export class VendasDataSource implements DataSource<Venda>{

    private dataLen: number;

    private vendasSub = new BehaviorSubject<Venda[]>([]);

    constructor(private vendaService: VendaService){ }

    connect(collectionViewer: CollectionViewer): Observable<Venda[]> {
        return this.vendasSub.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.vendasSub.complete();
    }

    load( pageIndex: number = 1, 
          pageSize: number = 100, 
          len_ob: BehaviorSubject<number> | null = null
        ) {
        this.vendaService.getVendas('', pageIndex, pageSize)
        .subscribe(
            dados => {
                this.vendasSub.next(dados[0]);
                this.dataLen = dados[1];
                if ( len_ob != null )
                    len_ob.next(dados[1]);
            }
        )
    }

    get length() {
        return this.dataLen;
    }
}