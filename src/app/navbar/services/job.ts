import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  readonly currentUser = signal<string | null>(null);

  setCurrentUser(name: string): void {
    this.currentUser.set(name);
  }

  clearCurrentUser(): void {
    this.currentUser.set(null);
  }
}
