import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PRIMENG_MODULES } from '../../shared/primeng-exports';
import { AuthService, LoginCredentials } from '../../core/auth/auth.service';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...PRIMENG_MODULES],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthPageComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  private messageService = inject(MessageService);

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  submit() {
    if (this.form.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Formulario inválido',
        detail: 'Por favor, completa todos los campos correctamente.',
        life: 3000,
      });
      return;
    }

    const credentials: LoginCredentials = this.form.value;

    this.auth.loginBackend(credentials).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Bienvenido',
          detail: 'Sesión iniciada exitosamente.',
          life: 2000,
        });
        this.router.navigate(['/votacion']);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error de autenticación',
          detail: 'Usuario o contraseña incorrectos, o el servidor no está disponible.',
          life: 4000,
        });
      },
    });
  }
}
