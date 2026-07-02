import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing';
import { DashboardPageComponent } from './navbar/pages/dashboard/dashboard';
import { LoginPageComponent } from './navbar/pages/login/login';
import { SignupPageComponent } from './navbar/pages/signup/signup';
import { HeroSectionComponent } from './sections/hero-section/hero-section';
import { TrustedCompaniesComponent } from './sections/trusted-companies/trusted-companies';
import { AboutUsComponent } from './sections/about-us/about-us';
import { FeaturesComponent } from './sections/features/features';
import { StatisticsComponent } from './sections/statistics/statistics';
import { HowItWorksComponent } from './sections/how-it-works/how-it-works';
import { TestimonialsComponent } from './sections/testimonials/testimonials';
import { FaqComponent } from './sections/faq/faq';
import { CtaComponent } from './sections/cta/cta';
import { FooterComponent } from './sections/footer/footer';

export const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'hero', component: HeroSectionComponent },
  { path: 'trusted-companies', component: TrustedCompaniesComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'features', component: FeaturesComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'how-it-works', component: HowItWorksComponent },
  { path: 'testimonials', component: TestimonialsComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'cta', component: CtaComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'dashboard', component: DashboardPageComponent }
];
