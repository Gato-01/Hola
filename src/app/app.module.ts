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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';




// Componente de angular Material
import {MatExpansionModule} from '@angular/material/expansion';
import { TruncatePipe } from './shared/pipes/truncate.pipe';
import { AyudaComponent } from './components/ayuda/ayuda.component';

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
    TruncatePipe,
    AyudaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatExpansionModule,
    RouterModule,
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
        ReactiveFormsModule,
        
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
