import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { SalvatorianosModalComponent } from './modal/salvatorianos-modal.component';

@Component({
  selector: 'app-salvatorianos-page',
  standalone: true,
  imports: [CommonModule, SidebarComponent, SalvatorianosModalComponent],
  templateUrl: './salvatorianos.component.html',
  styleUrls: ['./salvatorianos.component.scss'],
})
export class SalvatorianosPageComponent {
  constructor(
    private router: Router,
    private auth: AuthService,
  ) {}

  onNavigate(route: string) {
    this.router.navigate([route]);
  }

  onLogout() {
    this.auth.clear();
    this.router.navigate(['/auth']);
  }
}
