import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../core/auth/auth.service';
import { VotingStateService } from '../../core/voting-state.service';

@Component({
  selector: 'app-votacion-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './votacion.component.html',
  styleUrls: ['./votacion.component.scss'],
})
export class VotacionPageComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly messageService = inject(MessageService);
  private readonly votingStateService = inject(VotingStateService);

  isVotingActive = this.votingStateService.isVotingActive;
  totalSalvatorianos = 102;
  // salvatorianosVotados = 87;
  salvatorianosVotados = 0;
  percentageVoted = Math.round((this.salvatorianosVotados / this.totalSalvatorianos) * 100);

  initializeVoting() {
    this.votingStateService.setVotingActive(true);
    this.messageService.add({
      severity: 'info',
      summary: 'Votación iniciada',
      detail:
        'Se enviará un mensaje de whatsapp a los co-hermanos salvatorianos para participar en la votación.',
      life: 4000,
    });
    // ---------------------------
    const urlTree = this.router.createUrlTree(['/votacion-inicial']);

    // 2. Convierte el árbol a un string URL y ábrelo en una nueva pestaña
    const url = this.router.serializeUrl(urlTree);
    window.open(url, '_blank');

    /*const phoneNumber = '+573107043763';
    const message = encodeURIComponent('¡Hola! Te invito a participar en la votación. Haz clic aquí para votar: ' + url);
    this.authService.sendMessageWhatsappUrl(phoneNumber, message);*/
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
    this.votingStateService.setVotingActive(false);
  }
}
