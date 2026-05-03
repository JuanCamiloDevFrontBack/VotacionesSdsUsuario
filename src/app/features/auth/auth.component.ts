import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PRIMENG_MODULES } from '../../shared/primeng-exports';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...PRIMENG_MODULES],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthPageComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.auth.setToken('demo-token');
    this.router.navigate(['/dashboard']);
  }
}
