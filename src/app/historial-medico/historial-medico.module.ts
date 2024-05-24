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
import { SharedModule, SpinnerComponent } from '../shared';
import { MaterialModule } from '../material/material.module';
import { HistorialCardComponent } from './components/historial-card/historial-card.component';

@NgModule({
  declarations: [
    ListPageComponent,
    DetalleComponent,
    UpsertComponent,
    HistorialPacienteComponent,
    HistorialMedicoComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    HistorialMedicoRoutingModule,
    SharedModule,
    SpinnerComponent,
    MaterialModule,
    HistorialCardComponent,
  ],
})
export class HistorialMedicoModule {}
