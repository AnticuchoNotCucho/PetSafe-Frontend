import { Component, OnInit, ComponentRef, ViewContainerRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import * as L from 'leaflet';
import { MatDialog } from '@angular/material/dialog';
import { MarkerPopupComponent } from '../marker-popup/marker-popup.component';
import { ModalComponent } from "../modal/modal.component";
import { MarkerModalComponent } from "../marker-modal/marker-modal.component";
import { MatCard, MatCardActions, MatCardContent, MatCardHeader } from "@angular/material/card";
import { CommonModule } from "@angular/common";
import { UserService } from "../services/user.service";
import {PointInterestModalComponent} from "../point-interest-modal/point-interest-modal.component";
import {LostPetModalComponent} from "../lost-pet-modal/lost-pet-modal.component";
import {FoundPetModalComponent} from "../found-pet-modal/found-pet-modal.component";
import {ReportsService} from "../services/reports.service";
import {PointsDTO} from "../models/PointsDTO";
import {GpsService} from "../services/gps.service";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCard,
    MarkerModalComponent,
    MarkerPopupComponent
  ],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  private map!: L.Map;
  private marker: L.Marker | null = null;
  isProfileModalOpen: boolean = false;
  pointsData!: PointsDTO;
  userLocation: { lat: number; lng: number } | null = null;



  constructor(
    private dialog: MatDialog,
    private viewContainerRef: ViewContainerRef,
    private userService: UserService,
    private changeDetectorRef: ChangeDetectorRef,
    private reportsService : ReportsService,
    private gpsService : GpsService
  ) {}

  ngOnInit(): void {
    this.initMap();
    this.addMapClickListener();
    this.loadPoints();
    this.gpsService.getUserLocation().then(location => {
      if (location) {
        this.userLocation = location;
        console.log('Ubicación del usuario:', this.userLocation);
        this.addUserMarker(location); // Agregar marcador de ubicación del usuario
      } else {
        console.warn('No se pudo obtener la ubicación.');
      }
    });


  }

  private loadPoints(): void {
    this.reportsService.getPoints().subscribe({
      next: (data: PointsDTO) => {
        this.pointsData = data;
        console.log('Datos recibidos:', this.pointsData);
        this.addMarkersToMap();
      },
      error: (error) => {
        console.error('Error al recibir datos:', error);
      }
    });
  }



  private addMarkersToMap(): void {
    // Agrega marcadores para las mascotas perdidas
    this.pointsData.lostPets.forEach(pet => {
      if (pet.coords) { // Verifica que coords no sea undefined
        const coords = pet.coords.split(',');
        if (coords.length === 2) { // Asegúrate de que hay dos elementos
          const lat = parseFloat(coords[0]);
          const lng = parseFloat(coords[1]);
          const patitaIcon = L.icon({
            iconUrl: 'patita.png',
            iconSize: [20, 20],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
          });

          L.marker([lat, lng], {icon: patitaIcon}).addTo(this.map)
            .bindPopup(`<b>Perdido:</b> ${pet.name}<br><b>Descripción:</b> ${pet.petDescription}`);
        }
      }
    });

    // Agrega marcadores para las mascotas encontradas
    this.pointsData.foundPets.forEach(pet => {
      if (pet.coords) { // Verifica que coords no sea undefined
        const coords = pet.coords.split(',');
        if (coords.length === 2) { // Asegúrate de que hay dos elementos
          const lat = parseFloat(coords[0]);
          const lng = parseFloat(coords[1]);
          const patitaIcon = L.icon({
            iconUrl: 'patitaverde.png',
            iconSize: [20, 20],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
          });


          L.marker([lat, lng], {icon: patitaIcon}).addTo(this.map)
            .bindPopup(`<b>Encontrado:</b> ${pet.name}<br><b>Descripción:</b> ${pet.petDescription}`);
        }
      }
    });

    this.pointsData.pointsOfInterestEntities.forEach(point => {
        if (point.coords) { // Verifica que coords no sea undefined
          const coords = point.coords.split(',');
          if (coords.length === 2) { // Asegúrate de que hay dos elementos (latitud y longitud)
            const lat = parseFloat(coords[0]);
            const lng = parseFloat(coords[1]);

            // Definir el ícono personalizado
            const interestIcon = L.icon({
              iconUrl: 'patitaazul.png', // Cambia esta ruta por la imagen que desees usar
              iconSize: [20, 20],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34]
            });

            // Añadir marcador al mapa con el ícono
            L.marker([lat, lng], {icon: interestIcon}).addTo(this.map)
              .bindPopup(`<b>Punto de Interés:</b> ${point.name ?? 'Sin nombre'}<br><b>Descripción:</b> ${point.description}`);
          }
        }
      });
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  openProfileModal() {
    this.isProfileModalOpen = true;
    console.log("Modal del perfil abierto:", this.isProfileModalOpen);
  }

  closeProfileModal() {
    this.isProfileModalOpen = false;
    console.log("Modal del perfil cerrado:", this.isProfileModalOpen);
  }

  private initMap(): void {
    if (this.map) {
      return; // Si el mapa ya está inicializado, salir
    }

    this.map = L.map('map', {
      center: [-33.4489, -70.6693],
      zoom: 12
    });


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);
  }


  private addMarker(lat: number, lng: number): void {
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
    this.marker = L.marker([lat, lng]).addTo(this.map);

    const popupContainer = document.createElement('div');
    const markerPopupRef: ComponentRef<MarkerPopupComponent> = this.viewContainerRef.createComponent(MarkerPopupComponent);
    markerPopupRef.instance.description = '';
    popupContainer.appendChild(markerPopupRef.location.nativeElement);

    this.marker.bindPopup(popupContainer).openPopup();

    this.changeDetectorRef.detectChanges();

    setTimeout(() => {
      const buttons = popupContainer.querySelectorAll('button.marker-option');
      buttons.forEach(button => {
        button.addEventListener('click', (event) => {
          const target = event.target as HTMLElement;
          const option = target.closest('button')?.getAttribute('data-option');
          if (option) {
            console.log("Opción seleccionada: " + option);
            this.openMarkerModal(option, lat, lng);
          }
        });
      });
    }, 0);
  }

  private openMarkerModal(option: string, lat: number, lng: number): void {
    let dialogRef;

    const markerData = { lat, lng }; // Los datos del marcador a enviar
    console.log(markerData)
    switch (option) {
      case '1':
        // Opción para "Found Pet"
        dialogRef = this.dialog.open(LostPetModalComponent, {
          width: '400px',
          data: markerData  // Enviar latitud y longitud al modal
        });
        break;
      case '2':
        // Opción para "Lost Pet"
        dialogRef = this.dialog.open(FoundPetModalComponent, {
          width: '400px',
          data: markerData  // Enviar latitud y longitud al modal
        });
        break;
      case '3':
        // Opción para "Point of Interest"
        dialogRef = this.dialog.open(PointInterestModalComponent, {
          width: '400px',
          data: markerData  // Enviar latitud y longitud al modal
        });
        break;
      default:
        console.error('Opción no válida');
        return;
    }

    // Subscripción para cerrar el modal y obtener el resultado
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('El modal se cerró con el resultado: ', result);
      }
      // Aquí llamamos a loadPoints para refrescar el mapa
      this.loadPoints(); // Llamar a la función para refrescar el mapa
    });
  }
  private addMapClickListener(): void {
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      this.addMarker(lat, lng);
    });
  }

  private addUserMarker(location: { lat: number; lng: number }): void {
    if (this.map) {
      // Crear un marcador en la ubicación del usuario
      const userMarker = L.marker([location.lat, location.lng]).addTo(this.map);

      // Opcional: Puedes agregar un popup al marcador
      userMarker.bindPopup('Tu ubicación').openPopup();

      // Opcional: Centrar el mapa en la ubicación del usuario
      this.map.setView([location.lat, location.lng], 12);
    }
  }
}
