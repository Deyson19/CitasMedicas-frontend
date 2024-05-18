import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './layout/index.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { MaterialModule } from '../material/material.module';
import { ListadoComponent } from './pages/';
import { CitasMedicasRoutingModule } from './citas-medicas-routing.module';

@NgModule({
  declarations: [IndexComponent, ListadoComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MaterialModule,
    CitasMedicasRoutingModule,
  ],
})
export class CitasMedicasModule {}
