import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import {
  BuscarMedicoEspecialidadComponent,
  DetalleComponent,
  ListadoComponent,
  UpsertComponent,
} from './pages';

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
        path: 'nuevo',
        component: UpsertComponent,
      },
      {
        path: 'editar/:id',
        component: UpsertComponent,
      },
      {
        path: 'buscar-medico',
        component: BuscarMedicoEspecialidadComponent,
      },
      {
        path: 'buscar-especialidad',
        component: BuscarMedicoEspecialidadComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicosRoutingModule {}
