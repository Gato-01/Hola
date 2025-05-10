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
  constructor(private router: Router) {} 

  // Variables del panel combinado
  showCombinedPanel = false;
  activeTab: 'cart' | 'reminders' = 'cart';

  // Variables del carrito
  carrito: Product[] = [];
  numeroProductos = 0;

  // Variables de productos y recordatorios
  http = inject(HttpClient);
  products: Product[] = [];
  visibleProducts: Product[] = [];
  productsToShow = 12;
  reminders: Product[] = [];

  ngOnInit() {
    this.cargarProductos();
    this.loadReminders();    
    this.cargarCarritoGuardado(); 
  }

  // Métodos para el panel combinado
  toggleCombinedPanel() {
    this.showCombinedPanel = !this.showCombinedPanel;
  }

  // Métodos del carrito
  agregarAlCarrito(producto: Product) {
    this.carrito.push(producto);
    this.numeroProductos = this.carrito.length;
    this.activeTab = 'cart'; // Cambia a la pestaña del carrito al agregar
    this.showCombinedPanel = true; // Muestra el panel
  }

  eliminarDelCarrito(index: number) {
    this.carrito.splice(index, 1);
    this.numeroProductos = this.carrito.length;
  }

  calcularTotal() {
    return this.carrito.reduce((acc, item) => acc + item.price, 0);
  }

  // Métodos de recordatorios
  agregarAlRecordatorio(product: Product) {
    if (!this.reminders.find(p => p.id === product.id)) {
      this.reminders.push(product);
      this.saveReminders();
      this.activeTab = 'reminders'; // Cambia a la pestaña de recordatorios
      this.showCombinedPanel = true; // Muestra el panel
    }
  }

  eliminarDelRecordatorio(index: number) {
    this.reminders.splice(index, 1);
    this.saveReminders();
  }

  // Métodos para mover items entre secciones
  moverARecordatorios(index: number) {
    const item = this.carrito[index];
    this.eliminarDelCarrito(index);
    this.agregarAlRecordatorio(item);
  }

  moverACarrito(index: number) {
    const item = this.reminders[index];
    this.eliminarDelRecordatorio(index);
    this.agregarAlCarrito(item);
  }

  // Métodos de persistencia
  private cargarProductos() {
    this.http.get<Product[]>('https://api.escuelajs.co/api/v1/products')
      .subscribe({
        next: (data) => {
          this.products = data.filter(product => {
            return product.id && product.title && product.images.length > 0;
          });
          this.updateVisibleProducts();
        },
        error: (err) => {
          console.error('Error al cargar productos:', err);
        }
      });
  }

  private loadReminders() {
    const reminders = localStorage.getItem('reminders');
    this.reminders = reminders ? JSON.parse(reminders) : [];
  }

  private saveReminders() {
    localStorage.setItem('reminders', JSON.stringify(this.reminders));
  }

  private cargarCarritoGuardado() {
    const carritoGuardado = localStorage.getItem('carrito_pendiente');
    if(carritoGuardado) {
      this.carrito = JSON.parse(carritoGuardado);
      this.numeroProductos = this.carrito.length;
      localStorage.removeItem('carrito_pendiente');
    }
  }

  // Métodos de UI
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

  updateVisibleProducts() {
    this.visibleProducts = this.products.slice(0, this.productsToShow);
  }

  showMore() {
    const newValue = this.productsToShow + 8;
    this.productsToShow = Math.min(newValue, this.products.length);
    this.updateVisibleProducts();
  }

  truncateText(text: string, maxLength: number): string {
    return text.length > maxLength 
      ? text.substring(0, maxLength) + '...' 
      : text;
  }
}