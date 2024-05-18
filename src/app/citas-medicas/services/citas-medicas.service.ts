import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { CitaMedicaResponse, CitasMedicasResponse } from '../interfaces';
import { CrearCitaMedicaResponse } from '../interfaces/crear-cita-medica-response';
import { CrearCitaMedica } from '../models/crear-cita-medica';

@Injectable({
  providedIn: 'root',
})
export class CitasMedicasService {
  private _http = inject(HttpClient);
  private _baseUrl = environment.apiUrl + '/CitaMedica';
  constructor() {}

  getAll(): Observable<CitasMedicasResponse> {
    return this._http.get<CitasMedicasResponse>(`${this._baseUrl}`);
  }
  getById(id: string): Observable<CitaMedicaResponse> {
    return this._http.get<CitaMedicaResponse>(`${this._baseUrl}/${id}`);
  }
  post(citaMedica: CrearCitaMedica): Observable<CrearCitaMedicaResponse> {
    return this._http.post<CrearCitaMedicaResponse>(
      `${this._baseUrl}`,
      citaMedica
    );
  }
  delete(id: string): Observable<string> {
    return this._http.delete<string>(`${this._baseUrl}/${id}`);
  }
}
