import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private readonly element = inject(ElementRef<HTMLElement>);
  menuOpen = false;
  educationOpen = false;

  constructor() {
    inject(Router).events.pipe(takeUntilDestroyed()).subscribe(event => {
      if (event instanceof NavigationEnd) this.closeMenus();
    });
  }

  closeMenus() {
    this.menuOpen = false;
    this.educationOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onOutsideClick(event: MouseEvent) {
    if (!(event.target instanceof Node) || !this.element.nativeElement.contains(event.target)) {
      this.closeMenus();
    }
  }
}
