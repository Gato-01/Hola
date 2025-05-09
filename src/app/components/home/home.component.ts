import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  selectedDate: Date | null = new Date();
  cartCount = 0;

  // Categorías únicas con imágenes reales
  categories = [
    { 
      name: 'Electrónica', 
      image: 'https://images.pexels.com/photos/31974039/pexels-photo-31974039/free-photo-of-encimera-de-cocina-moderna-con-electrodomesticos-inteligentes.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
    },
    { 
      name: 'Moda', 
      image: 'https://media.falabella.com/falabellaCO/883011330_1/w=800,h=800,fit=pad' 
    },
    { 
      name: 'Hogar', 
      image: 'https://images.pexels.com/photos/2343466/pexels-photo-2343466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' 
    }
  ];

  // Productos destacados con imágenes reales
  featuredProducts = [
    {
      name: 'Smartphone Pro',
      price: 599.99,
      image: 'https://media.falabella.com/falabellaCO/73059865_1/w=800,h=800,fit=pad'
    },
    {
      name: 'Laptop Ultra',
      price: 1299.99,
      image: 'https://media.falabella.com/falabellaCO/140928629_01/w=800,h=800,fit=pad'
    },
    {
      name: 'Audífonos Premium',
      price: 199.99,
      image: 'https://media.falabella.com/falabellaCO/131985605_01/w=800,h=800,fit=pad'
    }
  ];

  // Método para manejar selección de fecha
  onDateSelected(event: Date) {
    console.log('Fecha seleccionada:', event);
    // Aquí puedes añadir lógica para filtrar productos por fecha
  }

  // Método para agregar al carrito
  addToCart(product: any) {
    this.cartCount++;
    console.log('Producto añadido:', product);
    // Aquí iría la lógica para agregar al carrito real
  }
}