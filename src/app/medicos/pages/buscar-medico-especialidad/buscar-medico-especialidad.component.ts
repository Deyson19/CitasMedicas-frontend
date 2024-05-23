import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Medico } from 'src/app/models';
import { MedicosService } from '../../services/medicos.service';
import { MedicosResponse } from '../../interfaces';

@Component({
  selector: 'app-medicos-buscar-medico-especialidad',
  templateUrl: './buscar-medico-especialidad.component.html',
})
export class BuscarMedicoEspecialidadComponent {
  private _toast = inject(ToastrService);
  private _router = inject(Router);
  public searchInput = new FormControl('');
  private _medicoService = inject(MedicosService);
  public nombreMedicoSeleccionado?: string;
  public medicoId?: string;
  medicoSeleccionado?: Medico;
  medicos: Medico[] = [];

  searchMedico() {
    const value = this.searchInput.value || '';
    if (!value) {
      this._toast.warning('Debes ingresar una especialidad');
      return;
    }

    setTimeout(() => {
      this._medicoService.buscarEspecialidad(value).subscribe(
        (x) => {
          if (x.isSuccess) {
            this.medicos = x.result;
          } else {
            this._toast.error(x.message);
            this.searchInput.setValue('');
          }
        },
        (isError: HttpErrorResponse) => {
          if (isError.error) {
            const response: MedicosResponse = isError.error;
            this._toast.error(response.message);
            this.searchInput.setValue('');
            return;
          }

          if (isError.error && this.searchInput.value!.length > 1) {
            this._toast.error(isError.error.message);
            this.searchInput.setValue('');
            // setTimeout(() => {
            //   this._router.navigate(['/medicos']);
            // }, 1200);
          }
        }
      );
    }, 1200);
  }
  onSelectedOption(value: MatAutocompleteSelectedEvent) {
    if (!value.option.value) {
      this.nombreMedicoSeleccionado = '';
      return;
    }
    //*Tomar elemento seleccionado
    const medico: string = value.option.value;
    //*Pasar valor al input
    this.searchInput.setValue(medico);
    //*Obtener objeto y asignarlo a la variable que se tiene
    this.nombreMedicoSeleccionado = medico;
    const buscarEnListadoActual = this.medicos.find(
      (x) => x.nombre.toLocaleLowerCase() === medico.toLocaleLowerCase()
    );
    if (buscarEnListadoActual) {
      this.medicoSeleccionado = buscarEnListadoActual;
    }
  }
}
