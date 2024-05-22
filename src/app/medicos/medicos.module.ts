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
import { SharedModule, SpinnerComponent } from '../shared';
import { MedicoCardComponent } from './compoents/medico-card/medico-card.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    LayoutComponent,
    ListadoComponent,
    DetalleComponent,
    BuscarMedicoNombreComponent,
    BuscarMedicoEspecialidadComponent,
    UpsertComponent,
    MedicoCardComponent,
  ],
  imports: [
    CommonModule,
    MedicosRoutingModule,
    SharedModule,
    SpinnerComponent,
    MaterialModule,
  ],
})
export class MedicosModule {}
