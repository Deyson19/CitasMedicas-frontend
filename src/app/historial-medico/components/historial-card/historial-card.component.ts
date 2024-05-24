import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialMedico } from 'src/app/models';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-historial-medico-historial-card',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './historial-card.component.html',
})
export class HistorialCardComponent {
  @Input({ required: true })
  historiaMedica!: HistorialMedico;
}
