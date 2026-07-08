import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.html',
  styleUrls: ['./statistics.css'],
  standalone: true,
  imports: [CommonModule],
})
export class StatisticsComponent implements AfterViewInit {
  @ViewChildren('statValue')
  statValues!: QueryList<ElementRef<HTMLElement>>;

  values = [0, 0, 0, 0];
  private hasAnimated = false;
  private readonly durationMs = 1800;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    const section = this.statValues.first?.nativeElement.parentElement?.parentElement;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry?.isIntersecting && !this.hasAnimated) {
          this.hasAnimated = true;
          observer.disconnect();
          this.startCounters();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(section);
  }

  private startCounters(): void {
    this.animateCounter(20000, 0, false, true);
    this.animateCounter(5000, 1, false, true);
    this.animateCounter(99.99, 2, true);
    this.animateCounter(150, 3);
  }

  private animateCounter(
    target: number,
    index: number,
    decimal = false,
    currency = false
  ): void {
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = target * eased;

      if (decimal) {
        this.values[index] = Number(currentValue.toFixed(2));
      } else {
        this.values[index] = Math.floor(currentValue);
      }

      this.cdr.detectChanges();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.values[index] = currency ? target : target;
        this.cdr.detectChanges();
      }
    };

    requestAnimationFrame(animate);
  }
}
