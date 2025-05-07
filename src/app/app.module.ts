import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductoComponent } from './components/producto/producto.component';

import { HttpClientModule } from '@angular/common/http';
import { CarritoComponent } from './carrito/carrito.component';
import { NavComponent } from './nav/nav.component';
import { SesionComponent } from './sesion/sesion.component';
// import { HttpClient } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    ProductoComponent,
    CarritoComponent,
    NavComponent,
     SesionComponent
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
