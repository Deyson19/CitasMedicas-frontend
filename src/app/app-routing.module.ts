import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'pacientes',
    loadChildren: () =>
      import('./pacientes/pacientes.module').then((m) => m.PacientesModule),
  },
  {
    path: 'medicos',
    loadChildren: () =>
      import('./medicos/medicos.module').then((m) => m.MedicosModule),
  },
  {
    path: 'citas-medicas',
    loadChildren: () =>
      import('./citas-medicas/citas-medicas.module').then(
        (x) => x.CitasMedicasModule
      ),
  },
  {
    path: 'historial-medico',
    loadChildren: () =>
      import('./historial-medico/historial-medico.module').then(
        (x) => x.HistorialMedicoModule
      ),
  },
  {
    path: '**',
    redirectTo: 'pacientes',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
