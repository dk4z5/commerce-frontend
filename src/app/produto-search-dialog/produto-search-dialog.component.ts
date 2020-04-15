import { Component, OnInit, Inject, ViewChild, TemplateRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Produto } from '../produto'
import { ProdutoService } from '../produto.service'

import { MessageService } from '../message.service';

@Component({
  selector: 'app-produto-search-dialog',
  templateUrl: './produto-search-dialog.component.html',
  styleUrls: ['./produto-search-dialog.component.css'],
})
export class ProdutoSearchDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProdutoSearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public produtoInfo: Produto,
    private produtoService: ProdutoService,
    private _snackBar: MatSnackBar,
    private msgService: MessageService
  ) { }

  @ViewChild('snackBarTemplate', { read: false, static: false })
  snackBarTemplate: TemplateRef<any>;

  displayedColumns: string[] = ['id', 'nome', 'preco', 'descricao'];
  produtos: Produto[];
  selProduto: Produto | null = null;

  ngOnInit() {
    this.updateSearch();
  }

  updateSearch(): void {
    if (this.produtoInfo.nome == null) {
      console.log("null info")
      return;
    }
    console.log(this.produtoInfo);
    this.produtoService.getProdutos('', this.produtoInfo.nome).subscribe(dados => this.produtos = dados[0]);
  }

  closeDialog(prod: Produto): void {
    Object.assign(this.produtoInfo, prod);
    this.produtoInfo.quantidade = 1;
    this.dialogRef.close();
  }

  openSnack(event: MouseEvent, prod: Produto): void {
    event.preventDefault();
    event.stopPropagation();
    this.msgService.show(prod.descricao, 5000);
    //alert(prod.descricao);
    return;
    this.selProduto = prod;
    this._snackBar.openFromTemplate(this.snackBarTemplate, { duration: 5 * 1000 });
  }
}