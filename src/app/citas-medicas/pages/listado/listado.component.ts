import { Component, Inject, OnInit, inject, signal } from '@angular/core';
import { CitasMedicasService } from '../../services/citas-medicas.service';
import { CitaMedica, Medico } from 'src/app/models';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CrearCitaMedica } from '../../models/crear-cita-medica';
import { CrearCitaComponent } from '../../components/crear-cita/crear-cita.component';
import { CitaMedicaViewModel } from '../../models/CitaMedicaViewModel';

@Component({
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})
export class ListadoComponent implements OnInit {
  //*Servicios
  private _citasService = inject(CitasMedicasService);
  private _snackBar = inject(MatSnackBar);
  private _toast = inject(ToastrService);

  //*Variables
  public citasMedicas: CitaMedica[] = [];
  public medicos: Medico[] = [];
  mensaje = 'Cargando citas medicas';
  isLoading = signal<boolean>(true);

  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CrearCitaComponent);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this._toast.success('Registro creado', 'Datos Guardados');
      }
    });
  }

  ngOnInit(): void {
    this._citasService.getAll().subscribe((resp) => {
      if (resp.isSuccess) {
        setTimeout(() => {
          this.isLoading.set(false);
          this._snackBar.open(resp.message, 'Ok', {
            duration: 2500,
          });
        }, 1800);
        this.citasMedicas = resp.result;
      } else {
        this._snackBar.open(resp.message, 'Ok', {
          duration: 2000,
        });
      }
    });
  }
}
