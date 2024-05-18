import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from '../../interfaces';
import { PacientesService } from '../../services/pacientes.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { filter, switchMap } from 'rxjs';

@Component({
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent implements OnInit {
  private _router = inject(Router);
  private _activedRouter = inject(ActivatedRoute);
  private _pacientesService = inject(PacientesService);
  private _toastService = inject(ToastrService);
  private dialog = inject(MatDialog);
  private _toast = inject(ToastrService);
  paciente?: Paciente;
  isLoading = true;
  mensaje = 'Cargando datos del paciente';
  constructor() {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }
  ngOnInit(): void {
    this._activedRouter.params.subscribe((params) => {
      const id = params['id'];
      this._pacientesService.getPaciente(id).subscribe(
        (resp) => {
          if (resp.isSuccess) {
            this.paciente = resp.result;
            this._toastService.info(resp.message, 'OK', {
              timeOut: 700,
            });
            setTimeout(() => {
              this.isLoading = false;
            }, 800);
            return;
          }
          this.isLoading = false;
          this._toastService.error(resp.message, 'Error');
          this._router.navigateByUrl('/pacientes');
        },
        (error: HttpErrorResponse) => {
          this.isLoading = false;
          this._toastService.error(error.error.title, 'Error');
          this._router.navigateByUrl('/pacientes');
        }
      );
    });
  }
  onDelete() {
    if (!this.paciente!.id) {
      this._toast.error('No hay paciente para eliminar', 'UUPPS!');
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: true,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((result) => result),
        switchMap(() =>
          this._pacientesService.deletePaciente(this.paciente!.id)
        )
      )
      .subscribe((x) => {
        if (x.isSuccess) {
          this._toast.warning(x.message, 'OK!');
          this._router.navigateByUrl('/pacientes');
        } else {
          this._toast.error(x.message, 'Error!');
        }
      });
  }
}
