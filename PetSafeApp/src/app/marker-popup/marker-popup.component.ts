import {Component, Input} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-marker-popup',
  standalone: true,
  imports: [
    MatIcon,
    MatButton
  ],
  templateUrl: './marker-popup.component.html',
  styleUrl: './marker-popup.component.css'
})
export class MarkerPopupComponent {

  @Input() title!: string;
  @Input() description!: string;
// Maneja la opción seleccionada
  handleOption(option: number) {
    console.log(`Opción seleccionada: ${option}`);
    // Aquí puedes manejar lo que sucede cuando se selecciona una opción
  }
}
