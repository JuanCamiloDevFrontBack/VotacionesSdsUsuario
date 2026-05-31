import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-inicio-votacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio-votacion.component.html',
  styleUrls: ['./inicio-votacion.component.scss'],
})
export class InicioVotacionComponent {
  private messageService = inject(MessageService);

  candidates = [
    {
      id: 1,
      name: 'P. Juan Perez',
      role: 'Párroco',
      location: 'Quito',
      avatar: 'https://i.pravatar.cc/88?img=32',
    },
    {
      id: 2,
      name: 'P. Luis Gómez',
      role: 'Administrador',
      location: 'Cuenca',
      avatar: 'https://i.pravatar.cc/88?img=12',
    },
    {
      id: 3,
      name: 'P. Carlos Torres',
      role: 'Capellán',
      location: 'Guayaquil',
      avatar: 'https://i.pravatar.cc/88?img=24',
    },
    {
      id: 4,
      name: 'P. Andrés Ruiz',
      role: 'Vicario',
      location: 'Quito',
      avatar: 'https://i.pravatar.cc/88?img=16',
      selected: true,
    },
    {
      id: 5,
      name: 'P. Felipe Suárez',
      role: 'Director',
      location: 'Ambato',
      avatar: 'https://i.pravatar.cc/88?img=18',
    },
    {
      id: 6,
      name: 'P. Javier Medina',
      role: 'Sacerdote',
      location: 'Quito',
      avatar: 'https://i.pravatar.cc/88?img=8',
    },
  ];

  selectCandidate(candidateId: number) {
    this.candidates.forEach((candidate) => {
      candidate.selected = candidate.id === candidateId;
    });
    const selected = this.candidates.find((c) => c.id === candidateId);
    if (selected) {
      this.messageService.add({
        severity: 'info',
        summary: 'Candidato seleccionado',
        detail: `Has seleccionado a ${selected.name}`,
        life: 2000,
      });
    }
  }

  confirmVote() {
    const selected = this.candidates.find((c) => c.selected);
    if (!selected) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Por favor, selecciona un candidato antes de confirmar.',
        life: 3000,
      });
      return;
    }
    this.messageService.add({
      severity: 'success',
      summary: 'Voto confirmado',
      detail: `Tu voto por ${selected.name} ha sido registrado exitosamente.`,
      life: 3000,
    });
  }
}
