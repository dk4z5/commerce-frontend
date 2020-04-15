import { Component, OnInit, Input, Inject, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


import { Produto } from '../produto';
import { ProdutoService } from '../produto.service'

@Component({
  selector: 'app-produto-detail',
  templateUrl: './produto-detail.component.html',
  styleUrls: ['./produto-detail.component.css']
})
export class ProdutoDetailComponent implements OnInit {
  
  @Input() produto: Produto;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    @Optional() public dialogRef: MatDialogRef<ProdutoDetailComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public produtoInfo: Produto,
    private produtoService: ProdutoService) { }

  ngOnInit() {
    if ( this.produtoInfo )
      this.produto = this.produtoInfo;
    else this.getHero();
  }

  getHero(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.produtoService.getProduto(id).subscribe(produto=>this.produto=produto)
  }

  goBack(): void{
    if ( this.dialogRef != null ){
      this.dialogRef.close();
      return;
    }
    this.location.back();
  }

  save(): void{
    this.produtoService.patchProduto(this.produto).subscribe(
      (_=>this.goBack()),
      (_=>alert("Erro ao salvar."))
      );
  }
}
