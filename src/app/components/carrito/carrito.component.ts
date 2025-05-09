import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  
  selector: 'app-carrito',
  standalone: false,  
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  constructor(
    
    private router: Router
  ) {} 

  
mostrarAlertaLogin() {
  const confirmacion = confirm('Para finalizar la compra debes iniciar sesión. ¿Deseas ir a la página de login?');
  
  if(confirmacion) {
    this.guardarCarrito();
    this.router.navigate(['/sesion']);
  }
}

private guardarCarrito() {
  localStorage.setItem('carrito_pendiente', JSON.stringify(this.carrito));
}
 

private cargarCarritoGuardado() {
  const carritoGuardado = localStorage.getItem('carrito_pendiente');
  if(carritoGuardado) {
    this.carrito = JSON.parse(carritoGuardado);
    this.numeroProductos = this.carrito.length;
    localStorage.removeItem('carrito_pendiente');
  }
}
  
  // Variables del carrito
  showCart = false;
  carrito: Product[] = [];
  numeroProductos = 0;

  // Variables de productos y recordatorios
  http = inject(HttpClient);
  products: Product[] = [];
  visibleProducts: Product[] = [];
  productsToShow = 12;
  showReminder = false;
  reminders: Product[] = [];

  ngOnInit() {
    this.cargarProductos();
    this.loadReminders();    
    this.cargarProductos();  
    this.cargarCarritoGuardado(); 
  }

  private cargarProductos() {
    this.http.get<Product[]>('https://api.escuelajs.co/api/v1/products')
      .subscribe({
        next: (data) => {
          console.log('Datos crudos de API:', data);
          this.products = data.filter(product => {
            const isValid = product.id && product.title && product.images.length > 0;
            if (!isValid) console.log('Producto inválido:', product);
            return isValid;
          });
          console.log('Productos válidos:', this.products.length);
          console.log('ProductsToShow:', this.productsToShow);
          this.updateVisibleProducts();
        },
        error: (err) => {
          console.error('Error al cargar productos:', err);
        }
      });
  }
  

  // Métodos del carrito
  toggleCart() {
    this.showCart = !this.showCart;
  }

  agregarAlCarrito(producto: Product) {
    this.carrito.push(producto);
    this.numeroProductos = this.carrito.length;
    this.showCart = true;
  }

  eliminarDelCarrito(index: number) {
    this.carrito.splice(index, 1);
    this.numeroProductos = this.carrito.length;
  }

  calcularTotal() {
    return this.carrito.reduce((acc, item) => acc + item.price, 0);
  }

  // Métodos de recordatorios
  toggleReminder() {
    this.showReminder = !this.showReminder;
  }

  agregarAlRecordatorio(product: Product) {
    if (!this.reminders.find(p => p.id === product.id)) {
      this.reminders.push(product);
      this.saveReminders();
    }
  }

  eliminarDelRecordatorio(index: number) {
    this.reminders.splice(index, 1);
    this.saveReminders();
  }

  // Métodos comunes
  private loadReminders() {
    const reminders = localStorage.getItem('reminders');
    this.reminders = reminders ? JSON.parse(reminders) : [];
  }

  private saveReminders() {
    localStorage.setItem('reminders', JSON.stringify(this.reminders));
  }

  updateVisibleProducts() {
    this.visibleProducts = this.products.slice(0, this.productsToShow);
  }

  showMore() {
    console.log('Antes de mostrar más:', {
      productsLength: this.products.length,
      productsToShow: this.productsToShow
    });
    
    const newValue = this.productsToShow + 8;
    this.productsToShow = Math.min(newValue, this.products.length);
    console.log('Después de incrementar:', this.productsToShow);
    
    this.updateVisibleProducts();
    console.log('Visible products:', this.visibleProducts.length);
  }
  truncateText(text: string, maxLength: number): string {
    return text.length > maxLength 
      ? text.substring(0, maxLength) + '...' 
      : text;
  }

 
}