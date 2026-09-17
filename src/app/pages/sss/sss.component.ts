import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

type Faq = { q: string; a: string | string[]; category?: string; links?: { label: string; path: string }[] };

@Component({
  selector: 'app-sss',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sss.component.html',
  styleUrls: ['./sss.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SssComponent {
  faqs: Faq[] = [
    { category: 'Genel', q: 'IKRA EDUcation kimler için eğitim sunuyor?', a: 'Yetişkinler, gençler ve çocuklar için online Kur’an eğitimi sunar. Gençler ve çocuklarda temel dini bilgiler ve değer eğitimi de yer alır.' },
    { q: 'Dersler online mı?', a: 'Evet, eğitimler online yürütülür.' },
    { q: 'Ders dili nedir?', a: 'Derslerin ana dili Türkçedir. Gerektiğinde bazı kavramların anlaşılmasını desteklemek için Almanca açıklamalar yapılabilir.' },
    { category: 'Canlı Grup Dersleri', q: 'Canlı Grup Dersleri nasıl ilerler?', a: 'Sabit gün ve saatte, öğretmen eşliğinde ve grup temposuyla ilerlenir. Öğrencinin okuması canlı dinlenir ve okuma hataları düzeltilir.' },
    { q: 'Canlı Grup Dersleri kimler için uygundur?', a: 'Düzenli haftalık öğretmen takibi ve sabit ders düzeniyle daha iyi ilerleyen öğrenciler için uygundur.' },
    { q: 'Canlı Grup Dersleri yetişkin, genç ve çocuklar için var mı?', a: 'Evet. İçerik hedef kitleye ve seviyeye göre farklılaşır.' },
    { category: 'IKRA Üyelik Sistemi', q: 'Üyelik Sistemi hazır mı?', a: 'IKRA Üyelik Sistemi hazırlanıyor. Detaylar hazır olduğunda paylaşılacak.', links: [{ label: 'IKRA Üyelik Sistemi', path: '/uyelik-sistemi' }] },
    { category: 'Çocuklar ve gençler', q: 'Çocuk eğitiminde neler var?', a: 'Kur’an eğitimi, temel dini bilgiler, adab ve değerler yaşa ve seviyeye uygun şekilde ele alınır.' },
    { q: 'Genç eğitiminde neler var?', a: 'Kur’an eğitimi, temel dini bilgiler ve dini/değer odaklı rehberlik yer alır.' },
    { q: 'Türkçesi zayıf olan çocuk veya gençler derse katılabilir mi?', a: 'Anlatım yaş ve Türkçe seviyesine uygun, sade tutulur; gerektiğinde Almanca açıklamalarla desteklenebilir. Derslerin ana dili Türkçedir.' },
    { category: 'Kayıt', q: 'Nasıl bilgi alabilirim?', a: 'İlgili eğitim sayfasını inceleyebilir veya bizimle iletişime geçebilirsiniz. Canlı Grup Dersleri için grup başvuru formunu inceleyebilirsiniz. Form gönderimi henüz aktif değildir; sorularınız için iletişim kanallarımızı kullanabilirsiniz.', links: [{ label: 'Eğitimleri İncele', path: '/egitimler' }, { label: 'Canlı Grup Başvuru Formu', path: '/canli-grup-basvuru' }, { label: 'İletişim', path: '/iletisim' }] }
  ];

  /** new control-flow helper */
  isArray(v: unknown): v is string[] { return Array.isArray(v); }

  /** accordion state (multi-open) */
  private _open = new Set<number>();
  isOpen(i: number) { return this._open.has(i); }
  toggle(i: number) {
    const next = new Set(this._open);
    next.has(i) ? next.delete(i) : next.add(i);
    this._open = next;  // OnPush-friendly
  }
}
