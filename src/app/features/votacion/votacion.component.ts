import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { VotingStateService } from '../../infrastructure/voting-state.service';

@Component({
  selector: 'app-votacion-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './votacion.component.html',
  styleUrls: ['./votacion.component.scss'],
})
export class VotacionPageComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  private readonly votingStateService = inject(VotingStateService);

  isVotingActive = signal(false);
  totalSalvatorianos = 102;
  // salvatorianosVotados = 87;
  salvatorianosVotados = 0;
  percentageVoted = Math.round((this.salvatorianosVotados / this.totalSalvatorianos) * 100);

  ngOnInit() {
    this.loadVotingState();
  }

  loadVotingState() {
    this.votingStateService.updateVotingActive({ activa: false }).subscribe({
      next: (response: any) => {
        console.log('Voting active state response:', response);
      },
    });
    this.votingStateService.getVotingActive().subscribe({
      next: (response: any) => {
        console.log('Voting active state response:', response);
        this.isVotingActive.set(response.activa);
      },
      error: (err) => {
        console.error('Error al obtener estado de votación:', err);
      },
    });
  }

  initializeVoting() {
    const votingData = { activa: true };

    this.votingStateService.updateVotingActive(votingData).subscribe({
      next: (response: any) => {
        console.log('Votación iniciada:', response);
        this.isVotingActive.set(true);

        this.messageService.add({
          severity: 'info',
          summary: 'Votación iniciada',
          detail:
            'Se enviará un mensaje de whatsapp a los co-hermanos salvatorianos para participar en la votación.',
          life: 4000,
        });

        // Abrir nueva pestaña
        const urlTree = this.router.createUrlTree(['/votacion-inicial']);
        const url = this.router.serializeUrl(urlTree);
        window.open(url, '_blank');
      },
      error: (err) => {
        console.error('Error al iniciar votación:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al iniciar la votación.',
          life: 3000,
        });
      },
    });
  }

  sendVotingPhase() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Aviso',
      detail: 'Fase de votación cerrada.',
      life: 3000,
    });
  }

  returnVotingPhase() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Aviso',
      detail: 'Fase de votación cerrada.',
      life: 3000,
    });
  }

  closeVotingPhase() {
    this.messageService.add({
      severity: 'info',
      summary: 'Información',
      detail: 'Fase de votación cerrada.',
      life: 3000,
    });
    //this.votingStateService.setVotingActive(false);
  }
}
