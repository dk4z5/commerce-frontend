import { Component, OnInit } from '@angular/core';

import { Produto } from '../produto'
import { ProdutoService } from '../produto.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
