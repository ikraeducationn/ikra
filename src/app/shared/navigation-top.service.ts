import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import { DestroyRef, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, NavigationSkipped, NavigationSkippedCode, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NavigationTopService {
  constructor() {
    const router = inject(Router);
    const viewport = inject(ViewportScroller);
    const destroyRef = inject(DestroyRef);
    let pending: ReturnType<typeof setTimeout> | undefined;
    destroyRef.onDestroy(() => clearTimeout(pending));
    if (!isPlatformBrowser(inject(PLATFORM_ID))) return;

    router.events.pipe(takeUntilDestroyed()).subscribe(event => {
      const completed = event instanceof NavigationEnd;
      const repeated = event instanceof NavigationSkipped &&
        event.code === NavigationSkippedCode.IgnoredSameUrlNavigation;
      if (!completed && !repeated) return;
      clearTimeout(pending);
      const url = completed ? event.urlAfterRedirects : event.url;
      if (!/^\/(anasayfa|iletisim)(?:[?#]|$)/.test(url)) return;
      // Wait for the destination view and mobile menu to finish rendering.
      pending = setTimeout(() => viewport.scrollToPosition([0, 0]), 0);
    });
  }
}
