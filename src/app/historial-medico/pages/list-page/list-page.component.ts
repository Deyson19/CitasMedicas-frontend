import { Component, OnInit, inject } from '@angular/core';
import { HistorialMedicoService } from '../../services/historial-medico.service';
import { HistorialMedico, MenuItems } from 'src/app/models';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

interface ButtonsMenuItems extends MenuItems {
  color: string;
}
@Component({
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css'],
})
export class ListPageComponent implements OnInit {
  //*Services
  private _historialService = inject(HistorialMedicoService);
  private _toast = inject(ToastrService);
  //*Variables
  public historialesMedico: HistorialMedico[] = [];
  buttonsMenu: ButtonsMenuItems[] = [
    {
      path: '/pacientes',
      color: 'primary',
      icon: 'personal_injury',
      name: 'Ver Pacientes',
    },
    {
      path: '/medicos',
      color: 'warn',
      name: 'Ver Médicos',
      icon: 'medical_services',
    },
    {
      path: '/citas-medicas',
      color: 'accent',
      name: 'Ver Citas Médicas',
      icon: 'checklist',
    },
  ];
  public loading: boolean = true;
  public mensaje = 'Listado de Historial Médico';

  ngOnInit() {
    this.listarTodos();
  }
  private listarTodos() {
    this._historialService.obtenerTodos().subscribe(
      (x) => {
        if (x.isSuccess) {
          this.historialesMedico = x.result;
          setTimeout(() => {
            this.loading = false;
          }, 1200);
        } else {
          this._toast.error(x.message);
        }
      },
      (error: HttpErrorResponse) => {
        if (error.status === 0) {
          this._toast.error(error.statusText, 'Error');
          return;
        }
        this._toast.error(error.error.message, 'Error');
      }
    );
  }
}
