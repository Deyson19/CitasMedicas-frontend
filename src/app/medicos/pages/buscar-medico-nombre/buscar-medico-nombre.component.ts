import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Medico } from 'src/app/models';
import { MedicosService } from '../../services/medicos.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-medicos-buscar-medico-nombre',
  templateUrl: './buscar-medico-nombre.component.html',
})
export class BuscarMedicoNombreComponent {
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
      this._toast.warning('Debes ingresar un nombre');
      return;
    }

    setTimeout(() => {
      this._medicoService.buscarMedico(value).subscribe(
        (x) => {
          if (x.isSuccess) {
            this.medicos = x.result;
          } else {
            this._toast.error(x.message);
            this.searchInput.setValue('');
          }
        },
        (isError: HttpErrorResponse) => {
          if (isError.error && this.searchInput.value!.length > 1) {
            this._toast.error(isError.error.message);
            this.searchInput.setValue('');
            setTimeout(() => {
              this._router.navigate(['/medicos']);
            }, 500);
          }
        }
      );
    }, 450);
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
