import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Venda } from '../venda'
import { VendaService } from '../venda.service'

//import { PaginatorComponent } from '../paginator-component';

import { VendasDataSource } from './vendasDataSource';

import { tap } from 'rxjs/operators';

import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css']
})
export class VendasComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, { read: false, static: false }) paginator: MatPaginator;

  constructor(private vendaService: VendaService) { }
  
  length: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  dataSource: VendasDataSource;
  displayedColumns = ['cliente', 'total', 'recebido', 'data'];

  ngOnInit() {
    this.dataSource = new VendasDataSource(this.vendaService);
  }

  ngAfterViewInit() {
    this.length.subscribe(
      length => {
        this.paginator.length = length
      }
    );

    this.updateVendas();

    this.paginator.pageSize = parseInt(localStorage.getItem('paginator-size'));

    this.paginator.page
      .pipe(
        tap( data => {
          localStorage.setItem('paginator-size', data.pageSize.toString());
          this.updateVendas() 
        })
      )
      .subscribe();
  }

  updateVendas(): void {
    this.dataSource.load(
        this.paginator.pageIndex+1,
        this.paginator.pageSize,
        this.length
      );
  }

}
