import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { MessageService } from 'primeng/api';
import { VotingStateService } from '../../../core/voting-state.service';

@Component({
  selector: 'app-inicio-votacion',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectModule],
  templateUrl: './inicio-votacion.component.html',
  styleUrls: ['./inicio-votacion.component.scss'],
})
export class InicioVotacionComponent implements OnInit {
  private messageService = inject(MessageService);
  private readonly votingStateService = inject(VotingStateService);

  isVotingActive = this.votingStateService.isVotingActive;
  selectedCandidate: string | null = null;
  filterText = '';
  candidatesOptions: object[] = [];

  candidates = [
    {
      id: 1,
      name: 'P. Juan Perez',
      role: 'Párroco',
      avatar: 'https://i.pravatar.cc/88?img=32',
      selected: false,
    },
    {
      id: 2,
      name: 'P. Luis Gómez',
      role: 'Administrador',
      avatar: 'https://i.pravatar.cc/88?img=12',
      selected: false,
    },
    {
      id: 3,
      name: 'P. Carlos Torres',
      role: 'Capellán',
      avatar: 'https://i.pravatar.cc/88?img=24',
      selected: false,
    },
    {
      id: 4,
      name: 'P. Andrés Ruiz',
      role: 'Vicario',
      avatar: 'https://i.pravatar.cc/88?img=16',
      selected: false,
    },
    {
      id: 5,
      name: 'P. Felipe Suárez',
      role: 'Director',
      avatar: 'https://i.pravatar.cc/88?img=18',
      selected: false,
    },
    {
      id: 6,
      name: 'P. Javier Medina',
      role: 'Sacerdote',
      avatar: 'https://i.pravatar.cc/88?img=8',
      selected: false,
    },
  ];

  constructor() {}

  ngOnInit() {
    // Initialization logic if needed
    // build unique city options from candidates
    const unique = Array.from(new Set(this.candidates.map((c) => c.name)));
    this.candidatesOptions = unique.map((c) => ({ label: c, value: c }));
  }

  selectCandidate(candidateId: number) {
    this.candidates.forEach((candidate) => {
      candidate.selected = candidate.id === candidateId;
    });
    const selected = this.candidates.find((c) => c.id === candidateId);
    if (selected) {
      this.messageService.add({
        severity: 'info',
        summary: 'Candidato seleccionado',
        detail: `Has seleccionado a ${selected.name} y el voto es secreto.`,
        life: 3000,
      });
    }
  }

  onCandidatesChange(value: any) {
    this.filterText = value ? String(value) : '';
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

  get filteredCandidates() {
    const q = (this.filterText || '').toLowerCase().trim();
    if (!q) return this.candidates;
    return this.candidates.filter((c) => {
      return c.name.toLowerCase().includes(q) || c.name.toLowerCase().includes(q);
    });
  }
}
