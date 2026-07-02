import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';

interface FaqItem {
  question: string;
  answer: string;
  expanded?: boolean;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  templateUrl: './faq.html',
  styleUrls: ['./faq.css'],
  imports: [CommonModule, AccordionModule]
})
export class FaqComponent {
}



