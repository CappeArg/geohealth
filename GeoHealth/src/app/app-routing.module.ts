import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudServicesComponent } from './components/crud-services/crud-services.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard'

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  
  { path: 'services', component: CrudServicesComponent, 
  ...canActivate(()=> redirectUnauthorizedTo(['/register']))},

  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
