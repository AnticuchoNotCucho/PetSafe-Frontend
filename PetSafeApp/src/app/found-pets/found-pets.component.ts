import {Component, OnInit} from '@angular/core';
import {CommonModule, DatePipe, NgForOf} from "@angular/common";
import {PointsDTO} from "../models/PointsDTO";
import {ReportsService} from "../services/reports.service";
import {FoundPetReport} from "../models/FoundPetReport";

@Component({
  selector: 'app-found-pets',
  standalone: true,
    imports: [
        DatePipe,
        NgForOf,
      CommonModule
    ],
  templateUrl: './found-pets.component.html',
  styleUrl: './found-pets.component.css'
})
export class FoundPetsComponent implements OnInit{
  foundPets: FoundPetReport[] = []; // Inicializar la lista

  constructor(private reportsService: ReportsService) {
  }

  ngOnInit(): void {
    this.loadLostPets()
  }
  private loadLostPets(): void {
    this.reportsService.getPoints().subscribe({
      next: (data: PointsDTO) => {
        this.foundPets = data.foundPets; // Asigna la lista de mascotas perdidas
        console.log('Mascotas Encontradas recibidas:', this.foundPets);
      },
      error: (error) => {
        console.error('Error al recibir datos de mascotas Encontradas:', error);
      }
    });
  }
}
