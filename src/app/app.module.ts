import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductoComponent } from './components/producto/producto.component';

import { HttpClientModule } from '@angular/common/http';
import { CarritoComponent } from './components/carrito/carrito.component';
import { NavComponent } from './components/nav/nav.component';
import { SesionComponent } from './components/gestionCuenta/sesion/sesion.component';
import { HomeComponent } from './components/home/home.component';
import { CarritoProductoComponent } from './components/carrito-producto/carrito-producto.component';
import { RegistroComponent } from './components/gestionCuenta/registro/registro.component';
import { PreguntasFrecuentesComponent } from './components/preguntas-frecuentes/preguntas-frecuentes.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// import { HttpClient } from '@angular/common/http'

// Componente de angular Material
import {MatExpansionModule} from '@angular/material/expansion';
import { TruncatePipe } from './shared/pipes/truncate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProductoComponent,
    CarritoComponent,
    NavComponent,
     SesionComponent,
     HomeComponent,
     CarritoProductoComponent,
     RegistroComponent,
     PreguntasFrecuentesComponent,
     TruncatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatExpansionModule,
    RouterModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
