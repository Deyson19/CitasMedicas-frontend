import { Component, Input, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Medico } from 'src/app/models';
import { MedicosService } from '../../services/medicos.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-medicos-medico-card',
  templateUrl: './medico-card.component.html',
  styleUrls: ['./medico-card.component.css'],
})
export class MedicoCardComponent {
  @Input({ required: true })
  medico!: Medico;
  private _toast = inject(ToastrService);
  private _medicoServie = inject(MedicosService);
  private _dialog = inject(MatDialog);

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
          switchMap(() => this._medicoServie.eliminar(this.medico.id))
        )
        .subscribe((resp) => {
          if (resp.isSuccess) {
            this._toast.success(resp.message, 'Eliminado');
          }
        });
    }
  }
}
