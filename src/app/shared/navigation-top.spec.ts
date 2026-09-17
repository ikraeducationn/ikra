import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({ standalone: true, template: '<h1>Test page</h1>' })
class TestPage {}

describe('Shared top navigation', () => {
  let scroll: jasmine.Spy;
  beforeEach(() => {
    scroll = jasmine.createSpy('scrollToPosition');
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter(['anasayfa', 'iletisim', 'deneyimler'].map(path => ({ path, component: TestPage }))),
        { provide: ViewportScroller, useValue: { scrollToPosition: scroll } }
      ]
    });
  });

  for (const selector of ['app-header .header-title', 'app-footer .footer-title', 'app-closing-navigation .secondary']) {
    it('scrolls home from another page and on repeated home clicks: ' + selector, fakeAsync(() => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const router = TestBed.inject(Router);
      router.navigateByUrl('/deneyimler'); tick(); fixture.detectChanges();
      expect(scroll).not.toHaveBeenCalled();
      const link: HTMLAnchorElement = fixture.nativeElement.querySelector(selector);
      link.click(); tick(); fixture.detectChanges();
      expect(router.url).toBe('/anasayfa');
      expect(scroll).toHaveBeenCalledWith([0, 0]);
      scroll.calls.reset();
      link.click(); tick();
      expect(scroll).toHaveBeenCalledOnceWith([0, 0]);
    }));
  }

  it('opens contact at the top, hides its self CTA, and handles repeated contact navigation', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const router = TestBed.inject(Router);
    router.navigateByUrl('/deneyimler'); tick(); fixture.detectChanges();
    fixture.nativeElement.querySelector('app-closing-navigation .primary').click();
    tick(); fixture.detectChanges();
    expect(router.url).toBe('/iletisim');
    expect(scroll).toHaveBeenCalledWith([0, 0]);
    expect(fixture.nativeElement.querySelector('app-closing-navigation .primary')).toBeNull();
    expect(fixture.nativeElement.querySelector('app-closing-navigation .secondary')).not.toBeNull();
    scroll.calls.reset();
    fixture.nativeElement.querySelector('app-footer a[href="/iletisim"]').click(); tick();
    expect(scroll).toHaveBeenCalledOnceWith([0, 0]);
  }));
});
