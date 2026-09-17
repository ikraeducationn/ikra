import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { HeaderComponent } from './header.component';
import { routes } from '../../app.routes';

describe('Header navigation', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HeaderComponent],
    providers: [provideRouter(routes)]
  }));

  it('opens the education submenu and supports Escape', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    const logo = element.querySelector<HTMLImageElement>('.header-logo')!;
    expect(logo.alt).toBe('IKRA EDUcation');
    expect(logo.getAttribute('src')).toBe('assets/ikra-logo.png');
    expect(logo.closest('a')?.getAttribute('href')).toBe('/anasayfa');
    const toggle = element.querySelector<HTMLButtonElement>('.dropdown-toggle')!;
    toggle.click();
    fixture.detectChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(element.querySelector<HTMLUListElement>('.dropdown')!.hidden).toBeFalse();
    expect(Array.from(element.querySelectorAll('.dropdown a')).map(a => a.textContent?.trim()))
      .toEqual(['Yetişkinler', 'Gençler', 'Çocuklar', 'Canlı Grup Dersleri']);
    toggle.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });

  it('closes the mobile menu after navigation and marks the active page', async () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    element.querySelector<HTMLButtonElement>('.menu-toggle')!.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.menuOpen).toBeTrue();
    await TestBed.inject(Router).navigateByUrl('/cocuklar');
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.componentInstance.menuOpen).toBeFalse();
    expect(element.querySelector('a[href="/cocuklar"]')?.getAttribute('aria-current')).toBe('page');
    expect(element.querySelector('.education')?.classList.contains('active-group')).toBeTrue();
  });
});
