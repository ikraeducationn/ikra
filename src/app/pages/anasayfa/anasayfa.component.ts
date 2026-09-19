import { ReviewsComponent } from '../../shared/reviews/reviews.component';
import { Component, OnDestroy, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-anasayfa',
    imports: [ReviewsComponent, CommonModule, RouterModule],
    standalone: true,
    templateUrl: './anasayfa.component.html',
    styleUrl: './anasayfa.component.css'
})
export class AnasayfaComponent implements OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly organizationScript = this.document.getElementById('ikra-organization-schema')
    ?? this.document.createElement('script');

  constructor(private readonly title: Title, private readonly meta: Meta) {
    this.title.setTitle("Online Kur'an Eğitimi | Yetişkinler, Gençler ve Çocuklar | IKRA EDUcation");
    this.meta.updateTag({ name: 'description', content: "Avusturya merkezli IKRA EDUcation ile Türkçe online Kur'an eğitimi. Sıfırdan Kur'an okuma, tecvid, temel dini bilgiler ve yetişkinler, gençler ve çocuklar için canlı grup dersleri." });
    // Reuse the prerendered script during hydration to avoid duplicate schema.
    this.organizationScript.id = 'ikra-organization-schema';
    this.organizationScript.setAttribute('type', 'application/ld+json');
    this.organizationScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'IKRA EDUcation',
      url: 'https://ikraeducationn.github.io/ikra/',
      logo: 'https://ikraeducationn.github.io/ikra/assets/ikra-logo.png',
      sameAs: [
        'https://www.instagram.com/ikra.educationline?igsh=bDJybmpvZHhnbXli',
        'https://www.facebook.com/share/1bRTFtCAWg/?mibextid=wwXIfr'
      ]
    });
    this.document.head.appendChild(this.organizationScript);
  }

  ngOnDestroy(): void {
    this.organizationScript.remove();
    // Restore the existing index.html metadata when leaving the home page,
    // including after a direct visit to its prerendered HTML.
    this.title.setTitle('IKRA EDUcation');
    this.meta.removeTag('name="description"');
  }
}
