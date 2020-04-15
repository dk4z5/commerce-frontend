import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator'

import { fromEvent, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ProdutoDetailComponent } from '../produto-detail/produto-detail.component';

import { Produto, nullProduto } from '../produto'
import { ProdutoDataSource } from './produtoDataSource';

import { ProdutoService } from '../produto.service';
import { MessageService } from '../message.service';
import { CustomPaginatorService } from '../custom-paginator.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit, AfterViewInit {

  constructor(private produtoService: ProdutoService, private messageService: MessageService, private dialog: MatDialog) { }

  displayedColumns: string[] = ['id', 'nome', 'preco', 'quantidade', 'acoes'];

  length: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  dataSource: ProdutoDataSource;

  // MatPaginator Output
  @ViewChild(MatPaginator, { read: false, static: false }) paginator: MatPaginator;
  @ViewChild('searchButton', { read: false, static: false }) searchInput: ElementRef;

  static newProduto: Produto = nullProduto;

  search_text: string = '';
  faltas: boolean = false;

  setTabIndex(index): void {
    if (index == 0)
      this.faltas = false;
    else if (index == 1)
      this.faltas = true;
    this.AtualizarProdutos();
  }

  get newProduto() {
    return ProdutosComponent.newProduto;
  }

  ngOnInit() {
    this.dataSource = new ProdutoDataSource(this.produtoService);
  }

  ngAfterViewInit() {
    this.length.subscribe(length => this.paginator.length = length);

    //this.dataSource.loadProdutos();
    this.AtualizarProdutos();
    this.paginator.pageSize = parseInt(localStorage.getItem('paginator-size'));

    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.AtualizarProdutos();
        })
      )
      .subscribe();

    this.paginator.page
      .pipe(
        tap(data => {
          localStorage.setItem('paginator-size', data.pageSize.toString());
          this.AtualizarProdutos();
        })
      )
      .subscribe();
  }

  AtualizarProdutos(): void {
    this.dataSource.loadProdutos(
      this.faltas,
      this.search_text,
      this.paginator.pageIndex + 1,
      this.paginator.pageSize,
      this.length
    );
  }

  openEditDialog(produto: Produto): void {
    const dialogRef = this.dialog.open(ProdutoDetailComponent, {
      //width: '400px',
      data: produto
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  save(): void {
    if (this.newProduto.descricao == null)
      this.newProduto.descricao = '';
    this.produtoService.postProduto(this.newProduto).subscribe(
      (_ => console.log("Salvo com sucesso.")),
      (err => console.log(err))
    );
  }
}
