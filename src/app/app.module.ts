import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/br'
import localePtExtra from '@angular/common/locales/extra/br'
registerLocaleData(localePt, 'pt', localePtExtra)

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // <-- NgModel lives here

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginatorService } from "./custom-paginator.service"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { ProdutoDetailComponent } from './produto-detail/produto-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EstoqueComponent } from './estoque/estoque.component';
import { VendasComponent } from './vendas/vendas.component';
import { CaixaGridComponent } from './caixa-grid/caixa-grid.component';
import { ProdutoSearchDialogComponent } from './produto-search-dialog/produto-search-dialog.component';
import { LoginComponent } from './login/login.component';

import { JwtModule } from "@auth0/angular-jwt";
import { AuthenticationService, getToken } from './authentication.service';

import { JwtInterceptor } from './JwtInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    ProdutosComponent,
    ProdutoDetailComponent,
    MessagesComponent,
    DashboardComponent,
    SidebarComponent,
    EstoqueComponent,
    VendasComponent,
    CaixaGridComponent,
    ProdutoSearchDialogComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

    LayoutModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatCardModule,
    MatTableModule,
    MatSnackBarModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSelectModule,
    MatProgressSpinnerModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        whitelistedDomains: ["localhost"],
        blacklistedRoutes: ["localhost/examplebadroute/"]
      }
    })
  ],
  providers: [
    //{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    { provide: MatPaginatorIntl, useClass: CustomPaginatorService },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ProdutoSearchDialogComponent]
})
export class AppModule { }
