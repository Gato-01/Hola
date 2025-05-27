import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito-producto',
    standalone: false,
  templateUrl: './carrito-producto.component.html',
  styleUrls: ['./carrito-producto.component.css']
})
export class CarritoProductoComponent implements OnInit {
  
  cart: Product[] = [];
  reminders: Product[] = [];
  currentUser: any;
  paymentMethod: string = 'credit-card';

  selectedPaymentMethod = 'credit';
cardNumber = '';
shippingAddress = {
  street: '',
  city: '',
  zip: '',
  country: ''
};



  
  ngOnInit() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
      this.cart = this.currentUser.cart || [];
      this.reminders = this.currentUser.reminders || [];
    }
  }

  selectPayment(method: string) {
    this.paymentMethod = method;
  }

  processPayment() {
    // Lógica de pago
    alert(`Compra realizada por ${this.currentUser.email} con ${this.paymentMethod}`);
    
    // Limpiar carrito después de pagar
    this.cart = [];
    localStorage.setItem('currentUser', JSON.stringify({
      ...this.currentUser,
      cart: []
    }));
  }

  get total(): number {
    return this.cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  }


    // Añade estos métodos a la clase
increaseQuantity(item: Product) {
  item.quantity = (item.quantity || 1) + 1;
  this.updateStorage();
}

decreaseQuantity(item: Product) {
  if (item.quantity && item.quantity > 1) {
    item.quantity--;
    this.updateStorage();
  }
}

moveToCart(item: Product) {
  this.cart.push({...item, quantity: 1});
  this.reminders = this.reminders.filter(p => p.id !== item.id);
  this.updateStorage();
}

private updateStorage() {
  localStorage.setItem('currentUser', JSON.stringify({
    ...this.currentUser,
    cart: this.cart,
    reminders: this.reminders
  }));
}
getPaymentMethodName(): string {
  const methods: {[key: string]: string} = {
    credit: 'Tarjeta',
    paypal: 'PayPal',
    transfer: 'Transferencia'
  };
  return methods[this.selectedPaymentMethod] || '';
}
constructor(private router: Router) {}
completePurchase() {
  Swal.fire({
    title: '¡Compra Exitosa!',
    html: `
      <div class="text-start">
        <p><strong>Método de pago:</strong> ${this.getPaymentMethodName()}</p>
        <p><strong>Enviar a:</strong> ${this.shippingAddress.street}, ${this.shippingAddress.city}</p>
        <p class="mt-3">Gracias por tu compra. Tu pedido llegará en 3-5 días.</p>
      </div>
    `,
    icon: 'success',
    confirmButtonText: 'Entendido'
  }).then(() => {
    this.cart = [];
    this.updateStorage(); // <- limpia el localStorage
    this.router.navigate(['/']); // <- redirige
  });
}


openAddressModal() {
  Swal.fire({
    title: '<strong style="font-size: 1.5rem; color: #1e87f0;">Dirección de Envío</strong>',
    html: `
      <style>
        .swal2-popup .swal2-input {
          border-radius: 10px;
          padding: 0.8rem;
          margin: 0.4rem 0;
          font-size: 0.95rem;
          border: 1px solid #dce3ed;
          box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .swal2-input::placeholder {
          color: #a0a0a0;
        }

        .swal2-popup {
          font-family: 'Segoe UI', sans-serif;
        }
      </style>

      <input id="swal-input-street" class="swal2-input" placeholder="📍 Calle y número">
      <input id="swal-input-city" class="swal2-input" placeholder="🏙️ Ciudad">
      <input id="swal-input-zip" class="swal2-input" placeholder="📮 Código Postal">
      <input id="swal-input-country" class="swal2-input" placeholder="🌎 País">
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: '📦 Confirmar Envío',
    cancelButtonText: '❌ Cancelar',
    preConfirm: () => {
      const street = (document.getElementById('swal-input-street') as HTMLInputElement).value;
      const city = (document.getElementById('swal-input-city') as HTMLInputElement).value;
      const zip = (document.getElementById('swal-input-zip') as HTMLInputElement).value;
      const country = (document.getElementById('swal-input-country') as HTMLInputElement).value;

      if (!street || !city || !zip || !country) {
        Swal.showValidationMessage('Por favor completa todos los campos');
        return;
      }

      return { street, city, zip, country };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      this.shippingAddress = result.value!;
      this.completePurchase();
    }
  });
}


}
