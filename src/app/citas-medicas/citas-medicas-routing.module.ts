import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './layout/index.component';
import { DetalleComponent, ListadoComponent } from './pages';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: '',
        component: ListadoComponent,
      },
      {
        path: 'detalle/:id',
        component: DetalleComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitasMedicasRoutingModule {}
