import { ReviewsComponent } from '../../shared/reviews/reviews.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-anasayfa',
    imports: [ReviewsComponent, CommonModule, RouterModule],
    standalone: true,
    templateUrl: './anasayfa.component.html',
    styleUrl: './anasayfa.component.css'
})
export class AnasayfaComponent {
  constructor() { }

}
