import { HistorialMedico } from 'src/app/models';

export interface HistorialesDelMedicoResponse {
  isSuccess: boolean;
  message: string;
  result: HistorialMedico[];
}
