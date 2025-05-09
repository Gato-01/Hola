import { Component } from '@angular/core';
import { PreguntasFrecuentesComponent } from '../preguntas-frecuentes/preguntas-frecuentes.component';

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

  addToCart(product: any) {
    this.cartCount++;
    // Aquí iría la lógica para agregar al carrito
    console.log('Producto añadido:', product);
  }

}
