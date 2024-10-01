import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {MapComponent} from "./map/map.component";
import {ProfileComponent} from "./profile/profile.component";
import {LostPetsComponent} from "./lost-pets/lost-pets.component";
import {AuthGuard} from "./services/auth.guard";
import {FoundPetsComponent} from "./found-pets/found-pets.component";
import {RegisterComponent} from "./register/register.component";
import {PointInterestModalComponent} from "./point-interest-modal/point-interest-modal.component";
import {PointInterestComponent} from "./point-interest/point-interest.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: MapComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'lost-pets', component: LostPetsComponent, canActivate: [AuthGuard]},
  { path: 'found-pets', component: FoundPetsComponent, canActivate: [AuthGuard]},
  { path: 'interest-points', component: PointInterestComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '/login' }
];
