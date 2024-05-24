import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HistorialMedico } from 'src/app/models';
import { HistorialMedicoService } from '../../services/historial-medico.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent implements OnInit {
  private _historiaService = inject(HistorialMedicoService);
  private _activeRoute = inject(ActivatedRoute);
  private _router = inject(Router);
  private _toast = inject(ToastrService);
  historialMedico?: HistorialMedico;
  isLoading = true;
  mensaje = 'Buscando la historia médica';

  ngOnInit() {
    const idHistorial = this._activeRoute.snapshot.paramMap.get('id');
    if (idHistorial) {
      this._historiaService.obtener(idHistorial).subscribe(
        (x) => {
          if (x.isSuccess) {
            this.historialMedico = x.result;
            this._toast.success(x.message, 'Resgistro', {
              timeOut: 2500,
            });
            setTimeout(() => {
              this.isLoading = false;
            }, 2000);
          } else {
            this._toast.error(x.message, 'Uyy!');
          }
        },
        (error: HttpErrorResponse) => {
          if (error.status === 404) {
            this._toast.error(error.error, error.statusText);
            return;
          }
          this._toast.error(error.error.title, error.statusText);
        }
      );
    } else {
      this._toast.error('El parámetro no es correcto', 'Error!');
    }
  }
}
