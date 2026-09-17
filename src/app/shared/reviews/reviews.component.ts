import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReviewId, REVIEWS } from './reviews.data';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {
  @Input({ required: true }) reviewIds: ReviewId[] = [];
  @Input() heading = 'Öğrenci ve veli görüşleri';
  @Input() showMore = true;

  get reviews() {
    return this.reviewIds.map(id => REVIEWS[id]);
  }
}
