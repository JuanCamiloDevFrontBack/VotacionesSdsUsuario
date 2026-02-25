import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private router = inject(Router);

  onNavigate(route: string) {
    this.router.navigate([route]);
  }

  onLogout() {
    // TODO: Implementar lógica de logout
    // Por ahora, redirigir a auth
    this.router.navigate(['/auth']);
  }
}
