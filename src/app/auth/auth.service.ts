import { Injectable, computed, signal } from '@angular/core';

export interface AuthUser {
  fullName: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly storageKey = 'caselo-auth-user';

  readonly user = signal<AuthUser | null>(this.readUserFromStorage());
  readonly initials = computed(() => {
    const name = this.user()?.fullName?.trim() ?? '';
    const parts = name.split(/\s+/).filter(Boolean).slice(0, 2);

    return parts.length > 0
      ? parts.map((part) => part[0]?.toUpperCase() ?? '').join('')
      : 'U';
  });

  signUp(user: AuthUser): void {
    const normalizedUser: AuthUser = {
      fullName: user.fullName.trim(),
      email: user.email.trim().toLowerCase(),
      password: user.password
    };

    this.persistUser(normalizedUser);
    this.user.set(normalizedUser);
  }

  signIn(email: string, password: string): boolean {
    const storedUser = this.readUserFromStorage();

    if (!storedUser) {
      return false;
    }

    const matches = storedUser.email === email.trim().toLowerCase() && storedUser.password === password;

    if (!matches) {
      return false;
    }

    this.user.set(storedUser);
    return true;
  }

  signOut(): void {
    this.user.set(null);
    localStorage.removeItem(this.storageKey);
  }

  private persistUser(user: AuthUser): void {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  private readUserFromStorage(): AuthUser | null {
    const rawValue = localStorage.getItem(this.storageKey);

    if (!rawValue) {
      return null;
    }

    try {
      const parsedValue = JSON.parse(rawValue) as Partial<AuthUser>;
      if (!parsedValue.fullName || !parsedValue.email || !parsedValue.password) {
        return null;
      }

      return {
        fullName: parsedValue.fullName,
        email: parsedValue.email,
        password: parsedValue.password
      };
    } catch {
      return null;
    }
  }
}
