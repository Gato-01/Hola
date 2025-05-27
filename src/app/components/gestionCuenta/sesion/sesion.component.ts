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
    if (this.loginForm.valid && !this.isLoading) {
      this.isLoading = true;
      this.errorMessage = '';
      
      const { email, password } = this.loginForm.value;

      this.apiService.login({ email, password }).subscribe({
        next: (response) => {
          Swal.fire({
            title: '¡Bienvenido!',
            text: `Has iniciado sesión correctamente como ${response.user.email}`,
            icon: 'success',
            confirmButtonText: 'Continuar',
            timer: 3000, // Se cierra automáticamente después de 3 segundos
            timerProgressBar: true
          }).then(() => {
            localStorage.setItem('token', response.token);
            localStorage.setItem('userEmail', response.user.email);
            this.router.navigate(['/dashboard']);
          });
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Error al iniciar sesión';
          Swal.fire({
            title: 'Error',
            text: this.errorMessage,
            icon: 'error',
            confirmButtonText: 'Entendido'
          });
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }
}