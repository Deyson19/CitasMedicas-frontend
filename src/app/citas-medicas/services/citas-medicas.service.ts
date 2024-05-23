import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { CitaMedicaResponse, CitasMedicasResponse } from '../interfaces';
import { CrearCitaMedicaResponse } from '../interfaces/crear-cita-medica-response';
import { CrearCitaMedica } from '../models/crear-cita-medica';
import { MedicosService } from 'src/app/medicos/services/medicos.service';

@Injectable({
  providedIn: 'root',
})
export class CitasMedicasService {
  //TODO: Evaluar los casos de error en los components
  private _http = inject(HttpClient);
  private _baseUrl = environment.apiUrl;
  private _medicos = inject(MedicosService);
  constructor() {}

  getAll(): Observable<CitasMedicasResponse> {
    return this._http.get<CitasMedicasResponse>(`${this._baseUrl}/CitaMedica`);
  }
  getById(id: string): Observable<CitaMedicaResponse> {
    return this._http.get<CitaMedicaResponse>(
      `${this._baseUrl}/CitaMedica/${id}`
    );
  }
  post(citaMedica: CrearCitaMedica): Observable<CrearCitaMedicaResponse> {
    return this._http.post<CrearCitaMedicaResponse>(
      `${this._baseUrl}/CitaMedica`,
      citaMedica
    );
  }
  delete(id: string): Observable<string> {
    return this._http.delete<string>(`${this._baseUrl}/CitaMedica/${id}`);
  }

  listadoMedicos() {
    return this._medicos.obtenerTodos();
  }
}
