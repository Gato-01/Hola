import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sesion',
    standalone: false,
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css']
})
export class SesionComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false; // Para deshabilitar el botón durante el envío

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

onSubmit() {
  if (this.loginForm.valid) {
    const { email, password } = this.loginForm.value;

    this.apiService.login({ email, password }).subscribe({
      next: (response) => {
        // Recupera los datos del carrito pendiente
        const pendingPurchase = localStorage.getItem('pendingPurchase');
        let purchaseData = { cart: [], reminders: [] };
        
        if (pendingPurchase) {
          purchaseData = JSON.parse(pendingPurchase);
          localStorage.removeItem('pendingPurchase'); // Limpia el storage
        }

        // Guarda usuario Y los datos del carrito
        localStorage.setItem('currentUser', JSON.stringify({
          ...response.user,
          cart: purchaseData.cart,
          reminders: purchaseData.reminders
        }));

        Swal.fire({
          title: '¡Bienvenido!',
          text: `Bienvenido ${response.user.email}`,
          icon: 'success',
          confirmButtonText: 'Continuar con mi compra',
          showCancelButton: true,
          cancelButtonText: 'Ir al inicio'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/carritoProducto']);
          } else {
            this.router.navigate(['/carrito']);
          }
        });
      },
      error: (error) => {
        // Manejo de errores
      }
    });
  }
}
}