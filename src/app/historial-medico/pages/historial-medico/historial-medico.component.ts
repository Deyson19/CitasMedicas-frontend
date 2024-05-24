import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HistorialMedico, Medico } from 'src/app/models';
import { HistorialMedicoService } from '../../services/historial-medico.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './historial-medico.component.html',
  styleUrls: ['./historial-medico.component.css'],
})
export class HistorialMedicoComponent implements OnInit {
  private _historiaService = inject(HistorialMedicoService);
  private _activeRoute = inject(ActivatedRoute);
  private _router = inject(Router);
  private _toast = inject(ToastrService);
  historialesDelMedico: HistorialMedico[] = [];
  medico?: Medico;
  isLoading = true;
  mensaje = 'Buscando los historiales del médico';

  ngOnInit() {
    const id = this._activeRoute.snapshot.paramMap.get('id');
    if (!id) {
      this.redirection();
      return;
    } else {
      this.obtenerTodo(id);
    }
  }

  private obtenerTodo(idMedico: string) {
    this._historiaService.historialPorMedico(idMedico).subscribe(
      (resp) => {
        if (resp.isSuccess) {
          this.historialesDelMedico = resp.result;
          resp.result.forEach((x) => {
            this.medico = x.medico;
          });
          this.isLoading = false;
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
