import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import {
  CrearHistorial,
  CrearHistorialResponse,
  HistorialMedicoResponse,
  HistorialesDelMedicoResponse,
  HistorialesDelPacienteResponse,
  HistorialesMedicosResponse,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class HistorialMedicoService {
  private _http = inject(HttpClient);
  private _baseUrl = environment.apiUrl;

  obtenerTodos(): Observable<HistorialesMedicosResponse> {
    return this._http.get<HistorialesMedicosResponse>(
      `${this._baseUrl}/HistorialMedico`
    );
  }
  obtener(idHistorial: string): Observable<HistorialMedicoResponse> {
    return this._http.get<HistorialMedicoResponse>(
      `${this._baseUrl}/HistorialMedico/${idHistorial}`
    );
  }
  crear(historial: CrearHistorial): Observable<CrearHistorialResponse> {
    return this._http.post<CrearHistorialResponse>(
      `${this._baseUrl}/HistorialMedico`,
      historial
    );
  }
  eliminar(historialId: string): Observable<string> {
    return this._http.delete<string>(
      `${this._baseUrl}/HistorialMedico/${historialId}`
    );
  }
  historialPorMedico(
    medicoId: string
  ): Observable<HistorialesDelMedicoResponse> {
    return this._http.get<HistorialesDelMedicoResponse>(
      `${this._baseUrl}/HistorialMedico/MedicoId/${medicoId}`
    );
  }
  historialPorPaciente(
    pacienteId: string
  ): Observable<HistorialesDelPacienteResponse> {
    return this._http.get<HistorialesDelPacienteResponse>(
      `${this._baseUrl}/HistorialMedico/PacienteId/${pacienteId}`
    );
  }
}
