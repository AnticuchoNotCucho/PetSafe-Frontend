import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {UserEntity} from "../models/UserEntity";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/user';
  private isAuthenticated = true;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    // Realiza la solicitud POST a la API con el username y password
    return this.http.post(this.apiUrl, { username, password }).pipe(
      tap(response => {
        if (response) {  // Verifica si la respuesta tiene un token u otra validación
          this.isAuthenticated = true;
          // Aquí podrías guardar el token si es necesario
        } else {
          this.isAuthenticated = false;
          console.error('Login failed: Invalid credentials or no token received');
        }
      })
    );
  }
  isLoggedIn(): boolean {
    return this.isAuthenticated; // Verifica si está autenticado
  }

  logout() {
    this.isAuthenticated = false;
    this.router.navigate(['/login']); // Redirige al login tras el logout
  }

  register(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    console.log("registrando ando")
    console.log(user)
    return this.http.post(`${this.apiUrl}/register`, user, { headers });
  }

}
