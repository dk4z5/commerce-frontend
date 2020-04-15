import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { MessageService } from './message.service';

import { HttpParams} from "@angular/common/http";
import { ApiService } from './api.service'

import { Venda } from './venda'

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  constructor(private messageService: MessageService,
    private apiService: ApiService
  ) { }

  VendasUrl: string = "caixa/vendas/";

  getVendas(extra_tag: string = '', page: number = 1, limit: number = 100): Observable<[Venda[],number]> {
    this.messageService.add("VendaService: Dados adquiridos")
    return this.apiService.get_paginated(this.VendasUrl+extra_tag,'getVendas', [], new HttpParams()
    .set('page', page.toString() )
    .set('limit', limit.toString() )
    );
  }

  postVenda(venda: Venda): Observable<any>{
    return this.apiService.post<string>(this.VendasUrl, JSON.stringify(venda), 'postVenda');
  }
}
