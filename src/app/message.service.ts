import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  
  constructor(private _snackBar: MatSnackBar) {
  }

  messages: string[] = [];

  add(message: string): void{
    console.log("message");
  }

  show(message: string, duration: number = 5000) {
    console.log(message);
    this._snackBar.open(message,null, { duration: duration });
  }

  clear() {
    this.messages = [];
  }
}
