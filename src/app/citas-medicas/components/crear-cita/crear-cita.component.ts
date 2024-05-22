import { Paciente } from './../../../models/paciente.interface';
import { Component, OnInit, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Medico } from 'src/app/models';
import { CitasMedicasService } from '../../services/citas-medicas.service';
import { PacientesService } from 'src/app/pacientes/services/pacientes.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitaMedicaViewModel } from '../../models/CitaMedicaViewModel';
import { CrearCitaMedica } from '../../models/crear-cita-medica';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-citasmedicas-crear-cita',
  templateUrl: './crear-cita.component.html',
  styleUrls: ['./crear-cita.component.css'],
})
export class CrearCitaComponent implements OnInit {
  //*Servicios
  private _citasService = inject(CitasMedicasService);
  private _paciente = inject(PacientesService);
  private _toast = inject(ToastrService);
  private fb = inject(FormBuilder);

  //*Variables
  medicosList: Medico[] = [];
  pacientes: Paciente[] = [];
  public formCrearCita: FormGroup;
  private citaViewModel?: CitaMedicaViewModel;

  constructor(public dialogRef: MatDialogRef<CrearCitaComponent>) {
    this.formCrearCita = this.fb.group({
      sintomas: ['', [Validators.required, Validators.minLength(10)]],
      fecha: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      pacienteId: ['', [Validators.required, Validators.minLength(10)]],
      medicoId: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
  onConfirm() {
    if (this.formCrearCita.valid) {
      this.citaViewModel = this.formCrearCita.value;
      const citaMedicaViewModel: CitaMedicaViewModel = this.formCrearCita.value;

      const nuevaCitaMedica: CrearCitaMedica = {
        citaMedica: { ...citaMedicaViewModel },
        pacienteId: citaMedicaViewModel.pacienteId,
        medicoId: citaMedicaViewModel.medicoId,
      };

      this._citasService.post(nuevaCitaMedica).subscribe(
        (x) => {
          if (x) {
            this._toast.success(x.message, 'Creado');
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error);

          this._toast.error(error.error.message, 'Error');
        }
      );
      this.dialogRef.close(true);
    }
  }
  ngOnInit(): void {
    this.obtenerPacientes();
    this.obtenerMedicos();
  }

  private obtenerPacientes() {
    this._paciente.getPacientes().subscribe(
      (resp) => {
        if (resp.isSuccess) {
          this.pacientes = resp.result;
        }
      },
      (error) => {
        this._toast.error('Error al obtener los pacientes');
      }
    );
  }
  private obtenerMedicos() {
    this._citasService.listadoMedicos().subscribe(
      (resp) => {
        if (resp.isSuccess) {
          this.medicosList = resp.result;
        }
      },
      (error) => {
        this._toast.error('Error al obtener los medicos');
      }
    );
  }
}
