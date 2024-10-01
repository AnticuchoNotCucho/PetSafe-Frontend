import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GpsService {
  constructor() { }

  public getUserLocation(): Promise<{ lat: number; lng: number } | null> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            resolve({ lat, lng });
          },
          error => {
            console.error('Error al obtener la ubicación: ', error);
            resolve(null); // O rechaza la promesa si prefieres
          }
        );
      } else {
        console.warn('La geolocalización no es soportada por este navegador.');
        resolve(null); // O rechaza la promesa si prefieres
      }
    });
  }
}
