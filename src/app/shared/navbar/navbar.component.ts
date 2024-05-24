import { Component } from '@angular/core';
import { MenuItems } from 'src/app/models';

@Component({
  selector: 'app-shared-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  menuItems: MenuItems[] = [
    { path: '/', name: 'Home', icon: 'home' },
    {
      path: '/citas-medicas',
      name: 'Citas Medicas',
      icon: 'health_and_safety',
    },
    { path: '/pacientes', name: 'Pacientes', icon: 'groups' },
    { path: '/medicos', name: 'Medicos', icon: 'person' },
    {
      path: '/historial-medico',
      name: 'Historial Medico',
      icon: 'history',
    },
  ];
}
