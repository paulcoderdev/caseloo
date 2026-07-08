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
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-section.html',
  styleUrls: ['./hero-section.css'],
})
export class HeroSectionComponent implements AfterViewInit {
  @ViewChildren('statValue')
  statValues!: QueryList<ElementRef<HTMLElement>>;

  businessCount = 0;
  transactionCount = 0;
  uptimeCount = 0;

  private hasAnimated = false;
  private readonly durationMs = 1800;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    const statElements = this.statValues?.toArray() ?? [];

    if (!statElements.length) {
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

    statElements.forEach((stat) => observer.observe(stat.nativeElement));
  }

  private startCounters(): void {
    this.animateCounter(15000, (value) => {
      this.businessCount = value;
      this.cdr.detectChanges();
    });

    this.animateCounter(200, (value) => {
      this.transactionCount = value;
      this.cdr.detectChanges();
    });

    this.animateCounter(99.9, (value) => {
      this.uptimeCount = value;
      this.cdr.detectChanges();
    }, true);
  }

  private animateCounter(
    target: number,
    setter: (value: number) => void,
    decimal = false
  ): void {
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = target * eased;

      setter(decimal ? Number(currentValue.toFixed(1)) : Math.floor(currentValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setter(decimal ? Number(target.toFixed(1)) : Math.floor(target));
        this.cdr.detectChanges();
      }
    };

    requestAnimationFrame(animate);
  }
}