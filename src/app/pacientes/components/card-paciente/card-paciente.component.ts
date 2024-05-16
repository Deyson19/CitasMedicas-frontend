import { Component, Input } from '@angular/core';
import { Paciente } from '../../interfaces';

@Component({
  selector: 'app-pacientes-card-paciente',
  templateUrl: './card-paciente.component.html',
  styleUrls: ['./card-paciente.component.css'],
})
export class CardPacienteComponent {
  @Input({ required: true }) paciente!: Paciente;
}
