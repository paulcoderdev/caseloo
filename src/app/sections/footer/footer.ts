import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
  standalone: true
})
export class FooterComponent {
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  signOut(): void {
    this.authService.signOut();
    this.router.navigate(['/']);
  }
}
