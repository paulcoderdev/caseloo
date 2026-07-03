import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

interface SignupFormGroup {
  fullName: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class SignupPageComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly signupForm = new FormGroup<SignupFormGroup>({
    fullName: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(2)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(8), passwordStrengthValidator] })
  });

  submitted = false;
  feedbackMessage = '';
  showPassword = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.signupForm.invalid) {
      this.feedbackMessage = 'Please complete the form with a valid name, email and a strong password.';
      return;
    }

    const { fullName, email, password } = this.signupForm.getRawValue();
    this.authService.signUp({ fullName, email, password });
    this.feedbackMessage = 'Account created successfully. Welcome to Caselo.';
    this.router.navigate(['/']);
  }
}

function passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
  const value = (control.value ?? '') as string;
  const hasLetter = /[a-zA-Z]/.test(value);
  const hasCapitalLetter = /[A-Z]/.test(value);
  const hasNumber = /\d/.test(value);

  if (value.length >= 8 && hasLetter && hasCapitalLetter && hasNumber) {
    return null;
  }

  return { passwordStrength: true };
}
