import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../services/auth.service";
import {UserEntity} from "../models/UserEntity";
import {UserService} from "../services/user.service";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';


  constructor(private authService: AuthService, private router: Router, private userService: UserService) { }

  onSubmit() {

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login successful', response);

        // Asegúrate de que la respuesta contenga el token
        if (response && response.token) {
          // Almacena el token en localStorage
          localStorage.setItem('token', response.token);

          // Redirige a la página principal
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        console.error('Login failed', error);
        // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario
      }
    });

    this.userService.getUserDetails(this.username).subscribe(
      (user: UserEntity) => {
        console.log('Detalles del usuario:', user);
        // Guardar detalles del usuario en Local Storage
        localStorage.setItem('userDetails', JSON.stringify(user));
      },
      (error) => {
        console.error('Error al obtener los detalles del usuario', error);
      }
    );
  }

  navigateToRegister() {
    this.router.navigate(['/register']); // Redirige a la ruta de registro
  }
}
