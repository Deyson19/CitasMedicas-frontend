import { CitaMedica } from 'src/app/models';

export interface CitasMedicasResponse {
  isSuccess: boolean;
  message: string;
  result: CitaMedica[];
}
