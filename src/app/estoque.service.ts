import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { MessageService } from './message.service';
import { ApiService } from './api.service'

import { HttpParams} from "@angular/common/http";
import { Estoque } from './estoque'

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {

  constructor(private messageService: MessageService,
    private apiService: ApiService
) { }

    estoqueUrl: string = 'estoque/estoques/';

    getEstoques(tag : string = '',search: string = '', page: number = 1, limit: number = 100): Observable<[Estoque[], number]> {
      this.messageService.add("EstoqueService: Dados adquiridos")
      return this.apiService.get_paginated(this.estoqueUrl+tag,'getProdutos', [], new HttpParams()
      .set('search', search)
      .set('page', page.toString() )
      .set('limit', limit.toString() )
      );
    }
  
    getEstoque(id: number): Observable<Estoque> {
      this.messageService.add("EstoqueService: Dado adquirido ID: "+id)
      return this.apiService.get<Estoque>(this.estoqueUrl+`${id}/`, 'getEstoque', '')
    }

}
