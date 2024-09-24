import { Component } from '@angular/core';
import {MatCell, MatColumnDef, MatHeaderCell, MatHeaderRow, MatRow, MatTable} from "@angular/material/table";

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
    MatRow
  ],
  templateUrl: './lost-pets.component.html',
  styleUrl: './lost-pets.component.css'
})
export class LostPetsComponent {
}
