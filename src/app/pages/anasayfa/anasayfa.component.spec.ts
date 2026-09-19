import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

import { AnasayfaComponent } from './anasayfa.component';

describe('AnasayfaComponent', () => {
  let component: AnasayfaComponent;
  let fixture: ComponentFixture<AnasayfaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnasayfaComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnasayfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('adds one Organization schema and removes it when leaving home', () => {
    const document = TestBed.inject(DOCUMENT);
    const scripts = document.querySelectorAll('script#ikra-organization-schema');
    expect(scripts.length).toBe(1);
    expect(scripts[0].getAttribute('type')).toBe('application/ld+json');
    expect(JSON.parse(scripts[0].textContent!)).toEqual({
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
    fixture.destroy();
    expect(document.getElementById('ikra-organization-schema')).toBeNull();
  });

  it('reuses an existing prerendered schema instead of duplicating it', () => {
    fixture.destroy();
    const document = TestBed.inject(DOCUMENT);
    const prerendered = document.createElement('script');
    prerendered.id = 'ikra-organization-schema';
    prerendered.type = 'application/ld+json';
    prerendered.textContent = '{}';
    document.head.appendChild(prerendered);
    fixture = TestBed.createComponent(AnasayfaComponent);
    fixture.detectChanges();
    expect(document.querySelectorAll('#ikra-organization-schema').length).toBe(1);
    expect(document.getElementById('ikra-organization-schema')).toBe(prerendered);
    expect(JSON.parse(prerendered.textContent!).name).toBe('IKRA EDUcation');
  });

  it('sets the exact home metadata and removes it when leaving the page', () => {
    const title = TestBed.inject(Title);
    const meta = TestBed.inject(Meta);
    expect(title.getTitle()).toBe("Online Kur'an Eğitimi | Yetişkinler, Gençler ve Çocuklar | IKRA EDUcation");
    expect(meta.getTag('name="description"')?.content).toBe("Avusturya merkezli IKRA EDUcation ile Türkçe online Kur'an eğitimi. Sıfırdan Kur'an okuma, tecvid, temel dini bilgiler ve yetişkinler, gençler ve çocuklar için canlı grup dersleri.");
    fixture.destroy();
    expect(title.getTitle()).toBe('IKRA EDUcation');
    expect(meta.getTag('name="description"')).toBeNull();
  });
});
