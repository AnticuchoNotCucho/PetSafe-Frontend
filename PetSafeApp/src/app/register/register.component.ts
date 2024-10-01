import { Component } from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatCard} from "@angular/material/card";
import {MatOption, MatSelect, MatSelectModule} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatLabel,
    MatFormField,
    FormsModule,
    MatCard,
    MatSelect,
    MatOption,
    MatButton,
    MatSelectModule,
    MatInputModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  name: string = '';
  lastname: string = '';
  email: string = '';
  phone: string = '';
  role: number = 1;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    const newUser = {
      username: this.username,
      password: this.password,
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      phone: this.phone,
      roleId: +this.role
    };

    this.authService.register(newUser).subscribe({
      next: (response) => {
        console.log('Registro exitoso', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error al registrarse', error);
        alert(error.error); // Muestra el mensaje de error en un alerta
      }
    });
  }

}
