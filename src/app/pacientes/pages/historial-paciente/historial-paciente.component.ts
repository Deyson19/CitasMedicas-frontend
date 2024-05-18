import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PacientesService } from '../../services/pacientes.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { CitaMedica, HistorialMedico, Medico, Paciente } from 'src/app/models';

@Component({
  templateUrl: './historial-paciente.component.html',
  styleUrls: ['./historial-paciente.component.css'],
})
export class HistorialPacienteComponent implements OnInit {
  private _router = inject(Router);
  private _activeRoute = inject(ActivatedRoute);
  private _pacientesService = inject(PacientesService);
  private _toast = inject(ToastrService);
  historialMedico?: HistorialMedico[];
  paciente?: Paciente;
  medicos: Medico[] = [];
  citasMedicas: CitaMedica[] = [];
  idPaciente?: string;
  isLoading = true;
  mensaje = 'Buscando historial médico.';

  ngOnInit(): void {
    const id = this._activeRoute.snapshot.params['pacienteId'];
    if (!id) {
      this._toast.error(
        'No se ha encontrado el paciente',
        'No es válido el parámetro'
      );
      setTimeout(() => {
        this._router.navigate(['/pacientes']);
      }, 1800);
    }

    //*Existe el id
    this.idPaciente = id;
    this._pacientesService.getHistorialPaciente(id).subscribe(
      (resp) => {
        if (resp.isSuccess) {
          this._toast.success(resp.message, 'Búsqueda Realizada');
          this.historialMedico = resp.result;
          this.paciente = resp.result[0].paciente;
          resp.result.forEach((x) => {
            this.medicos!.push(x.medico);
            this.citasMedicas!.push(x.citaMedica);
          });

          this.isLoading = false;
        } else {
          this.redirectUser();
        }
      },
      (isError: HttpErrorResponse) => {
        if (isError.status === 400) {
          this._toast.error(
            isError.error.errors.pacienteId,
            isError.statusText
          );
        } else {
          this._toast.error(isError.error.message, isError.statusText);
        }
        setTimeout(() => {
          this.redirectUser();
        }, 2500);
      }
    );
  }
  private redirectUser() {
    setTimeout(() => {
      this.isLoading = true;
      this._router.navigate(['/pacientes']);
    }, 1500);
  }
}
