import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly apiUrl: string = "http://localhost:8080/auth";

  constructor(private readonly httpClient: HttpClient) { }

  login(email: string, password: string){
    return this.httpClient.post<LoginResponse>(
      `${this.apiUrl}/login`,
      {email, password},
      {withCredentials: true}
    ).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("username", value.name)
      })
    )

  }

  signup(name: string, email: string, password: string){
    return this.httpClient.post<LoginResponse>(
      this.apiUrl + "/login",
      {name, email, password},
      {withCredentials: true}
    ).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("username", value.name)
      })
    )
}

register(name: string, email: string, password: string){
    return this.httpClient.post<LoginResponse>(
      this.apiUrl + "/register",
      {name, email, password},
      {withCredentials: true}
    ).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("username", value.name)
      })
    )
  }
}  
