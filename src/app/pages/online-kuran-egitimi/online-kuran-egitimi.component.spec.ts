import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../../app.routes';

describe('Online Quran education SEO route', () => {
  const path = '/online-kuran-egitimi';
  const canonical = 'https://ikraeducationn.github.io/ikra/online-kuran-egitimi/';
  const title = 'Online Kur’an Eğitimi | Yetişkinler, Gençler ve Çocuklar | IKRA EDUcation';
  const description = 'IKRA EDUcation ile yetişkinler, gençler ve çocuklar için online Kur’an eğitimi. Sıfırdan Kur’an okuma, tecvid ve temel dini bilgiler; Avrupa’dan katılım.';

  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter(routes)] }));

  it('renders one H1, exact route metadata and the five internal destinations', async () => {
    const harness = await RouterTestingHarness.create(path);
    const document = TestBed.inject(DOCUMENT);
    expect(harness.routeNativeElement!.querySelectorAll('h1').length).toBe(1);
    expect(harness.routeNativeElement!.querySelector('h1')!.textContent).toBe('Online Kur’an Eğitimi');
    expect(TestBed.inject(Title).getTitle()).toBe(title);
    expect(TestBed.inject(Meta).getTag('name="description"')?.content).toBe(description);
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(canonical);
    expect(document.querySelector('script[type="application/ld+json"]')).toBeNull();
    for (const target of ['yetiskinler', 'gencler', 'cocuklar', 'canli-grup-dersleri', 'iletisim']) {
      expect(harness.routeNativeElement!.querySelector(`a[href="/${target}"]`)).not.toBeNull();
    }
    expect(TestBed.inject(Meta).getTag('name="robots"')?.content ?? '').not.toContain('noindex');
  });

  it('keeps home SEO/schema intact and does not leak landing metadata to other routes', async () => {
    const harness = await RouterTestingHarness.create('/anasayfa');
    const document = TestBed.inject(DOCUMENT);
    const titles = TestBed.inject(Title);
    const meta = TestBed.inject(Meta);
    const homeTitle = titles.getTitle();
    const homeDescription = meta.getTag('name="description"')!.content;
    const organization = document.getElementById('ikra-organization-schema')!.textContent;
    expect(harness.routeNativeElement!.querySelectorAll(`a[href="${path}"]`).length).toBe(1);
    await harness.navigateByUrl(path);
    expect(titles.getTitle()).toBe(title);
    expect(document.getElementById('ikra-organization-schema')).toBeNull();
    await harness.navigateByUrl('/anasayfa');
    expect(titles.getTitle()).toBe(homeTitle);
    expect(meta.getTag('name="description"')!.content).toBe(homeDescription);
    expect(document.getElementById('ikra-organization-schema')!.textContent).toBe(organization);
    expect(document.querySelector('link[rel="canonical"]')).toBeNull();
    await harness.navigateByUrl(path);
    await harness.navigateByUrl('/iletisim');
    expect(titles.getTitle()).toBe('IKRA EDUcation');
    expect(meta.getTag('name="description"')).toBeNull();
    expect(document.querySelector('link[rel="canonical"]')).toBeNull();
  });

  it('reuses the prerendered canonical without duplication', async () => {
    const document = TestBed.inject(DOCUMENT);
    const link = document.createElement('link');
    link.rel = 'canonical';
    link.href = canonical;
    document.head.appendChild(link);
    await RouterTestingHarness.create(path);
    expect(document.querySelectorAll('link[rel="canonical"]').length).toBe(1);
    expect(document.querySelector('link[rel="canonical"]')).toBe(link);
  });
});
