import { Component, OnInit, inject, signal } from '@angular/core';
import { CitasMedicasService } from '../../services/citas-medicas.service';
import { CitaMedica } from 'src/app/models';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  mensaje = 'Cargando citas medicas';
  isLoading = signal<boolean>(true);

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
