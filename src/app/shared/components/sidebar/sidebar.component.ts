import { Component, EventEmitter, HostListener, Output, signal } from '@angular/core';
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

  isCollapsed = signal(false);
  isMobile = signal(false);
  isDrawerOpen = signal(false);
  isActiveRoute = signal('');

  menuItems: MenuItem[] = [
    {
      label: 'Votación Actual',
      icon: 'pi pi-box',
      route: 'votacion',
    },
    {
      label: 'Gestión de Salvatorianos',
      icon: 'pi pi-users',
      route: 'salvatorianos',
    },
    {
      label: 'Reportes',
      icon: 'pi pi-chart-bar',
      route: 'reportes',
    },
    /*{
      label: 'Nombramientos y Traslados',
      icon: 'pi pi-calendar',
      route: 'nombramientos',
    },*/
  ];

  constructor() {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    const width = window.innerWidth;
    const wasMobile = this.isMobile();
    this.isMobile.set(width < 480);

    if (this.isMobile() && !wasMobile) {
      this.isDrawerOpen.set(false);
    }

    if (width >= 480 && width < 768) {
      this.isCollapsed.set(true);
    } else if (width >= 768) {
      this.isCollapsed.set(false);
    }
  }

  toggleCollapse() {
    if (this.isMobile()) {
      this.isDrawerOpen.update((val) => !val);
      this.isCollapsed.set(false);
    } else {
      this.isCollapsed.update((val) => !val);
    }
  }

  onNavigate(route: string) {
    if (this.isMobile()) {
      this.isDrawerOpen.set(false);
    }
    this.isActiveRoute.set(route);
    this.navigate.emit(route);
  }

  onLogout() {
    if (this.isMobile()) {
      this.isDrawerOpen.set(false);
    }
    this.logout.emit();
  }

  closeDrawer() {
    this.isDrawerOpen.set(false);
  }
}
