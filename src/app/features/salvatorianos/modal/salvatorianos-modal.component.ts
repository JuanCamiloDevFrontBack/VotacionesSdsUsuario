import { Component, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-salvatorianos-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePickerModule, InputTextModule, InputNumberModule],
  templateUrl: './salvatorianos-modal.component.html',
  styleUrls: ['./salvatorianos-modal.component.scss'],
})
export class SalvatorianosModalComponent {
  @Output() close = new EventEmitter<void>();

  photoPreview: string | null = null;
  selectedPhoto: File | null = null;
  orderDate: Date | null = new Date(2010, 5, 12);
  perpetualVowsDate: Date | null = new Date(2018, 2, 24);
  // form models for inputs
  name: string = '';
  surname: string = '';
  age: number | null = null;
  email: string = '';
  phone: string = '';
  city: string = '';
  constructor(private cdr: ChangeDetectorRef) {}

  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }

    const file = input.files[0];
    this.selectedPhoto = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.photoPreview = typeof reader.result === 'string' ? reader.result : null;
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  }
}
