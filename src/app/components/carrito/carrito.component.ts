import { Component, inject, input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-carrito',
  standalone: false,
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css' 
})
export class CarritoComponent {
  // title = 'Alessandro Giuseppe Antonio Anastasio Volta';
  // contador = 0;
  // changeTitle(){
  //   if (this.contador % 2 === 0) { // Función para cambiar el titulo
  //     this.title='¡Gokuuu!';
  //     this.contador += 1;
  //   } else {
  //     this.title='Alessandro Giuseppe Antonio Anastasio Volta';
  //     this.contador += 1;
  //   }
  // }

  numeroProductos = 0;

  http = inject(HttpClient);
  products: Product[]=[];
  visibleProducts: Product[] = [];
  productsToShow = 12; // Mostrar solo 12 al inicio
  carrito: Product[] = [];

  ngOnInit(){
    this.http.get<Product[]>('https://api.escuelajs.co/api/v1/products')
    .subscribe((data) => {
      console.log('Datos recibidos:', data);
      this.products = data.filter(product => product.id && product.title && product.images.length > 0);
      this.updateVisibleProducts();
    })

    // Modal de recordatorios y LocalStorage
    this.loadReminders();
  }

  updateVisibleProducts() {
    this.visibleProducts = this.products.slice(0, this.productsToShow);
  }

  showMore() {
    this.productsToShow += 8; // Agrega 8 productos más
    this.updateVisibleProducts();
  }

  agregarAlCarrito(producto: Product) {
    this.carrito.push(producto);
    console.log('Producto agregado:', producto);
    this.numeroProductos += 1;
  }

  /* No esta en uso practico de momento */
  eliminarProductoDelCarrito(id: number) { /*Para el carrito real*/
    this.products = this.products.filter(product => product.id !== id);
    this.numeroProductos -= 1;
  }

  // MODAL DE RECORDATORIO

  showReminder = false;
  reminders: Product[] = [];

  toggleReminder() {
    this.showReminder = !this.showReminder;
  }

  agregarAlRecordatorio(product: Product) {
    // evita duplicados
    if (!this.reminders.find(p => p.id === product.id)) {
      this.reminders.push(product);
      this.saveReminders();
    }
  }

  eliminarDelRecordatorio(product: Product) {
    this.reminders = this.reminders.filter(p => p.id !== product.id);
    alert(`¡${product.title} ha sido descartado!`);
    this.saveReminders();
  }

  // Métodos para persistencia en LocalStorage

  private loadReminders() {
    const json = localStorage.getItem('reminders');
    if (json) {
      try {
        this.reminders = JSON.parse(json);
      } catch {
        localStorage.removeItem('reminders');
        this.reminders = [];
      }
    }
  }

  private saveReminders() {
    localStorage.setItem('reminders', JSON.stringify(this.reminders));
  }
}
