import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { routes } from './app.routes';
import { Main } from './main/main';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should use the main page as the default route', () => {
    const defaultRoute = routes.find((route) => route.path === '');
    expect(defaultRoute?.component).toBe(Main);
  });
});
