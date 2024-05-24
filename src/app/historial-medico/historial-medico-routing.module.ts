import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import {
  DetalleComponent,
  HistorialMedicoComponent,
  HistorialPacienteComponent,
  ListPageComponent,
  UpsertComponent,
} from './pages';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ListPageComponent,
      },
      {
        path: 'historia/:id',
        component: DetalleComponent,
      },
      {
        path: 'nuevo',
        component: UpsertComponent,
      },
      {
        path: 'historial-paciente/:id',
        component: HistorialPacienteComponent,
      },
      {
        path: 'historial-medico/:id',
        component: HistorialMedicoComponent,
      },
      {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialMedicoRoutingModule {}
