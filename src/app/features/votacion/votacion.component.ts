import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

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

  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  initializeVoting() {
    this.isVotingActive.set(true);
    // ---------------------------
    const urlTree = this.router.createUrlTree(['/votacion-inicial']);
    
    // 2. Convierte el árbol a un string URL y ábrelo en una nueva pestaña
    const url = this.router.serializeUrl(urlTree);
    window.open(url, '_blank');

    const phoneNumber = '+573107043763';
    const message = encodeURIComponent('¡Hola! Te invito a participar en la votación. Haz clic aquí para votar: ' + url);
    this.authService.sendMessageWhatsappUrl(phoneNumber, message);
  }

  sendVotingPhase() {
    alert('Fase de votación cerrada');
  }

  returnVotingPhase() {
    alert('Fase de votación cerrada');
  }

  closeVotingPhase() {
    alert('Fase de votación cerrada');
    this.isVotingActive.set(false);
  }
}
