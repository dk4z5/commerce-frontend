import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProdutosComponent } from './produtos/produtos.component'
import { EstoqueComponent } from './estoque/estoque.component'
import { DashboardComponent }   from './dashboard/dashboard.component';
import { ProdutoDetailComponent }  from './produto-detail/produto-detail.component';
import { VendasComponent } from './vendas/vendas.component';
import { CaixaGridComponent } from './caixa-grid/caixa-grid.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard' , pathMatch: 'full'},
  { path: 'produtos', component: ProdutosComponent },
  { path: 'produtos/:id', component: ProdutoDetailComponent },
  { path: 'caixa-tabela', component: CaixaGridComponent },
  { path: 'estoques', component: EstoqueComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'vendas', component: VendasComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
