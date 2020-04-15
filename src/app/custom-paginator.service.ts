import {MatPaginatorIntl} from '@angular/material/paginator';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomPaginatorService extends MatPaginatorIntl{

  constructor() {
    super();
    this.setTexts();
   }

   setTexts(): void{
    this.itemsPerPageLabel = "Itens por pagina"
    this.nextPageLabel = "Proxima";
    this.previousPageLabel = "Anterior";
   }

   getRangeLabel = (page: number, pageSize: number, length: number) =>  {
    if (length === 0 || pageSize === 0) {
      return `0 / ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} / ${length}`;
  }

  getRequestFlags(): string{
    return '';
  }
}
