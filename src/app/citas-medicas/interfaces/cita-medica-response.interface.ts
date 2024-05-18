import { CitaMedica } from 'src/app/models';

export interface CitaMedicaResponse {
  isSuccess: boolean;
  message: string;
  result: CitaMedica;
}
