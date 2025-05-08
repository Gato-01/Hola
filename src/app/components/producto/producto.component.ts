import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({ 
  selector: 'app-producto',
  standalone: false,
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {

  // @Input() product: Product = { // Metodo 1 para importar todo el producto, la interfaz
  //   title: '',
  //   price: 0,
  //   images: [],
  //   id: 0
  // }

  @Input() product!: Product; // Recibe los productos
  @Output() agregar = new EventEmitter<Product>(); // Evento para enviar datos
  @Output() recordarProducto = new EventEmitter<Product>();
  @Output() eliminarProducto = new EventEmitter<number>();

  agregarAlCarrito() {
    this.agregar.emit(this.product); // Envía el producto al padre
    alert(`¡${this.product.title} agregado al carrito!`);
  }

  agregarAlRecordatorio() {
    this.recordarProducto.emit(this.product);
    alert(`¡${this.product.title} se agrego al recordatorio!`);
  }

  eliminarDelCarrito() { // NO ESTÁ EN USO PRACTICO DE MOMENTO
    this.eliminarProducto.emit(this.product.id);
    alert(`¡${this.product.title} se agrego al recordatorio!`);
  }

  isValidUrl(url: string): boolean {
    try {
      new URL(url); // Intenta crear un objeto URL
      return true;
    } catch (_) {
      return false;
    }
  }
}
