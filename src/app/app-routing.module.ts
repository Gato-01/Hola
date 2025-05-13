import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './components/carrito/carrito.component';
import { SesionComponent } from './components/gestionCuenta/sesion/sesion.component';
import { ProductoComponent } from './components/producto/producto.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { CarritoProductoComponent } from './components/carrito-producto/carrito-producto.component';
import { RegistroComponent } from './components/gestionCuenta/registro/registro.component';
import { AyudaComponent } from './components/ayuda/ayuda.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'nav', component: NavComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'carritoProducto', component: CarritoProductoComponent },
  { path: 'producto', component: ProductoComponent },
  { path: 'home', component: HomeComponent },
  { path: 'sesion', component: SesionComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'ayuda', component: AyudaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
