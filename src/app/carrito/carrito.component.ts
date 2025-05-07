import { Component, inject } from '@angular/core';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-carrito',
  standalone: false,
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent {
  title = 'Alessandro Giuseppe Antonio Anastasio Volta';
  contador = 0;

  numeroProductos = 0;

  http = inject(HttpClient);
  products: Product[]=[];
  visibleProducts: Product[] = [];
  productsToShow = 12; // Mostrar solo 12 al inicio
  carrito: Product[] = [];

  changeTitle(){
    if (this.contador % 2 === 0) { // Función para cambiar el titulo
      this.title='¡Gokuuu!';
      this.contador += 1;
    } else {
      this.title='Alessandro Giuseppe Antonio Anastasio Volta';
      this.contador += 1;
    }
  }

  ngOnInit(){
    this.http.get<Product[]>('https://api.escuelajs.co/api/v1/products')
    .subscribe((data) => {
      console.log('Datos recibidos:', data);
      this.products = data.filter(product => product.id && product.title && product.images.length > 0);
      this.updateVisibleProducts();
    })
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

  eliminarProductoDelCarrito(id: number) {
    this.products = this.products.filter(product => product.id !== id);
    this.numeroProductos -= 1;
  }
}
