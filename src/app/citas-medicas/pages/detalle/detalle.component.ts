import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CitaMedica } from 'src/app/models';
import { CitasMedicasService } from '../../services/citas-medicas.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { filter, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './detalle.component.html',
})
export class DetalleComponent implements OnInit {
  //*Services
  private _router = inject(Router);
  private _activedRouter = inject(ActivatedRoute);
  private _citasService = inject(CitasMedicasService);
  private dialog = inject(MatDialog);
  private _toast = inject(ToastrService);
  //*Variables
  citaMedica?: CitaMedica;
  isLoading = true;
  mensaje = 'Cargando datos de la cita medica';
  constructor() {}
  ngOnInit(): void {
    const citaId = this._activedRouter.snapshot.params['id'];
    if (!citaId) {
      this._toast.warning(
        'No se puede acceder a los recursos',
        'Parámetro Incorrecto'
      );
      setTimeout(() => {
        this._router.navigate(['/citas-medicas']);
      }, 2000);
      return;
    }
    this._citasService.getById(citaId).subscribe(
      (resp) => {
        if (resp.isSuccess) {
          setTimeout(() => {
            this.citaMedica = resp.result;
            this.isLoading = false;
          }, 1800);
          this._toast.info(resp.message, 'OK', {
            timeOut: 1500,
          });
        }
      },
      (error) => {
        this._toast.error(error.error, 'Error');
        this._router.navigate(['/citas-medicas']);
      }
    );
  }

  onDelete() {
    if (!this.citaMedica!.id) {
      this._toast.error('No hay elemento para eliminar', 'Incorrecto!');
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: true,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((result) => result),
        switchMap(() => this._citasService.delete(this.citaMedica!.id))
      )
      .subscribe(
        (x) => {
          console.log(x);
          if (x) {
            this._toast.warning(x, 'Realizado');
            setTimeout(() => {
              this._router.navigate(['/citas-medicas']);
            }, 1500);
          } else {
            this._toast.error(x, 'Error');
          }
        },
        (error: HttpErrorResponse) => {
          this._toast.warning(error.error.text, 'Error');
          this._router.navigate(['/citas-medicas']);
        }
      );
  }
}
