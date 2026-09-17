import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-impressum',
    imports: [CommonModule],
    standalone: true,
    templateUrl: './impressum.component.html',
    styleUrls: ['./impressum.component.css']
})
export class ImpressumComponent {
  // Pflichtangaben (§ 5 ECG)
  companyName = 'Rabia Özdemir';
  legalForm = 'Einzelunternehmerin';
  address = 'Kollonitschgasse 14, 2700 Wiener Neustadt, Österreich';
  email = 'ikraeducation@outlook.com';
  phone = '+436704053959';

  // Offenlegung (§ 25 MedienG – kleine Website)
  medieninhaber = 'Rabia Özdemir';
  unternehmensgegenstand = 'Online-Kurse und Nachhilfe';
  blattlinie = 'Informationen zu Online-Kursen und Nachhilfeangeboten.';

  get ecgRows() {
    return [
      { k: 'Firma/Name', v: this.companyName },
      { k: 'Rechtsform', v: this.legalForm },
      { k: 'Anschrift',  v: this.address },
      { k: 'E-Mail',     v: this.email },
      { k: 'Telefon',    v: this.phone },
    ];
  }

  // --- Helpers für Template (vermeidet Regex im Template) ---
  toMail(v: string): string { return `mailto:${v}`; }
  toTel(v: string): string  { return `tel:${(v || '').replace(/\s+/g, '')}`; }
}
