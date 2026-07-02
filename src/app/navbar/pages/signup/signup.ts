import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { JobService } from '../../services/job';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [FormsModule, RouterLink, ButtonModule, CardModule, DividerModule, InputTextModule, MessageModule, PasswordModule],
  templateUrl: './signup.html'
})
export class SignupPageComponent {
  private readonly jobService = inject(JobService);
  private readonly router = inject(Router);

  name = '';
  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';
  showPassword = false;

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.name.trim() || !this.email.trim() || !this.password.trim()) {
      this.errorMessage = 'Name, email, and password are required.';
      return;
    }

    if (!this.isValidPassword(this.password)) {
      this.errorMessage = 'Password must include 4 letters, 4 numbers, and 2 symbols.';
      return;
    }

    const displayName = this.name.trim() || this.email.trim().split('@')[0] || 'Guest';
    this.jobService.setCurrentUser(displayName);
    this.successMessage = `Welcome aboard, ${displayName}!`;
    this.router.navigate(['/']);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  private isValidPassword(password: string): boolean {
    const letters = (password.match(/[A-Za-z]/g) || []).length;
    const numbers = (password.match(/[0-9]/g) || []).length;
    const symbols = (password.match(/[^A-Za-z0-9]/g) || []).length;

    return letters === 4 && numbers === 4 && symbols === 2;
  }
}
