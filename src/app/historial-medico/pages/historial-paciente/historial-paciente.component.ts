import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HistorialMedico, Paciente } from 'src/app/models';
import { HistorialMedicoService } from '../../services/historial-medico.service';

@Component({
  templateUrl: './historial-paciente.component.html',
  styleUrls: ['./historial-paciente.component.css'],
})
export class HistorialPacienteComponent {
  private _historiaService = inject(HistorialMedicoService);
  private _activeRoute = inject(ActivatedRoute);
  private _router = inject(Router);
  private _toast = inject(ToastrService);
  historialesDelPaciente: HistorialMedico[] = [];
  paciente?: Paciente;
  isLoading = true;
  mensaje = 'Buscando los historiales del paciente';

  ngOnInit() {
    const id = this._activeRoute.snapshot.paramMap.get('id');
    if (!id) {
      this.redirection();
      return;
    } else {
      this.obtenerTodo(id);
    }
  }

  private obtenerTodo(idPaciente: string) {
    this._historiaService.historialPorPaciente(idPaciente).subscribe(
      (resp) => {
        if (resp.isSuccess) {
          this.historialesDelPaciente = resp.result;
          resp.result.forEach((x) => {
            this.paciente = x.paciente;
          });
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        }
      },
      (err: HttpErrorResponse) => {
        if (err.status === 404) {
          this._toast.error(err.error, err.statusText);
        }
        if (err.status === 400) {
          this._toast.error(err.error.title, err.statusText);
        }
        this.redirection();
      }
    );
  }
  private redirection() {
    setTimeout(() => {
      this.isLoading = false;
      this._router.navigate(['/historial-medico']);
    }, 1200);
  }
}
