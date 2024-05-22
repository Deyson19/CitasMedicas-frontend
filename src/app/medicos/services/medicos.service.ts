import { Injectable, inject } from '@angular/core';
import { CrearMedico } from '../models/crearmedico';
import { Observable } from 'rxjs';
import {
  CrearMedicoResponse,
  DeleteMedicoRespone,
  MedicoResponse,
  MedicosResponse,
} from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class MedicosService {
  private _http = inject(HttpClient);
  private _baseUrl = environment.apiUrl;

  obtenerTodos(): Observable<MedicosResponse> {
    return this._http.get<MedicosResponse>(`${this._baseUrl}/Medico`);
  }
  obtener(id: string): Observable<MedicoResponse> {
    return this._http.get<MedicoResponse>(`${this._baseUrl}/Medico/${id}`);
  }
  buscarMedico(nombre: string): Observable<MedicosResponse> {
    return this._http.get<MedicosResponse>(
      `${this._baseUrl}/Medico/BuscarNombre/${nombre}`
    );
  }
  buscarEspecialidad(especialidad: string): Observable<MedicosResponse> {
    return this._http.get<MedicosResponse>(
      `${this._baseUrl}/Medico/BuscarEspecialidad/${especialidad}`
    );
  }
  crear(nuevo: CrearMedico): Observable<CrearMedicoResponse> {
    return this._http.post<CrearMedicoResponse>(
      `${this._baseUrl}/Medico`,
      nuevo
    );
  }
  editar(id: string, actualizar: CrearMedico): Observable<CrearMedicoResponse> {
    return this._http.put<CrearMedicoResponse>(
      `${this._baseUrl}/Medico/${id}`,
      actualizar
    );
  }
  eliminar(id: string): Observable<DeleteMedicoRespone> {
    return this._http.delete<DeleteMedicoRespone>(
      `${this._baseUrl}/Medico/${id}`
    );
  }
}
