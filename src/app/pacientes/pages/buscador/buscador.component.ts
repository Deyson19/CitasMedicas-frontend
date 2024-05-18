import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PacientesService } from '../../services/pacientes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { HttpErrorResponse } from '@angular/common/http';
import { Paciente } from 'src/app/models';

@Component({
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css'],
})
export class BuscadorComponent {
  //*Inyecciones de dependencia
  private _router = inject(Router);
  private _toast = inject(ToastrService);
  private _pacientesService = inject(PacientesService);
  public pacientes: Paciente[] = [];
  public searchInput = new FormControl('');
  public nombrePacienteSeleccionado?: string;
  public pacienteSeleccionado?: Paciente; //? indica que puede ser nulo
  public pacienteId?: string;

  searchPaciente() {
    const value = this.searchInput.value || '';
    if (!value) {
      return;
    }

    setTimeout(() => {
      this._pacientesService.searchPaciente(value).subscribe(
        (resp) => {
          if (resp.isSuccess) {
            this.pacientes = resp.result;
          } else {
            this._toast.error(resp.message);
            this.searchInput.setValue('');
          }
        },
        (error: HttpErrorResponse) => {
          if (error.error && this.searchInput.value!.length > 1) {
            this._toast.error(error.error.message, 'No se pudo realizar');
            setTimeout(() => {}, 1500);
          }
        }
      );
    }, 500);
  }

  onSelectedOption(value: MatAutocompleteSelectedEvent) {
    if (!value.option.value) {
      this.nombrePacienteSeleccionado = undefined;
      return;
    }

    //*Conservar el elemento seleccionado
    const paciente: string = value.option.value;

    //*Asignar el valor al input
    this.searchInput.setValue(paciente);

    //*Asignar el objeto paciente seleccionado
    this.nombrePacienteSeleccionado = paciente;
    const buscarEnLista = this.pacientes.find(
      (x) => x.nombre.toLowerCase() === paciente.toLowerCase()
    );
    if (buscarEnLista) {
      this.pacienteSeleccionado = buscarEnLista;
    }
  }
}
