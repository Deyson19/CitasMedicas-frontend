import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacientesRoutingModule } from './pacientes-routing.module';
import { LayoutComponent } from './layout/layout.component';
import {
  ListadoComponent,
  DetalleComponent,
  HistorialPacienteComponent,
  NuevoComponent,
  BuscadorComponent,
} from './pages/';
import { MaterialModule } from '../material/material.module';
import { CardPacienteComponent } from './components/card-paciente/card-paciente.component';
import { SpinnerComponent } from '../shared/spinner/spinner.component';
import { SharedModule } from '../shared';

@NgModule({
  declarations: [
    LayoutComponent,
    ListadoComponent,
    DetalleComponent,
    HistorialPacienteComponent,
    NuevoComponent,
    BuscadorComponent,
    CardPacienteComponent,
  ],
  imports: [
    CommonModule,
    PacientesRoutingModule,
    MaterialModule,
    SpinnerComponent,
    SharedModule,
  ],
})
export class PacientesModule {}
