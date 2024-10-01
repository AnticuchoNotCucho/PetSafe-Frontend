import {Component, OnInit} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {UserEntity} from "../models/UserEntity";
import {UserService} from "../services/user.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule,
    MatCardContent,
    MatCardActions,
    MatCardTitle,
    MatCard,
    MatCardSubtitle,
    MatCardHeader,
    MatButton
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  userProfile: UserEntity | null = null;
  roleName: string = ''; // Inicializa con un valor vacío



  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.loadUserProfile(); // Cargar perfil después de guardar
  }

  private loadUserProfile(): void {
    const userDetails = localStorage.getItem('userDetails');
    if (userDetails) {
      this.userProfile = JSON.parse(userDetails);
      const roleId = this.userProfile?.roleId; // Asegúrate de que `roleId` existe en `userProfile`

      if (roleId === 1) {
        this.roleName = 'Administrador'; // Asigna 'Administrador' si roleId es 1
      } else if (roleId === 2) {
        this.roleName = 'Veterinario'; // Asigna 'Veterinario' si roleId es 2
      } else {
        this.roleName = 'Rol desconocido'; // Valor por defecto si el roleId no es 1 o 2
      }

    }
  }
}
