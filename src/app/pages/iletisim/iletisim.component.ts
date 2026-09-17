import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

type Contact = {
  label: string;
  desc: string;
  href: string;
  icon: string;      // Font Awesome class
  theme: 'phone' | 'wa' | 'ig' | 'fb';
};

@Component({
    selector: 'app-iletisim',
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    standalone: true,
    templateUrl: './iletisim.component.html',
    styleUrls: ['../page-intro.css', '../uyelik-basvuru/uyelik-basvuru.component.css', './iletisim.component.css']
})
export class IletisimComponent {
  private readonly fb = inject(FormBuilder);
  checked = false;
  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.pattern(/\S.*\S/), Validators.maxLength(100)]],
    contact: ['', [Validators.required, Validators.pattern(/^(?:[^\s@]+@[^\s@]+\.[^\s@]+|(?=(?:\D*\d){7,15}\D*$)\+?[\d ()-]{7,25})$/)]],
    subject: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(150)]],
    message: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(1500)]]
  });
  review(): void {
    this.form.markAllAsTouched();
    this.checked = true;
  }
  // Updated values
  tel = '+436704053959';
  whatsapp = 'https://wa.me/436704053959';
  instagramUrl = 'https://www.instagram.com/ikra.educationline?igsh=bDJybmpvZHhnbXli';
  facebookUrl  = 'https://www.facebook.com/share/1bRTFtCAWg/?mibextid=wwXIfr';
  address = 'Wiener Neustadt, Österreich';

  readonly telHref = `tel:${this.tel.replace(/\s+/g, '')}`;

  contacts: Contact[] = [
    { label: 'Telefon',   desc: this.tel,               href: this.telHref,     icon: 'fas fa-phone',        theme: 'phone' },
    { label: 'WhatsApp',  desc: 'Hızlıca yazın',        href: this.whatsapp,    icon: 'fab fa-whatsapp',     theme: 'wa'    },
    { label: 'Instagram', desc: 'ikra resmi sayfası',   href: this.instagramUrl,icon: 'fab fa-instagram',    theme: 'ig'    },
    { label: 'Facebook',  desc: 'ikra resmi sayfası',   href: this.facebookUrl, icon: 'fab fa-facebook-f',   theme: 'fb'    },
  ];

  isExternal(url: string): boolean {
    return /^https?:\/\//i.test(url);
  }
}
