export type ReviewId = 'esmanur' | 'burcu' | 'melek' | 'leman' | 'ismail' | 'nedime' | 'dilek';

export interface Review {
  name: string;
  details: string;
  initials: string;
  source: 'Google Yorumu' | 'Öğrenci Görüşü' | 'Veli Görüşü';
  quote: string;
}

// User-verified excerpts with permission for website use. Keep wording and attribution intact.
export const REVIEWS: Record<ReviewId, Review> = {
  esmanur: {
    name: 'Esmanur T.', details: '18 yaş · Öğrenci', initials: 'ET', source: 'Google Yorumu',
    quote: 'Eğlenceli dersler yapan bir Kur’an kursu. Çok iyi ve bilgiler uzun süre kafanda kalıyor.'
  },
  burcu: {
    name: 'Burcu U.', details: '23 yaş · Genç yetişkin · Avusturya', initials: 'BU', source: 'Öğrenci Görüşü',
    quote: 'Eğitim süreci boyunca kendimi çok iyi desteklenmiş hissettim.'
  },
  melek: {
    name: 'Melek K.', details: '24 yaş · Genç yetişkin · Hollanda', initials: 'MK', source: 'Öğrenci Görüşü',
    quote: 'Yeni şeyler öğreniyorum. Çok şey öğrendim.'
  },
  leman: {
    name: 'Leman A.', details: 'Yetişkin öğrenci', initials: 'LA', source: 'Google Yorumu',
    quote: 'Hocama çok teşekkür ediyorum. Onun sayesinde Kur’an-ı Kerim’e geçtim. Sabırlı, sakin ve motive edici yaklaşımıyla beni destekliyor.'
  },
  ismail: {
    name: 'İsmail Y.', details: 'Çocuk velisi', initials: 'İY', source: 'Google Yorumu',
    quote: 'Oğlum da burada online ders aldı ve çok memnun kaldık. Hem ilmi yönden hem de ahlaki olarak çocuklara güzel bir katkı sağlıyor.'
  },
  nedime: {
    name: 'Nedime', details: 'İsviçre · Çocuk velisi', initials: 'N', source: 'Veli Görüşü',
    quote: 'Burada kendileri isteyerek derse giriyorlar ve çok büyük yol katlettiler.'
  },
  dilek: {
    name: 'Dilek', details: 'Fransa · Çocuk velisi', initials: 'D', source: 'Veli Görüşü',
    quote: 'Eğitim süresi iyi geçti, Kur’an öğrenmelerinin geliştiğini görüyorum.'
  }
};
