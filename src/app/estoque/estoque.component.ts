import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator'

import { fromEvent, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Estoque, nullEstoque } from '../estoque'

import { EstoqueService } from '../estoque.service';
import { MessageService } from '../message.service';

import { EstoqueDataSource } from './estoqueDataSource';

import { CustomPaginatorService } from '../custom-paginator.service';

import { ProdutoSearchDialogComponent } from '../produto-search-dialog/produto-search-dialog.component';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css']
})
export class EstoqueComponent implements OnInit {

  constructor(private estoqueService: EstoqueService, private messageService: MessageService, private dialog: MatDialog) { }

  dataSource: EstoqueDataSource;

  displayedColumns: string[] = ['id', 'nome', 'preco', 'data-chegada', 'data-validade'];

  length: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  search_text: string = '';
  faltas: boolean = false;

  estoque: Estoque;
  produtoNome: string;

  @ViewChild(MatPaginator, { read: false, static: false }) paginator: MatPaginator;

  setTabIndex(index): void {
    this.faltas = false;
    this.AtualizarEstoque();
  }

  ngOnInit() {
    this.dataSource = new EstoqueDataSource(this.estoqueService);
    this.estoque = nullEstoque;
  }

  ngAfterViewInit() {
    this.length.subscribe(length => this.paginator.length = length);

    this.AtualizarEstoque();
    this.paginator.pageSize = parseInt(localStorage.getItem('paginator-size'));

    this.paginator.page
      .pipe(
        tap(data => {
          localStorage.setItem('paginator-size', data.pageSize.toString()); 
          this.AtualizarEstoque();
        })
      )
      .subscribe();
  }

  setLenght(): void {
    this.paginator.length = 100;
  }

  AtualizarEstoque(): void {
    this.dataSource.loadEstoques(
      this.faltas,
      this.search_text,
      this.paginator.pageIndex + 1,
      this.paginator.pageSize,
      this.length
    );
  }

  vencidos: boolean = false;

  AtualizarEstoque1(): void {
    var extra_tags = '';

    if (this.vencidos) {
      extra_tags += 'vencidos/'
    }

    //this.estoqueService.getEstoques(extra_tags).subscribe(estoques=>EstoqueComponent.estoques = estoques[0]);
  }

  openSearch(): void {
    const dialogRef = this.dialog.open(ProdutoSearchDialogComponent, {
      width: '400px',
      data: {
        nome: this.produtoNome
      }
    });

    dialogRef.afterClosed().subscribe(selecionado => {
      console.log('The dialog was closed');
    });
  }


  save(): void {
    console.log(this.estoque.data_validade);
  }


  mudaData(date: String): void {
    console.log(date);
    //this.estoque.data_validade = Date(date);
  }


}
