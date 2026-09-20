import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';

describe('IKRA v2 page routes', () => {
  const pages = [
    ['/online-kuran-egitimi', 'Online Kur’an Eğitimi'],
    ['/impressum', 'Impressum'],
    ['/anasayfa', 'Kur’an öğreniminde size uygun yolu seçin.'],
    ['/deneyimler', 'Öğrenci deneyimleri'],
    ['/sss', 'Sık Sorulan Sorular'],
    ['/iletisim', 'İletişim'],
    ['/hizmetlerimiz', 'IKRA Eğitimleri'],
    ['/fiyatlar', 'Eğitim seçenekleri ve güncel bilgiler'],
    ['/canli-grup-basvuru', 'Canlı Grup Dersleri Başvuru Formu'],
    ['/uyelik-basvuru', 'IKRA Üyelik Sistemi hazırlanıyor'],
    ['/gencler', 'Gençler için Kur’an eğitimi ve değer odaklı rehberlik'],
    ['/egitimler', 'Size uygun IKRA eğitim yolunu seçin.'],
    ['/yetiskinler', 'Yetişkinler için Kur’an eğitimi'],
    ['/cocuklar', 'Çocuklar için Kur’an ve temel dini bilgiler eğitimi'],
    ['/canli-grup-dersleri', 'Her hafta öğretmen eşliğinde düzenli Kur’an eğitimi.'],
    ['/ikra-yontemi', 'IKRA’da öğrenme nasıl ilerler?'],
    ['/sayfa-bulunamadi', 'Aradığınız sayfa bulunamadı.'],
    ['/bilinmeyen/bir-sayfa', 'Aradığınız sayfa bulunamadı.'],
    ['/uyelik-sistemi', 'IKRA Üyelik Sistemi hazırlanıyor'],
    ['/ogrenci-girisi', 'Öğrenci Girişi'],
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
  });

  for (const [url, title] of pages) {
    it('renders the standalone page at ' + url, async () => {
      const harness = await RouterTestingHarness.create();
      await harness.navigateByUrl(url);
      expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toBe(title);
      if (url === '/uyelik-sistemi') {
        expect(harness.routeNativeElement?.textContent).toContain('IKRA Üyelik Sistemi hazırlanıyor');
        expect(harness.routeNativeElement?.querySelector('.primary-link')?.getAttribute('href')).toBe('/iletisim');
      }
      if (url === '/ogrenci-girisi') {
        expect(harness.routeNativeElement?.textContent).toContain('Öğrenci girişi şu anda aktif değildir.');
        expect(harness.routeNativeElement?.querySelector('form')).toBeNull();
      }
      expect(harness.routeNativeElement?.querySelector('a[href="/uyelik-basvuru"]')).toBeNull();
      expect(harness.routeNativeElement?.textContent).not.toMatch(/37 €|210 €|Canlı Okuma Kontrol|Video ders|PDF|6 aylık/);
      if (url === '/uyelik-basvuru') { expect(harness.routeNativeElement?.querySelector('form')).toBeNull(); }
      const links = Array.from(harness.routeNativeElement!.querySelectorAll('a'));
      const paths = routes.map(route => '/' + route.path);
      for (const link of links) {
        const href = link.getAttribute('href');
        expect(href).withContext(url + ': missing link target').toBeTruthy();
        expect(href).not.toBe('#');
        expect(href?.startsWith('javascript:')).toBeFalse();
        expect(href?.includes('/ikra/')).toBeFalse();
        if (href?.startsWith('/')) {
          expect(paths).withContext(url + ': unknown route ' + href).toContain(href);
        }
      }
      if (['/cocuklar', '/gencler', '/canli-grup-dersleri'].includes(url)) {
        expect(harness.routeNativeElement?.querySelector('.contact-button')?.getAttribute('href')).toBe('/canli-grup-basvuru');
      }
      if (url === '/uyelik-sistemi') {
        expect(harness.routeNativeElement?.querySelector('a[href="/uyelik-basvuru"]')).toBeNull();
      }
      if (url === '/ogrenci-girisi') {
        expect(harness.routeNativeElement?.querySelector('form')).toBeNull();
        expect(harness.routeNativeElement?.querySelector('input, button')).toBeNull();
        expect(links.map(link => link.getAttribute('href'))).toEqual(['/canli-grup-dersleri', '/uyelik-sistemi', '/iletisim']);
      }
      if (url === '/bilinmeyen/bir-sayfa') {
        const home = harness.routeNativeElement!.querySelector<HTMLAnchorElement>('a[href="/anasayfa"]')!;
        home.click();
        await harness.fixture.whenStable();
        expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toBe('Kur’an öğreniminde size uygun yolu seçin.');
      }
    });
  }
});
