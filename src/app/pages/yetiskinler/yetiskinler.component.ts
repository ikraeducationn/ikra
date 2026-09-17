import { ReviewsComponent } from '../../shared/reviews/reviews.component';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-yetiskinler',
  standalone: true,
  imports: [ReviewsComponent, RouterLink],
  templateUrl: './yetiskinler.component.html',
  styleUrls: ['../page-intro.css', './yetiskinler.component.css']
})
export class YetiskinlerComponent {}
