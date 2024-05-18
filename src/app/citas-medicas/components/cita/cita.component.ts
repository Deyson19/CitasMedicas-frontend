import { Component, Input } from '@angular/core';
import { CitaMedica } from 'src/app/models';

@Component({
  selector: 'app-citasmedicas-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css'],
})
export class CitaComponent {
  @Input({ required: true }) citaMedica!: CitaMedica;
  constructor() {}
}
