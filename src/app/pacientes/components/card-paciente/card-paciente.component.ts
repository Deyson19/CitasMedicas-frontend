import { Component, Input, inject } from '@angular/core';
import { Paciente } from '../../interfaces';
import { ToastrService } from 'ngx-toastr';
import { PacientesService } from '../../services/pacientes.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-pacientes-card-paciente',
  templateUrl: './card-paciente.component.html',
  styleUrls: ['./card-paciente.component.css'],
})
export class CardPacienteComponent {
  @Input({ required: true }) paciente!: Paciente;
  private dialog = inject(MatDialog);
  private _toast = inject(ToastrService);
  private _pacientesService = inject(PacientesService);

  onDeletePaciente() {
    if (!this.paciente.id) {
      this._toast.error('No hay paciente para eliminar', 'UUPPS!');
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: true,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((result) => result),
        switchMap(() => this._pacientesService.deletePaciente(this.paciente.id))
      )
      .subscribe((x) => {
        if (x.isSuccess) {
          this._toast.warning(x.message, 'OK!');
        }
      });
  }
}
