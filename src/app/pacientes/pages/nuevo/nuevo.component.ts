import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrearActualizarPaciente } from '../../models/crearpaciente.model';
import { ToastrService } from 'ngx-toastr';
import { PacientesService } from '../../services/pacientes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css'],
})
export class NuevoComponent {
  private fb = inject(FormBuilder);
  private _toast = inject(ToastrService);
  private _activedRoute = inject(ActivatedRoute);
  private _router = inject(Router);
  private _pacientesService = inject(PacientesService);
  public nuevoPaciente?: CrearActualizarPaciente;
  public idPaciente = undefined;
  public pacienteImg =
    'https://cdn.icon-icons.com/icons2/2265/PNG/512/crowd_patient_patients_icon_140420.png';
  public formPaciente: FormGroup;
  constructor() {
    this.formPaciente = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.formPaciente.valid) {
      this.nuevoPaciente = this.formPaciente.value;
      this._pacientesService
        .postCrearPaciente(this.nuevoPaciente!)
        .subscribe((resp) => {
          if (resp.isSuccess) {
            this._toast.success(resp.message, 'Registro Creado');
            this._router.navigate(['/pacientes']);
          } else {
            this._toast.error(resp.message, 'Error');
          }
        });
    }
  }
  errorMessage(value: string): string {
    return `El campo ${value} no es correcto`;
  }
}
