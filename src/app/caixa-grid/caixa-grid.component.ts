import { Component, OnInit, Inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { SelectionModel, DataSource } from '@angular/cdk/collections';

import { Produto, VendaProduto } from '../produto'
import { ProdutoService } from '../produto.service'

import { VendaService } from '../venda.service';
import { Venda } from '../venda';

import { MessageService} from '../message.service';

import { ProdutoDataSource } from './data-source'
import { ProdutoSearchDialogComponent } from '../produto-search-dialog/produto-search-dialog.component';

@Component({
  selector: 'app-caixa-grid',
  templateUrl: './caixa-grid.component.html',
  styleUrls: ['./caixa-grid.component.css']
})
export class CaixaGridComponent implements OnInit {

  constructor(private produtoService: ProdutoService, private vendaService: VendaService, private dialog: MatDialog, private msgService: MessageService) { }

  dataSource: ProdutoDataSource;
  displayedColumns: string[] = ['select', 'id', 'nome', 'quantidade', 'preco'];
  selection = new SelectionModel<Produto>(true, []);

  venda: Venda;
  teste: string;
  produto: Produto;
  produtoTable: Produto[];
  valorTotalDesc: number;
  valorTotal: number;
  troco: number;

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.getValue().length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.getValue().forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Produto): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  addProduto(): void {
    if ( this.produto.desconto == null )
      this.produto.desconto = 0;
    this.dataSource.addProduto(this.produto);
  }

  updateTotal(produtos: Produto[]): void {
    var total: number = 0;
    var total_desc: number = 0;
    produtos.forEach(prod => {
      total_desc += (prod.preco_base - prod.preco_base*prod.desconto/100)*prod.quantidade;
      total += prod.preco_base*prod.quantidade;
    });
    this.valorTotal = total;
    this.valorTotalDesc  = total_desc;
    this.valorTotalDesc -= this.valorTotalDesc*(this.venda.desconto/100)
  }

  clearProduto(): void {
    this.produto = {
      id: null,
      nome: null,
      descricao: null,
      quantidade: null,
      quantidade_alerta: null,
      desconto: null,
      preco_base: null,
      data_insercao: null
    };
  }

  getByCode(): void {
    var pk = this.produto.id;
    if (pk == null)
      return;
    this.produtoService.getProduto(pk).subscribe(
      (prod) => {
        prod.quantidade = 1;
        this.produto = prod;
      },
      (error) => console.log('Error Found'));
  }

  resetVenda(): void {
    this.venda = {
      cliente: "Anonimo",
      data: new Date(),
      preco_total: null,
      id: null,
      produtos: [],
      desconto: null,
      pagamento: '',
      recebido: 0
    };
  }

  ngOnInit() {

    this.resetVenda();

    this.clearProduto();

    this.dataSource = new ProdutoDataSource();
    this.dataSource.data.subscribe(data => {
      this.updateTotal(data);
    });

    this.valorTotal = 0;
  }

  openSearch(): void {
    const dialogRef = this.dialog.open(ProdutoSearchDialogComponent, {
      width: '400px',
      data: this.produto
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  fecharCompra(): void {

    if ( this.venda.pagamento == null ){
      this.msgService.show("Modalidade de pagamento não selecionada.");
      return;
    }

    if ( this.dataSource.data.getValue().length == 0 )
    {
      this.msgService.show("Adicione produtos!");
      return;
    }

    this.dataSource.data.value.forEach(prod => {
      var vprod: VendaProduto = {
        produto: prod.id,
        quantidade: prod.quantidade,
        desconto: 0
      }

      if ( prod.desconto != null )
        vprod.desconto = prod.desconto;

      this.venda.produtos.push(vprod);
    });


    if ( this.venda.desconto == null )
      this.venda.desconto = 0;
    this.vendaService.postVenda(this.venda).subscribe(
      (_ => {
        this.resetVenda();
        this.dataSource.clear();
        this.selection.clear();
        this.selection.changed.next();
        this.msgService.show("Venda efetuada com sucesso.");
      }),
      (err => {
        console.log(err);
        this.msgService.show("Falha ao efetuar venda.");
      })
    );
  }

  removerSelect(): void {
    if ( this.selection.selected.length == 0 ){
      this.msgService.show("Nenhum produto selecionado.");
      return;
    }
    this.dataSource.removeProdutos(this.selection.selected);
    this.selection.clear();
  }

  updateTroco(data: string): void{
    if ( this.venda.pagamento == null || this.venda.pagamento != 'money' )
      this.troco = null;
    else if ( this.venda.recebido < this.valorTotalDesc || this.venda.recebido == 0)
      this.troco = null;
    else
      this.troco = this.venda.recebido - this.valorTotalDesc;
  }
}