import { CitaMedica, Medico, Paciente } from '.';

export interface HistorialMedico {
  id: string;
  pacienteId: string;
  paciente: Paciente;
  medicoId: string;
  medico: Medico;
  citaMedicaId: string;
  citaMedica: CitaMedica;
}
