import { Component } from '@angular/core';

@Component({
  selector: 'app-ayuda',
  standalone: false,
  templateUrl: './ayuda.component.html',
  styleUrl: './ayuda.component.css'
})
export class AyudaComponent {
// Aquí puedes agregar propiedades y lógica del componente
  preguntasFrecuentes = [
    {
      pregunta: '¿Cómo realizo un pedido?',
      respuesta: 'Puedes realizar tu pedido seleccionando los productos y haciendo clic en el botón "Comprar".'
    },
    {
      pregunta: '¿Cuáles son los métodos de pago?',
      respuesta: 'Aceptamos tarjetas de crédito/débito, PayPal y transferencias bancarias.'
    },
    {
      pregunta: '¿Cuánto tarda el envío?',
      respuesta: 'El tiempo de envío varía entre 2-5 días hábiles dependiendo de tu ubicación.'
    }
  ];

  preguntaExpandida: number | null = null;

  toggleRespuesta(index: number) {
    this.preguntaExpandida = this.preguntaExpandida === index ? null : index;
  }
}
