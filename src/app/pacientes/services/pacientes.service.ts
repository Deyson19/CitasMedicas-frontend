import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, computed, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import {
  PacientesResponse,
  PacienteResponse,
  HistorialPaciente,
  Pacientes,
} from '../interfaces/';
import { CrearActualizarPaciente } from '../models/crearpaciente.model';

@Injectable({
  providedIn: 'root',
})
export class PacientesService implements OnInit {
  private _http = inject(HttpClient);
  private _baseUrl = environment.apiUrl;
  constructor() {}
  ngOnInit(): void {}

  getPacientes(): Observable<PacientesResponse> {
    return this._http.get<PacientesResponse>(`${this._baseUrl}/Paciente`);
  }

  getPaciente(idPaciente: string): Observable<PacienteResponse> {
    return this._http.get<PacienteResponse>(
      `${this._baseUrl}/Paciente/${idPaciente}`
    );
  }

  getHistorialPaciente(idPaciente: string): Observable<HistorialPaciente> {
    return this._http.get<HistorialPaciente>(
      `${this._baseUrl}/Paciente/HistorialPaciente/${idPaciente}`
    );
  }

  searchPaciente(nombre: string): Observable<PacientesResponse> {
    return this._http.get<PacientesResponse>(
      `${this._baseUrl}/Paciente/search/${nombre}`
    );
  }

  postCrearPaciente(
    paciente: CrearActualizarPaciente
  ): Observable<PacienteResponse> {
    return this._http.post<PacienteResponse>(
      `${this._baseUrl}/Paciente`,
      paciente
    );
  }
  putActualizarPaciente(
    idPaciente: string,
    paciente: CrearActualizarPaciente
  ): Observable<PacienteResponse> {
    return this._http.put<PacienteResponse>(
      `${this._baseUrl}/Paciente/${idPaciente}`,
      paciente
    );
  }

  deletePaciente(idPaciente: string): Observable<PacienteResponse> {
    return this._http.delete<PacienteResponse>(
      `${this._baseUrl}/Paciente/${idPaciente}`
    );
  }
}
