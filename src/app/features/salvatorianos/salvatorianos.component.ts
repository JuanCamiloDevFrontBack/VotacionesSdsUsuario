import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalvatorianosModalComponent } from './modal/salvatorianos-modal.component';

@Component({
  selector: 'app-salvatorianos-page',
  standalone: true,
  imports: [CommonModule, SalvatorianosModalComponent],
  templateUrl: './salvatorianos.component.html',
  styleUrls: ['./salvatorianos.component.scss'],
})
export class SalvatorianosPageComponent {
  items = [
    {
      id: 1,
      name: 'P. Juan Perez',
      parish: 'Parroquia San Miguel',
      role: 'Párroco',
      city: 'Quito',
      photo: 'https://i.pravatar.cc/48?img=32',
      eligible: true,
    },
    {
      id: 2,
      name: 'P. Luis Gómez',
      parish: 'Capellán San José',
      role: 'Administrador',
      city: 'Cuenca',
      photo: 'https://i.pravatar.cc/48?img=12',
      eligible: true,
    },
    {
      id: 3,
      name: 'P. Carlos Ruiz',
      parish: 'San Pedro',
      role: 'Vicario',
      city: 'San Salvador',
      photo: 'https://i.pravatar.cc/48?img=3',
      eligible: false,
    },
    {
      id: 4,
      name: 'P. Miguel Santos',
      parish: 'Nuestra Señora',
      role: 'Párroco',
      city: 'Santa Ana',
      photo: 'https://i.pravatar.cc/48?img=4',
      eligible: true,
    },
    {
      id: 5,
      name: 'P. Andrés López',
      parish: 'San Juan',
      role: 'Capellán',
      city: 'La Libertad',
      photo: 'https://i.pravatar.cc/48?img=5',
      eligible: false,
    },
    {
      id: 6,
      name: 'P. Jorge Herrera',
      parish: 'San José',
      role: 'Administrador',
      city: 'Santa Tecla',
      photo: 'https://i.pravatar.cc/48?img=6',
      eligible: true,
    },
    {
      id: 7,
      name: 'P. Rafael Cruz',
      parish: 'El Buen Pastor',
      role: 'Párroco',
      city: 'Sonsonate',
      photo: 'https://i.pravatar.cc/48?img=7',
      eligible: true,
    },
    {
      id: 8,
      name: 'P. Alberto Díaz',
      parish: 'San Mateo',
      role: 'Vicario',
      city: 'Ahuachapán',
      photo: 'https://i.pravatar.cc/48?img=8',
      eligible: false,
    },
    {
      id: 9,
      name: 'P. Roberto Peña',
      parish: 'Santa María',
      role: 'Capellán',
      city: 'Chalatenango',
      photo: 'https://i.pravatar.cc/48?img=9',
      eligible: true,
    },
    {
      id: 10,
      name: 'P. Fernando Castillo',
      parish: 'San Pablo',
      role: 'Párroco',
      city: 'La Unión',
      photo: 'https://i.pravatar.cc/48?img=10',
      eligible: true,
    },
    {
      id: 11,
      name: 'P. Enrique Morales',
      parish: 'San Francisco',
      role: 'Vicario',
      city: 'Morazán',
      photo: 'https://i.pravatar.cc/48?img=11',
      eligible: false,
    },
    {
      id: 12,
      name: 'P. Esteban Ramos',
      parish: 'Santa Ana',
      role: 'Administrador',
      city: 'Sonsonate',
      photo: 'https://i.pravatar.cc/48?img=13',
      eligible: true,
    },
  ];

  page = 1;
  pageSize = 5;
  pageSizes = [5, 10, 20];
  showModal = false;

  onExcelSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];
    console.log('Archivo Excel seleccionado:', file.name, 'Tamaño:', file.size);

    // Aquí iría la lógica de procesamiento del Excel
    // Por ahora solo mostrar en consola que fue seleccionado
    // TODO: Implementar lectura de Excel con librería como xlsx o alasql
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.items.length / this.pageSize));
  }

  get pagedItems() {
    const start = (this.page - 1) * this.pageSize;
    return this.items.slice(start, start + this.pageSize);
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
