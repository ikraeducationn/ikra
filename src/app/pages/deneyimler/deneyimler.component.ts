import { ReviewsComponent } from '../../shared/reviews/reviews.component';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-deneyimler',
  imports: [ReviewsComponent, RouterLink],
  standalone: true,
  templateUrl: './deneyimler.component.html',
  styleUrls: ['./deneyimler.component.css']
})
export class DeneyimlerComponent {}
