import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { LoginComponent } from './components/login/login.component';
import { CrudServicesComponent } from './components/crud-services/crud-services.component';
import { RegisterComponent } from './components/register/register.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { ModalServicesComponent } from './components/modal-services/modal-services.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    CrudServicesComponent,
    RegisterComponent,
    ModalServicesComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
