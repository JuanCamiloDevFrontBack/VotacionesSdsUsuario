import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { MessageService } from 'primeng/api';
import { VotingStateService } from '../../../infrastructure/voting-state.service';

@Component({
  selector: 'app-inicio-votacion',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectModule],
  templateUrl: './inicio-votacion.component.html',
  styleUrls: ['./inicio-votacion.component.scss'],
})
export class InicioVotacionComponent implements OnInit {
  private readonly messageService = inject(MessageService);
  private readonly votingStateService = inject(VotingStateService);

  isVotingActive = signal(false);
  selectedCandidate: string | null = null;
  filterText = '';
  candidatesOptions: object[] = [];
  pageSize = 6;
  currentPage = 1;

  candidates = [
    {
      id: 1,
      name: 'P. Juan Perez',
      role: 'Párroco',
      avatar: 'https://i.pravatar.cc/88?img=5',
      selected: false,
    },
    {
      id: 2,
      name: 'P. Luis Gómez',
      role: 'Administrador',
      avatar: 'https://i.pravatar.cc/88?img=52',
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
    {
      id: 7,
      name: 'P. Juan Perez',
      role: 'Párroco',
      avatar: 'https://i.pravatar.cc/88?img=32',
      selected: false,
    },
    {
      id: 8,
      name: 'P. Luis Gómez',
      role: 'Administrador',
      avatar: 'https://i.pravatar.cc/88?img=12',
      selected: false,
    },
    {
      id: 9,
      name: 'P. Carlos Torres',
      role: 'Capellán',
      avatar: 'https://i.pravatar.cc/88?img=24',
      selected: false,
    },
    {
      id: 10,
      name: 'P. Andrés Ruiz',
      role: 'Vicario',
      avatar: 'https://i.pravatar.cc/88?img=120',
      selected: false,
    },
    {
      id: 11,
      name: 'P. Felipe Suárez',
      role: 'Director',
      avatar: 'https://i.pravatar.cc/88?img=18',
      selected: false,
    },
    {
      id: 12,
      name: 'P. Javier Medina',
      role: 'Sacerdote',
      avatar: 'https://i.pravatar.cc/88?img=8',
      selected: false,
    },
    {
      id: 13,
      name: 'P. Juan Perez',
      role: 'Párroco',
      avatar: 'https://i.pravatar.cc/88?img=32',
      selected: false,
    },
    {
      id: 14,
      name: 'P. Luis Gómez',
      role: 'Administrador',
      avatar: 'https://i.pravatar.cc/88?img=12',
      selected: false,
    },
    {
      id: 15,
      name: 'P. Carlosssssssss',
      role: 'Capellán',
      avatar: 'https://i.pravatar.cc/88?img=24',
      selected: false,
    },
    {
      id: 16,
      name: 'P. Andrés Ruiz',
      role: 'Vicario',
      avatar: 'https://i.pravatar.cc/88?img=16',
      selected: false,
    },
    {
      id: 17,
      name: 'P. Felipe Suárez',
      role: 'Director',
      avatar: 'https://i.pravatar.cc/88?img=18',
      selected: false,
    },
    {
      id: 18,
      name: 'P. Javier Medina',
      role: 'Sacerdote',
      avatar: 'https://i.pravatar.cc/88?img=8',
      selected: false,
    },
  ];

  constructor() {}

  ngOnInit() {
    this.loadVotingState();
    const unique = Array.from(new Set(this.candidates.map((c) => c.name)));
    this.candidatesOptions = unique.map((c) => ({ label: c, value: c }));
  }

  loadVotingState() {
    this.votingStateService.getVotingActive().subscribe({
      next: (activa: boolean) => {
        console.log('Estado de votación:', activa);
        this.isVotingActive.set(activa);
      },
      error: (err) => {
        console.error('Error al obtener estado de votación:', err);
        console.error('Status:', err.status);
        console.error('Mensaje:', err.message);
      },
    });
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
    this.currentPage = 1;
  }

  get filteredCandidates() {
    const q = (this.filterText || '').toLowerCase().trim();
    if (!q) return this.candidates;
    return this.candidates.filter((c) => {
      return c.name.toLowerCase().includes(q);
    });
  }

  get totalPages() {
    return Math.max(1, Math.ceil(this.filteredCandidates.length / this.pageSize));
  }

  get paginatedCandidates() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredCandidates.slice(start, start + this.pageSize);
  }

  get pageNumbers() {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  get startIndex() {
    if (this.filteredCandidates.length === 0) {
      return 0;
    }
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endIndex() {
    return Math.min(this.currentPage * this.pageSize, this.filteredCandidates.length);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
  }

  previousPage() {
    this.goToPage(this.currentPage - 1);
  }

  nextPage() {
    this.goToPage(this.currentPage + 1);
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
