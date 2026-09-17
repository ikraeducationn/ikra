import { ReviewsComponent } from '../../shared/reviews/reviews.component';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gencler',
  standalone: true,
  imports: [ReviewsComponent, RouterLink],
  templateUrl: './gencler.component.html',
  styleUrls: ['../page-intro.css', './gencler.component.css']
})
export class GenclerComponent {}
