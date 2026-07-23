import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalvatorianosModalComponent } from './modal/salvatorianos-modal.component';
import { SalvatorianoRequest, SalvatorianoResponse } from '../../core/interfaces/salvatoriano.models';
import { SalvatorianoService } from '../../infrastructure/salvatoriano.service';


@Component({
  selector: 'app-salvatorianos-page',
  standalone: true,
  imports: [CommonModule, SalvatorianosModalComponent],
  templateUrl: './salvatorianos.component.html',
  styleUrls: ['./salvatorianos.component.scss'],
})
export class SalvatorianosPageComponent implements OnInit {
  items: SalvatorianoResponse[] = [];

  // Paginación server-side: page es 0-based (mismo criterio que Spring Pageable).
  page = 0;
  pageSize = 5;
  pageSizes = [5, 10, 20];
  totalPages = 1;
  totalElements = 0;

  loading = false;
  errorMessage: string | null = null;

  showModal = false;
  editingItem: SalvatorianoResponse | null = null;

  constructor(private readonly salvatorianoService: SalvatorianoService) {}

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage(): void {
    this.loading = true;
    this.errorMessage = null;

    this.salvatorianoService.list(this.page, this.pageSize).subscribe({
      next: (response) => {
        this.items = response.content;
        this.totalPages = Math.max(1, response.totalPages);
        this.totalElements = response.totalElements;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudo cargar la lista de salvatorianos.';
        this.loading = false;
      },
    });
  }

  onExcelSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];
    console.log('Archivo Excel seleccionado:', file.name, 'Tamaño:', file.size);

    // TODO: Implementar lectura de Excel con librería como xlsx o alasql
    // y llamar a un futuro endpoint de carga masiva del backend.
  }

  openCreateModal(): void {
    this.editingItem = null;
    this.showModal = true;
  }

  openEditModal(item: SalvatorianoResponse): void {
    this.editingItem = item;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.editingItem = null;
  }

  onSave(request: SalvatorianoRequest): void {
    const isEditing = !!this.editingItem;
    const operation = isEditing
      ? this.salvatorianoService.update(this.editingItem!.id, request)
      : this.salvatorianoService.create(request);

    operation.subscribe({
      next: () => {
        this.closeModal();
        if (!isEditing) {
          this.page = 0;
        }
        this.loadPage();
      },
      error: (err) => {
        this.errorMessage = err?.error?.message ?? 'No se pudo guardar el registro.';
      },
    });
  }

  onDelete(item: SalvatorianoResponse): void {
    if (!confirm(`¿Eliminar a ${item.fullName}? Esta acción no se puede deshacer.`)) {
      return;
    }

    this.salvatorianoService.delete(item.id).subscribe({
      next: () => this.loadPage(),
      error: () => {
        this.errorMessage = 'No se pudo eliminar el registro.';
      },
    });
  }

  setPage(p: number) {
    const zeroBased = p - 1;
    if (zeroBased < 0 || zeroBased > this.totalPages - 1) {
      return;
    }
    this.page = zeroBased;
    this.loadPage();
  }

  prev() {
    this.setPage(this.page);
  }

  next() {
    this.setPage(this.page + 2);
  }

  changePageSize(size: number) {
    this.pageSize = size;
    this.page = 0;
    this.loadPage();
  }

  pagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get currentPageDisplay(): number {
    return this.page + 1;
  }
}
