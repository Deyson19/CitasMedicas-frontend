import { HistorialMedico } from 'src/app/models';

export interface HistorialesDelPacienteResponse {
  isSuccess: boolean;
  message: string;
  result: HistorialMedico[];
}
