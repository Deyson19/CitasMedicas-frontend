import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { PacientesService } from '../../services/pacientes.service';
import { Paciente } from 'src/app/models';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})
export class ListadoComponent implements OnInit {
  private _pacientesService = inject(PacientesService);
  private _toast = inject(ToastrService);
  pacientes: Paciente[] = [];
  private listadoPacientes = signal<Paciente[]>([]);

  isLoading = true;
  mensaje = 'Cargando los pacientes';

  isDeleting(x: boolean) {
    if (x) {
      this.isLoading = true;
      setTimeout(() => {
        this.listarTodo();
      }, 1000);
    }
  }

  ngOnInit(): void {
    this.listarTodo();
  }
  private listarTodo() {
    this._pacientesService.getPacientes().subscribe(
      (x) => {
        if (x.isSuccess) {
          this.listadoPacientes.set(x.result);
          this.pacientes = this.listadoPacientes();
        }
      },
      (error: HttpErrorResponse) => {
        this.isLoading = true;
        if (error.status === 0) {
          this._toast.error(error.statusText, 'Error', {
            timeOut: 5000,
          });
          setTimeout(() => {
            this.isLoading = false;
          }, 1500);
          return;
        }

        this._toast.warning(error.error);
      }
    );
    setTimeout(() => {
      this.isLoading = false;
    }, 850);
  }
}
