import { Component, EventEmitter, Input, OnChanges, Output, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { SalvatorianoRequest, SalvatorianoResponse } from '../../../core/interfaces/salvatoriano.models';

@Component({
  selector: 'app-salvatorianos-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePickerModule, InputTextModule],
  templateUrl: './salvatorianos-modal.component.html',
  styleUrls: ['./salvatorianos-modal.component.scss'],
})
export class SalvatorianosModalComponent implements OnChanges {
  /** Si viene con valor, el modal edita ese registro; si es null, crea uno nuevo. */
  @Input() editing: SalvatorianoResponse | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<SalvatorianoRequest>();

  photoPreview: string | null = null;
  selectedPhoto: File | null = null;

  // Modelo del formulario — nombres alineados a SalvatorianoRequest.
  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  missionCity = '';
  birthDate: Date | null = null;
  ordinationDate: Date | null = null;
  perpetualVowsDate: Date | null = null;
  eligibleForProvincial = false;
  enabledToVote = true;

  constructor(private cdr: ChangeDetectorRef) {}

  get isEditing(): boolean {
    return this.editing !== null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editing']) {
      this.loadFromEditing();
    }
  }

  private loadFromEditing(): void {
    if (!this.editing) {
      this.resetForm();
      return;
    }
    const e = this.editing;
    this.firstName = e.firstName;
    this.lastName = e.lastName;
    this.email = e.email ?? '';
    this.phone = e.phone ?? '';
    this.missionCity = e.missionCity ?? '';
    this.birthDate = e.birthDate ? new Date(e.birthDate) : null;
    this.ordinationDate = e.ordinationDate ? new Date(e.ordinationDate) : null;
    this.perpetualVowsDate = e.perpetualVowsDate ? new Date(e.perpetualVowsDate) : null;
    this.eligibleForProvincial = e.eligibleForProvincial;
    this.enabledToVote = e.enabledToVote;
    this.photoPreview = e.photoUrl;
  }

  private resetForm(): void {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.phone = '';
    this.missionCity = '';
    this.birthDate = null;
    this.ordinationDate = null;
    this.perpetualVowsDate = null;
    this.eligibleForProvincial = false;
    this.enabledToVote = true;
    this.photoPreview = null;
    this.selectedPhoto = null;
  }

  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];
    this.selectedPhoto = file;

    const reader = new FileReader();
    reader.onload = () => {
      // TODO: cuando exista un endpoint de subida de archivos, acá se debería
      // subir el File y guardar la URL resultante, no el data-URL completo.
      this.photoPreview = typeof reader.result === 'string' ? reader.result : null;
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (!this.firstName.trim() || !this.lastName.trim()) {
      return;
    }

    const request: SalvatorianoRequest = {
      firstName: this.firstName.trim(),
      lastName: this.lastName.trim(),
      email: this.email.trim() || null,
      phone: this.phone.trim() || null,
      photoUrl: this.photoPreview,
      parishId: null, // TODO: selector de parroquia cuando exista el endpoint de catálogo
      cargoId: null, // TODO: selector de cargo cuando exista el endpoint de catálogo
      missionCity: this.missionCity.trim() || null,
      birthDate: this.toIsoDate(this.birthDate),
      ordinationDate: this.toIsoDate(this.ordinationDate),
      perpetualVowsDate: this.toIsoDate(this.perpetualVowsDate),
      eligibleForProvincial: this.eligibleForProvincial,
      enabledToVote: this.enabledToVote,
    };

    this.save.emit(request);
  }

  private toIsoDate(date: Date | null): string | null {
    if (!date) {
      return null;
    }
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
