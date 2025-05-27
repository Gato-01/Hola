import { Component } from '@angular/core';

@Component({
  selector: 'app-ayuda',
  standalone: false,
  templateUrl: './ayuda.component.html',
  styleUrl: './ayuda.component.css'
})
export class AyudaComponent {
preguntaExpandida: number | null = null;
  enviando = false;
  mensajeConfirmacion = '';
  
  consulta = {
    nombre: '',
    email: '',
    mensaje: ''
  };

  preguntasFrecuentes = [
    {
      pregunta: '¿Cómo realizo un pedido?',
      respuesta: 'Puedes realizar pedidos directamente desde nuestra web seleccionando los productos y completando el proceso de compra.'
    },
    {
      pregunta: '¿Cómo realizo un pedido?',
      respuesta: 'Puedes realizar pedidos directamente desde nuestra web seleccionando los productos y completando el proceso de compra.'
    },
    {
      pregunta: '¿Cómo realizo un pedido?',
      respuesta: 'Puedes realizar pedidos directamente desde nuestra web seleccionando los productos y completando el proceso de compra.'
    },
    // ... otras preguntas frecuentes
  ];

  toggleRespuesta(index: number) {
    this.preguntaExpandida = this.preguntaExpandida === index ? null : index;
  }

  enviarConsulta() {
    this.enviando = true;
    
    // Simulamos el envío al servidor
    setTimeout(() => {
      console.log('Consulta enviada:', this.consulta);
      this.enviando = false;
      this.mensajeConfirmacion = 'Tu consulta ha sido enviada. Te responderemos a ' + this.consulta.email + ' en 24-48 horas.';
      
      // Resetear el formulario después de 5 segundos
      setTimeout(() => {
        this.mensajeConfirmacion = '';
        this.consulta = { nombre: '', email: '', mensaje: '' };
      }, 5000);
    }, 1500);
  }
}
