import { Component, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-salvatorianos-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './salvatorianos-modal.component.html',
  styleUrls: ['./salvatorianos-modal.component.scss'],
})
export class SalvatorianosModalComponent {
  @Output() close = new EventEmitter<void>();

  photoPreview: string | null = null;
  selectedPhoto: File | null = null;
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
      // force change detection in case FileReader runs outside Angular zone
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  }
}
