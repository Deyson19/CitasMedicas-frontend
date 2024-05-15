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

@NgModule({
  declarations: [
    LayoutComponent,
    ListadoComponent,
    DetalleComponent,
    HistorialPacienteComponent,
    NuevoComponent,
    BuscadorComponent,
  ],
  imports: [CommonModule, PacientesRoutingModule],
})
export class PacientesModule {}
