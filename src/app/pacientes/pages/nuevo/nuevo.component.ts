import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrearActualizarPaciente } from '../../models/crearpaciente.model';
import { ToastrService } from 'ngx-toastr';
import { PacientesService } from '../../services/pacientes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css'],
})
export class NuevoComponent implements OnInit {
  //*Servicios - Inyecciones de dependencia
  private fb = inject(FormBuilder);
  private _toast = inject(ToastrService);
  private _activeRoute = inject(ActivatedRoute);
  private _router = inject(Router);
  private _pacientesService = inject(PacientesService);
  //*Variables
  public nuevoPaciente?: CrearActualizarPaciente;
  public isLoading = false;
  public mensaje = 'Buscando paciente...';
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
  ngOnInit(): void {
    const id = this._activeRoute.snapshot.params['id'];
    if (id) {
      this.idPaciente = id;
      this.isLoading = true;
      this._pacientesService.getPaciente(id).subscribe(
        (resp) => {
          if (resp.isSuccess) {
            setTimeout(() => {
              this._toast.success(resp.message, 'OK!');
              this.isLoading = false;
              this.nuevoPaciente = resp.result;
              this.formPaciente.patchValue(this.nuevoPaciente);
            }, 1800);
          }
        },
        (error: HttpErrorResponse) => {
          this._toast.error(error.error.message, error.statusText);
          setTimeout(() => {
            this.isLoading = false;
            this._router.navigate(['/pacientes']);
          }, 1800);
        }
      );
    }
  }

  onSubmit() {
    if (this.formPaciente.valid && !this.idPaciente) {
      this.nuevoPaciente = this.formPaciente.value;
      this.nuevoRegistro();
    } else {
      this.actualizarRegistro();
    }
  }
  private nuevoRegistro() {
    this._pacientesService.postCrearPaciente(this.nuevoPaciente!).subscribe(
      (resp) => {
        if (resp.isSuccess) {
          this._toast.success(resp.message, 'Registro Creado');
          setTimeout(() => {
            this._router.navigate(['/pacientes']);
          }, 1800);
        } else {
          this._toast.error(resp.message, 'Error');
        }
      },
      (error: HttpErrorResponse) => {
        this._toast.error(
          error.error.message || 'Error desconocido',
          error.statusText
        );
        setTimeout(() => {
          this._router.navigate(['/pacientes']);
        }, 1800);
      }
    );
  }
  private actualizarRegistro() {
    if (this.formPaciente.valid && this.idPaciente) {
      this.nuevoPaciente = this.formPaciente.value;
      this._pacientesService
        .putActualizarPaciente(this.idPaciente, this.formPaciente.value)
        .subscribe(
          (resp) => {
            if (resp.isSuccess) {
              this._toast.success(resp.message, 'Registro Actualizado');
              setTimeout(() => {
                this._router.navigate(['/pacientes']);
              }, 1800);
            }
          },
          (error: HttpErrorResponse) => {
            this._toast.error(
              error.error.message || 'Error desconocido',
              error.statusText
            );
            setTimeout(() => {
              this._router.navigate(['/pacientes']);
            }, 1800);
          }
        );
    }
  }
  errorMessage(value: string): string {
    return `El campo ${value} no es correcto`;
  }
}
