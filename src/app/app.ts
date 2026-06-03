import { Component, computed, OnInit, inject, signal } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { AuthService } from './core/auth/auth.service';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SidebarComponent, ToastModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private router = inject(Router);
  private auth = inject(AuthService);

  isScreenVoting = signal(false);
  currentUrl = signal(this.router.url);

  showSidebar = computed(
    () => !this.currentUrl().startsWith('/auth') && this.auth.isAuthenticated(),
  );

  constructor() {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentUrl.set(event.urlAfterRedirects);
        this.isScreenVoting.set(this.currentUrl() !== '/votacion-inicial');
      });
  }

  onNavigate(route: string) {
    this.router.navigate([route]);
  }

  onLogout() {
    this.auth.clear();
    this.router.navigate(['/auth']);
  }
}
