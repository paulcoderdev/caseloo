import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { JobService } from '../../services/job';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CardModule],
  template: `
    <section class="min-h-screen bg-slate-50 px-6 py-10">
      <div class="mx-auto max-w-5xl space-y-6">
        <p-card header="Welcome to your dashboard">
          <p class="text-slate-600">You have successfully signed in.</p>
          <p class="mt-2 text-lg font-semibold text-slate-900">Signed in as {{ userName }}</p>
        </p-card>
      </div>
    </section>
  `
})
export class DashboardPageComponent {
  constructor(private jobService: JobService) {}

  get userName(): string {
    return this.jobService.currentUser() ?? 'Guest';
  }
}
