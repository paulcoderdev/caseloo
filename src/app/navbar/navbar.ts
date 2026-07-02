import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonModule, MenubarModule, RouterLink],
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './navbar.css'
})
export class Navbar {
  items: MenuItem[] = [
    { label: 'Home', routerLink: '/' },
    { label: 'About', routerLink: '/' },
    { label: 'Contact', routerLink: '/' }
  ];
}
