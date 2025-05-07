import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  cartCount = 0;

  categories = [
    { 
      name: 'Electrónica', 
      image: 'https://source.unsplash.com/random/800x600?electronics' 
    },
    { 
      name: 'Moda', 
      image: 'https://source.unsplash.com/random/800x600?fashion' 
    },
    { 
      name: 'Hogar', 
      image: 'https://source.unsplash.com/random/800x600?home' 
    }
  ];

  featuredProducts = [
    {
      name: 'Smartphone Pro',
      price: 599.99,
      image: 'https://source.unsplash.com/random/800x600?phone'
    },
    {
      name: 'Laptop Ultra',
      price: 1299.99,
      image: 'https://source.unsplash.com/random/800x600?laptop'
    },
    {
      name: 'Audífonos Premium',
      price: 199.99,
      image: 'https://source.unsplash.com/random/800x600?headphones'
    }
  ];

  addToCart(product: any) {
    this.cartCount++;
    // Aquí iría la lógica para agregar al carrito
    console.log('Producto añadido:', product);
  }

}
