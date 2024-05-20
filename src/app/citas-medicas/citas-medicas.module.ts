import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './layout/index.component';
import { RouterModule } from '@angular/router';
import { SharedModule, SpinnerComponent } from '../shared';
import { MaterialModule } from '../material/material.module';
import { ListadoComponent, DetalleComponent } from './pages/';
import { CitasMedicasRoutingModule } from './citas-medicas-routing.module';
import { CitaComponent } from './components/cita/cita.component';
import { CrearCitaComponent } from './components/crear-cita/crear-cita.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    IndexComponent,
    ListadoComponent,
    CitaComponent,
    DetalleComponent,
    CrearCitaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MaterialModule,
    CitasMedicasRoutingModule,
    SpinnerComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class CitasMedicasModule {}
