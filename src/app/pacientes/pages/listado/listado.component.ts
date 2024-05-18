import { Component, OnInit, inject, signal } from '@angular/core';
import { PacientesService } from '../../services/pacientes.service';
import { Paciente } from 'src/app/models';
@Component({
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})
export class ListadoComponent implements OnInit {
  private _pacientesService = inject(PacientesService);
  pacientes: Paciente[] = [];
  private listadoPacientes = signal<Paciente[]>([]);

  ngOnInit(): void {
    this._pacientesService.getPacientes().subscribe((x) => {
      if (x.isSuccess) {
        this.listadoPacientes.set(x.result);
        this.pacientes = this.listadoPacientes();
      }
    });
  }
}
