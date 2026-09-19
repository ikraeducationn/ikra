import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

import { AnasayfaComponent } from './anasayfa.component';

describe('AnasayfaComponent', () => {
  let component: AnasayfaComponent;
  let fixture: ComponentFixture<AnasayfaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnasayfaComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnasayfaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sets the exact home metadata and removes it when leaving the page', () => {
    const title = TestBed.inject(Title);
    const meta = TestBed.inject(Meta);
    expect(title.getTitle()).toBe("Online Kur'an Eğitimi | Yetişkinler, Gençler ve Çocuklar | IKRA EDUcation");
    expect(meta.getTag('name="description"')?.content).toBe("Avusturya merkezli IKRA EDUcation ile Türkçe online Kur'an eğitimi. Sıfırdan Kur'an okuma, tecvid, temel dini bilgiler ve yetişkinler, gençler ve çocuklar için canlı grup dersleri.");
    fixture.destroy();
    expect(title.getTitle()).toBe('IKRA EDUcation');
    expect(meta.getTag('name="description"')).toBeNull();
  });
});
