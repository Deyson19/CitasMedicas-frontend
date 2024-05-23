import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistorialMedicoRoutingModule } from './historial-medico-routing.module';
import {
  ListPageComponent,
  DetalleComponent,
  UpsertComponent,
  HistorialPacienteComponent,
  HistorialMedicoComponent,
} from './pages/';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    ListPageComponent,
    DetalleComponent,
    UpsertComponent,
    HistorialPacienteComponent,
    HistorialMedicoComponent,
    LayoutComponent,
  ],
  imports: [CommonModule, HistorialMedicoRoutingModule],
})
export class HistorialMedicoModule {}
