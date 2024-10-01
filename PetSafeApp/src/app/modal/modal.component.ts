import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ProfileComponent} from "../profile/profile.component";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from "@angular/material/card";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ProfileComponent, MatCardContent, MatCardActions, MatCardHeader, MatCard],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() isOpen: boolean = false; // Recibe la propiedad isOpen
  @Input() closeModal?: () => void; // Ahora es opcional


  // Método para cerrar el modal (opcional)
  onClose() {
    if (this.closeModal) {
      this.closeModal();
    }
  }
}
