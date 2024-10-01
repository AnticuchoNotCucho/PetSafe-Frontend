import {Component, OnInit} from '@angular/core';
import {PointsDTO} from "../models/PointsDTO";
import {ReportsService} from "../services/reports.service";
import {PointInterest} from "../models/PointsInterest";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-point-interest',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './point-interest.component.html',
  styleUrl: './point-interest.component.css'
})
export class PointInterestComponent implements OnInit{
  pointsOfInterest: PointInterest[] = [];

  constructor(private reportsService: ReportsService) {
  }


  ngOnInit(): void {
    this.loadLostPets()
  }

  private loadLostPets(): void {
    this.reportsService.getPoints().subscribe({
      next: (data: PointsDTO) => {
        this.pointsOfInterest = data.pointsOfInterestEntities; // Asigna la lista de mascotas perdidas
        console.log('Mascotas perdidas recibidas:', this.pointsOfInterest);
      },
      error: (error) => {
        console.error('Error al recibir datos de mascotas perdidas:', error);
      }
    });
  }

}
