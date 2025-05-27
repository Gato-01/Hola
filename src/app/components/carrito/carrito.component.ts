import { Component, inject, HostListener, input, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: false,
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css' 
})
export class CarritoComponent {

  constructor(private router: Router) {} // Para la redirección en "Pagar"

  http = inject(HttpClient);
  products: Product[]=[];
  visibleProducts: Product[] = [];
  productsToShow = 12; // Mostrar solo 12 al inicio

  // Lo siguiente es para activar los paneles de recordatorio
  // y carrito desde el teclado
  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    //Nos aseguramos que no funcione en un input
    const target = event.target as HTMLElement;

    // 1. Ignora si estás dentro de un input, textarea o elemento editable:
    const tag = target.tagName.toLowerCase();
    const isFormElement = 
      tag === 'input' ||
      tag === 'textarea' ||
      target.isContentEditable;
    if (isFormElement) {
      return;
    }
    
    // Solo en la ruta de productos:
    if (!this.router.url.startsWith('/carrito')) {
      return;
    }

    switch (event.key.toLowerCase()) {
      case 'l':
        this.toggleCart();
        break;
      case 's':
        this.toggleReminder();
        break;
      default:
        break;
    }
  }

  ngOnInit(){
    this.http.get<Product[]>('https://api.escuelajs.co/api/v1/products')
    .subscribe((data) => {
      console.log('Datos recibidos:', data);
      this.products = data.filter(product => product.id && product.title && product.images.length > 0);
      this.updateVisibleProducts();
    })

    // Modal de recordatorios, carrito y persistencia en LocalStorage
    this.loadReminders();
    this.loadcartProducts();
  }

  updateVisibleProducts() {
    this.visibleProducts = this.products.slice(0, this.productsToShow);
  }

  showMore() {
    this.productsToShow += 8; // Agrega 8 productos más
    this.updateVisibleProducts();
  }

  // **********************************
  // ASPECTOS GENERALES DE LOS MODALES
  // **********************************

  cart: Product[] = [];
  reminders: Product[] = [];

  // -- Métodos para persistencia en LocalStorage

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

  private loadcartProducts() {
    const json = localStorage.getItem('cartProducts');
    if (json) {
      try {
        this.cart = JSON.parse(json);
      } catch {
        localStorage.removeItem('cartProducts');
        this.cart = [];
      }
    }
  }

  private saveCart() {
    localStorage.setItem('cartProducts', JSON.stringify(this.cart));
  }
  showCart = false;

  toggleCart() {
    this.showCart = !this.showCart;
    if(this.showCart==true) {
      this.showReminder=false;
    }
  }

  agregarAlCarrito(product: Product) {
    if(this.reminders.find(p => p.id === product.id)) {
      this.eliminarDelRecordatorio(product);
    }
    // evita duplicados
    if (!this.cart.find(p => p.id === product.id)) {
      alert(`¡${product.title} agregado al carrito!`);
      this.cart.push({...product, quantity:1});
      this.saveCart();
    } else {
      // Si ya existe, pues incrementa las unidades de compra
      const existing = this.cart.find(p => p.id === product.id)
      if(existing) {
        existing.quantity++;
        this.saveCart();
      }
    }
    if (this.showCart==false){
      this.toggleCart();
    }
    this.showReminder=false;
  }

  eliminarDelCarrito(product: Product) {
    this.cart = this.cart.filter(p => p.id !== product.id);
    alert(`¡${product.title} ha sido descartado!`);
    this.saveCart();
  }

  // Incrementa la cantidad
  increase(product: Product) {
    product.quantity++;
    this.saveCart();
  }

  // Decrementa pero sin bajar de 1
  decrease(product: Product) {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }

  // Calcula el total
  get total(): number {
    return this.cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  // **********************
  // MODAL DE RECORDATORIO
  // **********************

  showReminder = false;

  toggleReminder() {
    this.showReminder = !this.showReminder;
    if(this.showReminder==true) {
      this.showCart=false;
    }
  }

  agregarAlRecordatorio(product: Product) {
    if (this.cart.find(p => p.id === product.id)) {
      this.eliminarDelCarrito(product);
    }
    // evita duplicados
    if (!this.reminders.find(p => p.id === product.id)) {
      alert(`¡${product.title} se agrego al recordatorio!`);
      this.reminders.push(product);
      this.saveReminders();
    }
    if (this.showReminder==false){
      this.toggleReminder();
    }
    this.showCart=false;
  }

  eliminarDelRecordatorio(product: Product) {
    this.reminders = this.reminders.filter(p => p.id !== product.id);
    alert(`¡${product.title} ha sido olvidado!`);
    this.saveReminders();
  }
  
pagar() {
  // Guarda el estado actual en localStorage antes de redirigir
  localStorage.setItem('pendingPurchase', JSON.stringify({
    cart: this.cart,
    reminders: this.reminders
  }));

  const confirmacion = confirm('Para finalizar la compra debes iniciar sesión. ¿Deseas ir a la página de login?');
  
  if(confirmacion) {
    this.router.navigate(['/sesion']);
  }
}
}