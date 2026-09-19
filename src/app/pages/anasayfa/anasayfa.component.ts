import { ReviewsComponent } from '../../shared/reviews/reviews.component';
import { Component, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-anasayfa',
    imports: [ReviewsComponent, CommonModule, RouterModule],
    standalone: true,
    templateUrl: './anasayfa.component.html',
    styleUrl: './anasayfa.component.css'
})
export class AnasayfaComponent implements OnDestroy {
  constructor(private readonly title: Title, private readonly meta: Meta) {
    this.title.setTitle("Online Kur'an Eğitimi | Yetişkinler, Gençler ve Çocuklar | IKRA EDUcation");
    this.meta.updateTag({ name: 'description', content: "Avusturya merkezli IKRA EDUcation ile Türkçe online Kur'an eğitimi. Sıfırdan Kur'an okuma, tecvid, temel dini bilgiler ve yetişkinler, gençler ve çocuklar için canlı grup dersleri." });
  }

  ngOnDestroy(): void {
    // Restore the existing index.html metadata when leaving the home page,
    // including after a direct visit to its prerendered HTML.
    this.title.setTitle('IKRA EDUcation');
    this.meta.removeTag('name="description"');
  }
}
