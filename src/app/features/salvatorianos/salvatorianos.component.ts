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
export class SalvatorianosPageComponent {}
