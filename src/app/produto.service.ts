import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { MessageService } from './message.service';

import { HttpParams} from "@angular/common/http";
import { ApiService } from './api.service'

import { Produto } from './produto'

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private messageService: MessageService,
              private apiService: ApiService
    ) { }

    produtosUrl: string = "estoque/produtos/";

  getProdutos(tag : string = '',search: string = '', page: number = 1, limit: number = 100): Observable<[Produto[], number]> {
    this.messageService.add("ProdutoService: Adquirindo dados")
    return this.apiService.get_paginated(this.produtosUrl+tag,'getProdutos', [], new HttpParams()
    .set('search', search)
    .set('page', page.toString() )
    .set('limit', limit.toString() )
    );
  }

  getProduto(id: number): Observable<Produto> {
    this.messageService.add("ProdutoService: Dado adquirido ID: "+id)
    return this.apiService.get<Produto>(this.produtosUrl+`${id}/`, 'getProduto', '')
  }

  patchProduto(produto: Produto): Observable<any>{
    return this.apiService.patch<Produto>(this.produtosUrl+`${produto.id}/`, produto, 'patchProduto');
  }

  postProduto(produto: Produto): Observable<any>{
    return this.apiService.post<Produto>(this.produtosUrl, produto, 'postProduto');
  }
}
