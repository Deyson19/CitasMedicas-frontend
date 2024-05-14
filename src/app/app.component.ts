import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private _toastr = inject(ToastrService);
  title = 'appCitasMedicas';

  constructor() {
    this._toastr.success(
      'Bienvenido a la aplicación de Citas Médicas',
      'Bienvenido'
    );
  }
}
