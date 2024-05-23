import { CitaMedica, Medico, Paciente } from 'src/app/models';

export interface CrearHistorialResponse {
  Id: string;
  PacienteId: string;
  Paciente: Paciente;
  MedicoId: string;
  Medico: Medico;
  CitaMedicaId: string;
  CitaMedica: CitaMedica;
}
