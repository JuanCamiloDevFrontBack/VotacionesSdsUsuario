import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Output() navigate = new EventEmitter<string>();
  @Output() logout = new EventEmitter<void>();

  menuItems: MenuItem[] = [
    {
      label: 'Votación Actual',
      icon: 'pi pi-box',
      route: 'votacion',
    },
    {
      label: 'Gestión de Sacerdotes',
      icon: 'pi pi-users',
      route: 'sacerdotes',
    },
    {
      label: 'Gestión de Administradores',
      icon: 'pi pi-cog',
      route: 'administradores',
    },
    {
      label: 'Reportes',
      icon: 'pi pi-chart-bar',
      route: 'reportes',
    },
    {
      label: 'Nombramientos y Traslados',
      icon: 'pi pi-calendar',
      route: 'nombramientos',
    },
  ];

  onNavigate(route: string) {
    this.navigate.emit(route);
  }

  onLogout() {
    this.logout.emit();
  }
}
