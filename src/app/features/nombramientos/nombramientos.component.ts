import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-nombramientos-page',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './nombramientos.component.html',
  styleUrls: ['./nombramientos.component.scss'],
})
export class NombramientosPageComponent {
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
