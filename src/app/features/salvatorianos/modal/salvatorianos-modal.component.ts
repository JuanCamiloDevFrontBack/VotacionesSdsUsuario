import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ChangeDetectorRef,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import {
  SalvatorianoRequest,
  SalvatorianoResponse,
} from '../../../core/interfaces/salvatoriano.models';

interface SalvatorianoForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
  missionCity: FormControl<string | null>;
  birthDate: FormControl<Date | null>;
  ordinationDate: FormControl<Date | null>;
  perpetualVowsDate: FormControl<Date | null>;
  eligibleForProvincial: FormControl<boolean>;
  enabledToVote: FormControl<boolean>;
}

@Component({
  selector: 'app-salvatorianos-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatePickerModule, InputTextModule],
  templateUrl: './salvatorianos-modal.component.html',
  styleUrls: ['./salvatorianos-modal.component.scss'],
})
export class SalvatorianosModalComponent implements OnInit, OnChanges {
  /** Si viene con valor, el modal edita ese registro; si es null, crea uno nuevo. */
  @Input() editing: SalvatorianoResponse | null = null;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<SalvatorianoRequest>();

  photoPreview: string | null = null;
  selectedPhoto: File | null = null;
  form!: FormGroup<SalvatorianoForm>;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly fb: FormBuilder,
  ) {}

  get isEditing(): boolean {
    return this.editing !== null;
  }

  ngOnInit(): void {
    this.initForm();
    this.syncFormFromEditing();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editing']) {
      this.syncFormFromEditing();
    }
  }

  private initForm(): void {
    this.form = this.fb.group<SalvatorianoForm>({
      firstName: this.fb.nonNullable.control('', [Validators.required, Validators.maxLength(100)]),
      lastName: this.fb.nonNullable.control('', [Validators.required, Validators.maxLength(100)]),
      email: this.fb.control<string | null>(null, [Validators.email]),
      phone: this.fb.control<string | null>(null),
      missionCity: this.fb.control<string | null>(null),
      birthDate: this.fb.control<Date | null>(null),
      ordinationDate: this.fb.control<Date | null>(null),
      perpetualVowsDate: this.fb.control<Date | null>(null),
      eligibleForProvincial: this.fb.nonNullable.control(false),
      enabledToVote: this.fb.nonNullable.control(true),
    });
  }

  private syncFormFromEditing(): void {
    if (!this.form) {
      return;
    }

    const value = this.editing
      ? {
          firstName: this.editing.firstName ?? '',
          lastName: this.editing.lastName ?? '',
          email: this.editing.email ?? null,
          phone: this.editing.phone ?? null,
          missionCity: this.editing.missionCity ?? null,
          birthDate: this.editing.birthDate ? new Date(this.editing.birthDate) : null,
          ordinationDate: this.editing.ordinationDate
            ? new Date(this.editing.ordinationDate)
            : null,
          perpetualVowsDate: this.editing.perpetualVowsDate
            ? new Date(this.editing.perpetualVowsDate)
            : null,
          eligibleForProvincial: this.editing.eligibleForProvincial ?? false,
          enabledToVote: this.editing.enabledToVote ?? true,
        }
      : {
          firstName: '',
          lastName: '',
          email: null,
          phone: null,
          missionCity: null,
          birthDate: null,
          ordinationDate: null,
          perpetualVowsDate: null,
          eligibleForProvincial: false,
          enabledToVote: true,
        };

    this.form.reset(value, { emitEvent: false });
    this.photoPreview = this.editing?.photoUrl ?? null;
    this.selectedPhoto = null;
  }

  onPhotoSelected(event: Event): void {
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
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    const formValue = this.form.getRawValue();

    const request: SalvatorianoRequest = {
      firstName: formValue.firstName.trim(),
      lastName: formValue.lastName.trim(),
      email: formValue.email?.trim() || null,
      phone: formValue.phone?.trim() || null,
      photoUrl: this.photoPreview,
      parishId: null, // TODO: selector de parroquia cuando exista el endpoint de catálogo
      cargoId: null, // TODO: selector de cargo cuando exista el endpoint de catálogo
      missionCity: formValue.missionCity?.trim() || null,
      birthDate: this.toIsoDate(formValue.birthDate),
      ordinationDate: this.toIsoDate(formValue.ordinationDate),
      perpetualVowsDate: this.toIsoDate(formValue.perpetualVowsDate),
      eligibleForProvincial: formValue.eligibleForProvincial,
      enabledToVote: formValue.enabledToVote,
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
