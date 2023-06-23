import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudServicesComponent } from './components/crud-services/crud-services.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard'
import { ModalServicesComponent } from './components/modal-services/modal-services.component';
import { CrudPartnersComponent } from './components/crud-partners/crud-partners.component';
import { ModalPartnersComponent } from './components/modal-partners/modal-partners.component';
import { MapComponent } from './components/map/map.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'modalservice', component: ModalServicesComponent },
  {path: 'modalservice/:id', component: ModalServicesComponent},
  { path: 'map', component: MapComponent },
 //Maybe I can change this with a new HomeComponent
  { path: 'services', component: CrudServicesComponent, 
  ...canActivate(()=> redirectUnauthorizedTo(['/register']))},
  { path: 'partners', component: CrudPartnersComponent, 
  ...canActivate(()=> redirectUnauthorizedTo(['/register']))},
  { path: 'modalpartner', component: ModalPartnersComponent },
  {path: 'modalpartner/:id', component: ModalPartnersComponent},

  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
