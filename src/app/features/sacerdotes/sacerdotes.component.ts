import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-sacerdotes-page',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  template: `
    <div class="page-layout">
      <app-sidebar
        (navigate)="onNavigate($event)"
        (logout)="onLogout()"
      ></app-sidebar>
      <div class="page-content">
        <h1>Gestión de Sacerdotes</h1>
        <p>Sacerdotes works</p>
      </div>
    </div>
  `,
  styles: [`
    .page-layout {
      display: flex;
      min-height: 100vh;
    }
    .page-content {
      flex: 1;
      padding: 2rem;
    }
  `],
})
export class SacerdotesPageComponent {
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
