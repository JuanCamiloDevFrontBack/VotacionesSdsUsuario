import { Component, EventEmitter, Output } from '@angular/core';
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
}
