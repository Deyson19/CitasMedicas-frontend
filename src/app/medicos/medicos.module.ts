import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicosRoutingModule } from './medicos-routing.module';
import { LayoutComponent } from './layout/layout.component';
import {
  ListadoComponent,
  DetalleComponent,
  BuscarMedicoNombreComponent,
  BuscarMedicoEspecialidadComponent,
  UpsertComponent,
} from './pages/';

@NgModule({
  declarations: [
    LayoutComponent,
    ListadoComponent,
    DetalleComponent,
    BuscarMedicoNombreComponent,
    BuscarMedicoEspecialidadComponent,
    UpsertComponent,
  ],
  imports: [CommonModule, MedicosRoutingModule],
})
export class MedicosModule {}
