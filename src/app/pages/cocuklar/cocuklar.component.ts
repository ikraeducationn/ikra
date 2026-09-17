import { ReviewsComponent } from '../../shared/reviews/reviews.component';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cocuklar',
  standalone: true,
  imports: [ReviewsComponent, RouterLink],
  templateUrl: './cocuklar.component.html',
  styleUrls: ['../page-intro.css', './cocuklar.component.css']
})
export class CocuklarComponent {}
