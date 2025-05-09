import { Component } from '@angular/core';
import { ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
  selector: 'app-preguntas-frecuentes',
  standalone: false,
  templateUrl: './preguntas-frecuentes.component.html',
  styleUrl: './preguntas-frecuentes.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreguntasFrecuentesComponent {
  readonly panelOpenState = signal(false);
}
