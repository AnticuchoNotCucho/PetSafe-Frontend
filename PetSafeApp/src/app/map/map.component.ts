import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit{

  private map: any;
  private marker: any;
  ngOnInit(): void {
    this.initMap(),
      this.addMapClickListener();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [-33.4489, -70.6693],  // Coordenadas de Santiago de Chile (puedes cambiarlas)
      zoom: 12
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);
  }
  // Agrega un marcador al mapa
  private addMarker(): void {
    const marker = L.marker([-33.4489, -70.6693]); // Coordenadas del marcador
    marker.addTo(this.map)
      .bindPopup('¡Aqui estas!')
      .openPopup();
  }
  private addMapClickListener(): void {
    this.map.on('click', (e: any) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      // Si ya hay un marcador, mueve el marcador existente
      if (this.marker) {
        this.marker.setLatLng([lat, lng]);
      } else {
        // Si no existe un marcador, crea uno nuevo
        this.marker = L.marker([lat, lng])
          .addTo(this.map)
          .bindPopup('Marcador movido aquí')
          .openPopup();
      }
    });
  }
}
