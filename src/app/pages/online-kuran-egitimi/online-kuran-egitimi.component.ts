import { DOCUMENT } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-online-kuran-egitimi',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './online-kuran-egitimi.component.html',
  styleUrls: ['../page-intro.css', './online-kuran-egitimi.component.css']
})
export class OnlineKuranEgitimiComponent implements OnInit, OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private canonical: HTMLLinkElement | null = null;

  ngOnInit(): void {
    this.title.setTitle('Online Kur’an Eğitimi | Yetişkinler, Gençler ve Çocuklar | IKRA EDUcation');
    this.meta.updateTag({ name: 'description', content: 'IKRA EDUcation ile yetişkinler, gençler ve çocuklar için online Kur’an eğitimi. Sıfırdan Kur’an okuma, tecvid ve temel dini bilgiler; Avrupa’dan katılım.' });
    // Reuse the prerendered canonical when the browser hydrates this route.
    this.canonical = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
      ?? this.document.createElement('link');
    this.canonical.rel = 'canonical';
    this.canonical.href = 'https://ikraeducationn.github.io/ikra/online-kuran-egitimi/';
    this.document.head.appendChild(this.canonical);
  }

  ngOnDestroy(): void {
    this.canonical?.remove();
    this.title.setTitle('IKRA EDUcation');
    this.meta.removeTag('name="description"');
  }
}
