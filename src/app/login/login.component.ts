import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

import { AuthenticationService } from '../authentication.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usernameFormControl = new FormControl('', [
    Validators.required,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);


  username: string = '';
  password: string = '';

  constructor(private authService: AuthenticationService, private msgService: MessageService) { }

  ngOnInit() {
  }


  entrar() {
    if ( this.username == '' || this.password == '' ) {
      this.msgService.show('Campo de usuário ou senha não preenchido.');
      return;
    }

    this.authService.login(this.username, this.password).subscribe(dados => {
      console.log(dados);
      if ( dados.error == true ){
        this.msgService.show('Login ou senha invalido.');
        return;
      }

      localStorage.setItem('token', dados.token);
    })
  }

}
