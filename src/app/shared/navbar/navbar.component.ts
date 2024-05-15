import { Component } from '@angular/core';

interface MenuItems {
  path: string;
  name: string;
  icon?: string;
}

@Component({
  selector: 'app-shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  menuItems: MenuItems[] = [
    { path: '/', name: 'Home', icon: 'home' },
    { path: '/citasMedicas', name: 'Citas Medicas', icon: 'health_and_safety' },
    { path: '/pacientes', name: 'Pacientes', icon: 'groups' },
    { path: '/medicos', name: 'Medicos', icon: 'person' },
    {
      path: '/historialMedico',
      name: 'Historial Medico',
      icon: 'history',
    },
  ];
}