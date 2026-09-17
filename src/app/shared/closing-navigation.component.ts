import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-closing-navigation',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="closing-navigation" aria-label="Sayfa sonu navigasyonu">
      @if (!isContactPage) {
        <a class="primary" routerLink="/iletisim">İletişime Geç</a>
      }
      <a class="secondary" routerLink="/anasayfa">Ana Sayfaya Dön</a>
    </nav>
  `,
  styles: [`
    .closing-navigation { display:flex; justify-content:center; flex-wrap:wrap; gap:16px; padding:32px 24px; border-top:1px solid var(--ikra-border); background:var(--ikra-primary-light); }
    a { box-sizing:border-box; min-height:48px; max-width:100%; padding:var(--ikra-button-padding); border:1px solid var(--ikra-primary); border-radius:var(--ikra-button-radius); font-weight:700; line-height:1.5; text-align:center; text-decoration:none; }
    .primary { background:var(--ikra-primary); color:var(--ikra-white); }
    .primary:hover { background:var(--ikra-primary-dark); }
    .secondary { background:var(--ikra-white); color:var(--ikra-primary); }
    .secondary:hover { background:var(--ikra-primary-light); }
    @media(max-width:540px) { .closing-navigation { flex-direction:column; } }
  `]
})
export class ClosingNavigationComponent {
  private readonly router = inject(Router);
  get isContactPage() { return this.router.url.split(/[?#]/)[0] === '/iletisim'; }
}
