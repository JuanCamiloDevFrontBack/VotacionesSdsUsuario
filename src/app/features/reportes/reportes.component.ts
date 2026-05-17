import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reportes-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss'],
})
export class ReportesPageComponent {
  voters = [
    { id: 1, name: 'P. Juan Perez', photo: 'https://i.pravatar.cc/40?img=32', status: 'Votó' },
    { id: 2, name: 'P. Luis Gómez', photo: 'https://i.pravatar.cc/40?img=24', status: 'Pendiente' },
    {
      id: 3,
      name: 'P. Carlos Torres',
      photo: 'https://i.pravatar.cc/40?img=12',
      status: 'Pendiente',
    },
    { id: 4, name: 'P. Andrés Ruiz', photo: 'https://i.pravatar.cc/40?img=8', status: 'Votó' },
    { id: 5, name: 'P. Felipe Suárez', photo: 'https://i.pravatar.cc/40?img=16', status: 'Votó' },
    {
      id: 6,
      name: 'P. Javier Medina',
      photo: 'https://i.pravatar.cc/40?img=18',
      status: 'Pendiente',
    },
    { id: 7, name: 'P. Álvaro Pinto', photo: 'https://i.pravatar.cc/40?img=19', status: 'Votó' },
    {
      id: 8,
      name: 'P. Roberto Salas',
      photo: 'https://i.pravatar.cc/40?img=20',
      status: 'Pendiente',
    },
  ];

  page = 1;
  pageSize = 5;
  pageSizes = [5, 10, 20];

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.voters.length / this.pageSize));
  }

  get pagedVoters() {
    const start = (this.page - 1) * this.pageSize;
    return this.voters.slice(start, start + this.pageSize);
  }

  setPage(p: number) {
    if (p < 1) p = 1;
    if (p > this.totalPages) p = this.totalPages;
    this.page = p;
  }

  prev() {
    this.setPage(this.page - 1);
  }

  next() {
    this.setPage(this.page + 1);
  }

  changePageSize(size: number) {
    this.pageSize = size;
    this.setPage(1);
  }

  pagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
