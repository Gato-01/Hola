import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductoComponent } from './components/producto/producto.component';

import { HttpClientModule } from '@angular/common/http';
import { CarritoComponent } from './components/carrito/carrito.component';
import { NavComponent } from './components/nav/nav.component';
import { SesionComponent } from './components/sesion/sesion.component';
import { HomeComponent } from './components/home/home.component';
// import { HttpClient } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    ProductoComponent,
    CarritoComponent,
    NavComponent,
     SesionComponent,
     HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
