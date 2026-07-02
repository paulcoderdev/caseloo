import { Component } from '@angular/core';
import { HeroSectionComponent } from '../sections/hero-section/hero-section';
import { TrustedCompaniesComponent } from '../sections/trusted-companies/trusted-companies';
import { AboutUsComponent } from '../sections/about-us/about-us';
import { FeaturesComponent } from '../sections/features/features';
import { StatisticsComponent } from '../sections/statistics/statistics';
import { HowItWorksComponent } from '../sections/how-it-works/how-it-works';
import { TestimonialsComponent } from '../sections/testimonials/testimonials';
import { FaqComponent } from '../sections/faq/faq';
import { CtaComponent } from '../sections/cta/cta';
import { FooterComponent } from '../sections/footer/footer';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.html',
  styleUrls: ['./landing.css'],
  standalone: true,
  imports: [
    HeroSectionComponent,
    TrustedCompaniesComponent,
    AboutUsComponent,
    FeaturesComponent,
    StatisticsComponent,
    HowItWorksComponent,
    TestimonialsComponent,
    FaqComponent,
    CtaComponent,
    FooterComponent
  ]
})
export class LandingComponent {}
