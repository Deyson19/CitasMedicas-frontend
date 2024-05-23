import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MedicosService } from '../../services/medicos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Medico } from 'src/app/models';
import { CrearMedico } from '../../models/crearmedico';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-medicos-upsert',
  templateUrl: './upsert.component.html',
})
export class UpsertComponent implements OnInit {
  //*Services
  private _toast = inject(ToastrService);
  private fb = inject(FormBuilder);
  private _medicoService = inject(MedicosService);
  private _router = inject(Router);
  private _activeRoute = inject(ActivatedRoute);
  //*Properties
  titulo = 'Ingresar Médico';
  private medico?: Medico;
  mensaje = 'Cargando datos del médico';
  upsertMedico?: CrearMedico;
  isLoading?: boolean;
  formMedico: FormGroup;

  constructor() {
    this.formMedico = this.fb.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(50),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(50),
          Validators.email,
        ],
      ],
      telefono: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(50),
        ],
      ],
      especialidad: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(50),
        ],
      ],
    });
  }

  ngOnInit() {
    const id = this._activeRoute.snapshot.paramMap.get('id');
    if (id) {
      this.isLoading = true;
      this._medicoService.obtener(id).subscribe(
        (x) => {
          if (x.isSuccess) {
            setTimeout(() => {
              this.isLoading = false;
              this.medico = x.result;
              this.titulo = 'Actualizar Médico';
              this._toast.success(x.message, 'Encontrado');
              this.formMedico.patchValue(x.result);
            }, 1700);
          }
        },
        (error: HttpErrorResponse) => {
          this._toast.error(error.error.message, 'Error');
          setTimeout(() => {
            this.isLoading = false;
            this._router.navigate(['/medicos']);
          }, 1200);
        }
      );
    }
  }

  onSubmit() {
    if (this.formMedico.invalid) {
      this._toast.warning('Formulario no es correcto', 'Error');
    }
    if (this.formMedico.valid && this.medico?.id) {
      this.actualizarMedico();
    } else {
      this.nuevoMedico();
    }
  }
  private nuevoMedico() {
    if (this.formMedico.valid) {
      this.upsertMedico = this.formMedico.value;
      this._medicoService.crear(this.upsertMedico!).subscribe(
        (x) => {
          if (x.isSuccess) {
            this._toast.success(x.message, 'Realizado');
            this._router.navigate(['/medicos']);
          }
        },
        (error) => {
          this._toast.error(error.error.message, 'Error', {
            timeOut: 3000,
          });
          this._router.navigate(['/medicos']);
        }
      );
    }
  }
  private actualizarMedico() {
    if (this.formMedico.valid) {
      this.upsertMedico = this.formMedico.value;
      this._medicoService.editar(this.medico!.id, this.upsertMedico!).subscribe(
        (x) => {
          if (x.isSuccess) {
            this._toast.success(x.message, 'Realizado');
            this._router.navigate(['/medicos']);
          }
        },
        (error) => {
          this._toast.error(error.error.message, 'Error', {
            timeOut: 3000,
          });
          this._router.navigate(['/medicos']);
        }
      );
    }
  }

  errorMessage(value: string): string {
    return `El campo ${value} no es correcto`;
  }
}
