import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './carrito/carrito.component';
import { SesionComponent } from './sesion/sesion.component';
const routes: Routes = [
  { path: 'carrito', component: CarritoComponent },
  { path: 'sesion', component: SesionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
