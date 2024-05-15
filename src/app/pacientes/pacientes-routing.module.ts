import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import {
  ListadoComponent,
  DetalleComponent,
  HistorialPacienteComponent,
  NuevoComponent,
  BuscadorComponent,
} from './pages/';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ListadoComponent,
      },
      {
        path: 'detalle/:id',
        component: DetalleComponent,
      },
      {
        path: 'historialPaciente/:pacienteId',
        component: HistorialPacienteComponent,
      },
      {
        path: 'nuevo',
        component: NuevoComponent,
      },
      {
        path: 'editar/:id',
        component: NuevoComponent,
      },
      {
        path: 'buscador',
        component: BuscadorComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacientesRoutingModule {}
