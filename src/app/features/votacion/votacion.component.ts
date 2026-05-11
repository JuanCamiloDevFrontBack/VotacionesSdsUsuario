import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { SidebarComponent } from '../../shared/components';

@Component({
  selector: 'app-votacion-page',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  templateUrl: './votacion.component.html',
  styleUrls: ['./votacion.component.scss'],
})
export class VotacionPageComponent {
  isVotingActive = signal(false);
  totalSalvatorianos = 102;
  salvatorianosVotados = 87;
  percentageVoted = Math.round((87 / 102) * 100);

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

  initializeVoting() {
    this.isVotingActive.set(true);
  }

  closeVotingPhase() {
    alert('Fase de votación cerrada');
  }
}
