import { Component, OnInit, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MedicosService } from '../../services/medicos.service';
import { Medico } from 'src/app/models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-medicos-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
})
export class ListadoComponent implements OnInit {
  private _toast = inject(ToastrService);
  private _medicos = inject(MedicosService);
  public medicosList: Medico[] = [];
  isLoading = true;
  mensaje = 'Listando los Médicos';

  ngOnInit() {
    this.listado();
  }
  private listado() {
    this._medicos.obtenerTodos().subscribe(
      (resp) => {
        if (resp.isSuccess) {
          setTimeout(() => {
            this.isLoading = false;
            this.medicosList = resp.result;
            this._toast.success(resp.message, 'Resultados', {
              timeOut: 3000,
            });
          }, 1500);
        }
      },
      (isError: HttpErrorResponse) => {
        this.mensaje = 'No hay elementos para mostrar';
        this._toast.error(isError.message, 'Error');
      }
    );
  }
}
