import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-votacion-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './+page.component.html',
  styleUrl: './+page.component.scss',
})
export class VotacionPageComponent {
  totalSacerdotes = 102;
  sacerdotesVotados = 87;
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

  closeVotingPhase() {
    alert('Fase de votación cerrada');
  }
}
