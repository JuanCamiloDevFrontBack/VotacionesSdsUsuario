import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-reportes-page',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss'],
})
export class ReportesPageComponent {
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
