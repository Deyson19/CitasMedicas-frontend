import { Medico } from 'src/app/models';

export interface ActualizarMedicoResponse {
  isSuccess: boolean;
  message: string;
  result: Medico;
}
