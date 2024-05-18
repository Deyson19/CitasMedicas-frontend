import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './layout/index.component';
import { RouterModule } from '@angular/router';
import { SharedModule, SpinnerComponent } from '../shared';
import { MaterialModule } from '../material/material.module';
import { ListadoComponent } from './pages/';
import { CitasMedicasRoutingModule } from './citas-medicas-routing.module';
import { CitaComponent } from './components/cita/cita.component';

@NgModule({
  declarations: [IndexComponent, ListadoComponent, CitaComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MaterialModule,
    CitasMedicasRoutingModule,
    SpinnerComponent,
  ],
})
export class CitasMedicasModule {}
