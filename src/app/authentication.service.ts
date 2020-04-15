import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ApiService } from './api.service'

import { JwtHelperService } from '@auth0/angular-jwt';

import { Usuario } from './usuario';

export function getToken() {
  return '';
}

export function setToken(token){
  
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  static auth_bool : boolean;
  static timerLoged = null;
  static setup_timer(): void {
    if ( AuthenticationService.timerLoged != null )
      return;

    const jwtHelper = new JwtHelperService();

    AuthenticationService.timerLoged = timer(500,1000);
    AuthenticationService.timerLoged.subscribe(
      _ => {
        const token = localStorage.getItem('token');
        
        //AuthenticationService.auth_bool = !this.jwtHelper.isTokenExpired(token);
        AuthenticationService.auth_bool = !jwtHelper.isTokenExpired(token);
        console.log("rodando");
      }
    );
  }
  
  loginUrl: string = 'api/login/';
  userDetailUrl: string = 'api/user-detail/';
  
  usuario: Usuario = {
    nome: 'recebendo dados.',
    last_login: null
  };

  constructor(private apiService: ApiService) { }
  
  login(user: string, pass: string): Observable<any>{
    return this.apiService.post(this.loginUrl, {username: user, password: pass}, 'postLogin').pipe(
      map(user=>{
        var data = JSON.parse(user);
        localStorage.setItem('currentUser', data);
        return data;
      }),
      catchError((err, caught) => {
        var error = JSON.parse(err.error);
        var ret = {error: true, message: null, data: null};
        if ( error.non_field_errors != null )
          ret.message = "Login invalido.";
        else
          ret.message = "Erro desconhecido, contate o mantedor.";
        return of(ret);
      })
    )
  }

  logout(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

  public isAuthenticated(): boolean {
    return AuthenticationService.auth_bool;
  }

  get_user_detail(): Observable<Usuario>{
    var user_error: Usuario = {
      nome: "Error ao obter.",
      last_login: null
    };
    return this.apiService.get(this.userDetailUrl, 'get user detail.', user_error);
  }

}
