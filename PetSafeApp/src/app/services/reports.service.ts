import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PointsDTO} from "../models/PointsDTO";
import {catchError, map, Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {PetReportDTO} from "../models/petReportDTO";
import {LostPetReport} from "../models/LostPetReport";

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private apiUrl = environment.apiUrl + '/points'; // Cambia esta URL según sea necesario

  constructor(private http: HttpClient) { }

  // Método para obtener el PointsDTO
  getPoints(): Observable<PointsDTO> {
    return this.http.get<PointsDTO>(this.apiUrl);
  }

  // Método en el servicio
  savePetReport(petReportDTO: PetReportDTO): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<string>(this.apiUrl + '/report', petReportDTO, { headers, responseType: 'text' as 'json' }).pipe(
      map(response => {
        // Manejo de la respuesta exitosa aquí
        return response; // La respuesta es un string
      }),
      catchError(error => {
        console.error('Error al guardar el reporte:', error);
        return throwError(error); // Re-lanzar el error
      })
    );
  }

  getLostPetsLast30Days(): Observable<LostPetReport[]> {
    return this.http.get<LostPetReport[]>(`${environment.apiUrl}/report`);
  }







}
