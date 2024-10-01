import {Component, OnInit} from '@angular/core';
import {MatCell, MatColumnDef, MatHeaderCell, MatHeaderRow, MatRow, MatTable} from "@angular/material/table";
import {ReportsService} from "../services/reports.service";
import {UserService} from "../services/user.service";
import {PointsDTO} from "../models/PointsDTO";
import {CommonModule, DatePipe} from "@angular/common";
import {LostPetReport} from "../models/LostPetReport";
import { jsPDF } from 'jspdf'
import html2canvas from "html2canvas";
import autoTable from "jspdf-autotable";

export interface Pet {
  image: string;
  name: string;
  breed: string;
  location: string;
}
@Component({
  selector: 'app-lost-pets',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    DatePipe,
    CommonModule
  ],
  templateUrl: './lost-pets.component.html',
  styleUrl: './lost-pets.component.css'
})
export class LostPetsComponent implements OnInit{
  lostPets: LostPetReport[] = []; // Inicializar la lista
  constructor(private reportsService: ReportsService) {
  }

  ngOnInit(): void {
    this.loadLostPets(); // Llama a la función que carga solo las mascotas perdidas

  }
  private loadLostPets(): void {
    this.reportsService.getPoints().subscribe({
      next: (data: PointsDTO) => {
        this.lostPets = data.lostPets; // Asigna la lista de mascotas perdidas
        console.log('Mascotas perdidas recibidas:', this.lostPets);
      },
      error: (error) => {
        console.error('Error al recibir datos de mascotas perdidas:', error);
      }
    });
  }
  generatePDFWithLast30Days(): void {
    this.reportsService.getLostPetsLast30Days().subscribe({
      next: (lostPets: LostPetReport[]) => {
        const pdf = new jsPDF();

        // Añadir encabezado
        pdf.setFontSize(18);
        pdf.text('Reporte de Mascotas Perdidas en los Últimos 30 Días', 10, 10);
        pdf.setFontSize(12);
        pdf.text('Lista de mascotas perdidas en los últimos 30 días', 10, 20);

        // Definir los datos de la tabla
        const tableData = lostPets.map(pet => ({
          nombre: pet.name ?? 'Nombre no disponible',
          descripcion: pet.petDescription ?? 'Descripción no disponible',
          fecha: new Date(pet.reportedAt).toLocaleDateString() ?? 'Fecha no disponible'
        }));

        // Añadir tabla
        autoTable(pdf, {
          head: [['Nombre', 'Descripción', 'Fecha de Pérdida']],
          body: tableData.map(item => [item.nombre, item.descripcion, item.fecha]),
          startY: 30, // Espacio para el título
          theme: 'grid', // Estilo de la tabla
          styles: {
            cellPadding: 5,
            fontSize: 10,
          },
          headStyles: {
            fillColor: [22, 160, 133], // Color del encabezado
            textColor: [255, 255, 255], // Color del texto en el encabezado
          },
        });

        // Guardar el PDF
        pdf.save('lost_pets_last_30_days_report.pdf');
      },
      error: (error) => {
        console.error('Error al obtener las mascotas perdidas de los últimos 30 días:', error);
      }
    });
  }
}
