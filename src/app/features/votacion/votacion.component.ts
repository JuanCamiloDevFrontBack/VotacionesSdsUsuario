import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-votacion-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './votacion.component.html',
  styleUrls: ['./votacion.component.scss'],
})
export class VotacionPageComponent {
  isVotingActive = signal(false);
  totalSalvatorianos = 102;
  // salvatorianosVotados = 87;
  salvatorianosVotados = 0;
  percentageVoted = Math.round((this.salvatorianosVotados / this.totalSalvatorianos) * 100);

  initializeVoting() {
    this.isVotingActive.set(true);
  }

  closeVotingPhase() {
    alert('Fase de votación cerrada');
  }
}
