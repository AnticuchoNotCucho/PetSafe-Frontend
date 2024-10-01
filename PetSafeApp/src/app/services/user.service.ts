import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {UserEntity} from "../models/UserEntity";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl + '/user/details'; // Cambia esto si tu URL base es diferente

  constructor(private http: HttpClient) {}

  // Método para obtener los detalles de un usuario por su nombre de usuario
  getUserDetails(username: string): Observable<UserEntity> {
    const params = new HttpParams().set('username', username);
    return this.http.get<UserEntity>(`${this.apiUrl}`, { params });
  }
}
