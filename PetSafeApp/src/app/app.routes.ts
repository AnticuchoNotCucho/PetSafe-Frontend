import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {MapComponent} from "./map/map.component";
import {ProfileComponent} from "./profile/profile.component";
import {LostPetsComponent} from "./lost-pets/lost-pets.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: MapComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'lost-pets', component: LostPetsComponent},
];
