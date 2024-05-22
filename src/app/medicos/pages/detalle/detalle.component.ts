import { Component, OnInit, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Medico } from 'src/app/models';
import { MedicosService } from '../../services/medicos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-medicos-detalle',
  templateUrl: './detalle.component.html',
})
export class DetalleComponent implements OnInit {
  //*Services
  private _toast = inject(ToastrService);
  private _medicoService = inject(MedicosService);
  private _router = inject(Router);
  private _activeRouter = inject(ActivatedRoute);
  private _dialog = inject(MatDialog);

  //*Variables
  medico!: Medico;
  isLoading = true;
  mensaje = 'Buscando datos del medico';

  ngOnInit() {
    const id = this._activeRouter.snapshot.paramMap.get('id');
    if (!id) {
      this._router.navigate(['/medicos']);
    }
    this._medicoService.obtener(id!).subscribe(
      (resp) => {
        if (resp.isSuccess) {
          this.medico = resp.result;
          this._toast.success(resp.message);
          this.isLoading = false;
        } else {
          this._toast.error(resp.message);
        }
      },
      (y: HttpErrorResponse) => {
        this._toast.error(y.error.message);
        this._router.navigate(['/medicos']);
      }
    );
  }

  onDelete() {
    if (!this.medico.id) {
      this._toast.error('No hay médico seleccionado', 'Error');
    } else {
      const dialogRef = this._dialog.open(ConfirmDialogComponent, {
        data: true,
      });
      //Suscribirse a la emisión del componente
      dialogRef
        .afterClosed()
        .pipe(
          filter((x) => x),
          switchMap(() => this._medicoService.eliminar(this.medico.id))
        )
        .subscribe((resp) => {
          if (resp.isSuccess) {
            this._toast.success(resp.message, 'Eliminado');
            this._router.navigate(['/medicos']);
          }
        });
    }
  }
}
